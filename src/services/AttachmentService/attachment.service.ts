import { useMutation, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { generatePath } from "react-router-dom";
import { MutationKeys, QueryKeys } from "src/enums/cacheEvict.enum";
import axiosInstance from "src/interceptor/axiosInstance";
import { AttachmentPayload, S3UploadError } from "src/models/attachment.model";
import { ResponseModel } from "src/models/response.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { uploadHeaders } from "src/shared/utils/helpers";

const { ATTACHMENTS, ATTACHMENTS_SPECIFIC } = ApiRoutes;
const { ATTACHMENT_UPLOAD, ATTACHMENT_DELETE } = MutationKeys;
const { GET_ATTACHMENT_PREVIEW } = QueryKeys;

export const AttachmentService = () => {
  const uploadFile = useMutation({
    mutationKey: [ATTACHMENT_UPLOAD],
    mutationFn: async (attachmentPayload: AttachmentPayload) => {
      const { file, attachmentType } = attachmentPayload;

      const payload = {
        attachment: {
          fileName: file?.name,
          contentType: file?.type,
          fileSize: file?.size?.toString(),
          ...(attachmentType && { attachmentType }),
        },
      };

      const { data } = await axiosInstance.post(ATTACHMENTS, payload);

      const presignedUrl = data?.data?.presignedUrl;
      const savedAttachment = data?.data?.savedAttachment;
      const attachmentId = savedAttachment?.id;
      const fileName = savedAttachment?.fileName;

      if (presignedUrl && file) {
        try {
          await axios.put(presignedUrl, file, {
            headers: uploadHeaders(file),
          });
        } catch {
          throw new S3UploadError(
            "Failed to upload file to S3. Please check CORS configuration.",
            attachmentId,
          );
        }
      }

      return { id: attachmentId, fileName };
    },
  });

  const deleteFile = useMutation({
    mutationKey: [ATTACHMENT_DELETE],
    mutationFn: async (attachmentId: string) => {
      const { data } = await axiosInstance.delete(
        generatePath(ATTACHMENTS_SPECIFIC, { id: attachmentId }),
      );
      return data;
    },
  });

  const getAttachmentPreview = (
    attachmentId: string,
  ): UseQueryOptions<string, ResponseModel, string> => ({
    queryKey: [GET_ATTACHMENT_PREVIEW, attachmentId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        generatePath(ATTACHMENTS_SPECIFIC, { id: attachmentId }),
      );
      return data?.data?.presignedUrl;
    },
    enabled: !!attachmentId,
  });

  return {
    uploadFile,
    deleteFile,
    getAttachmentPreview,
  };
};
