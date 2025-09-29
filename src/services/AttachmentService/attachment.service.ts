import { useState } from "react";
import { deserialize, serialize } from "serializr";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "./../../routes/routeConstants/apiRoutes";
import Axios from "axios";
import {
  Attachment,
  AttachmentPresignedUrl,
} from "../../models/attachment.model";

const AttachmentService = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [attachment, setAttachment] = useState<Attachment>();

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const [attachmentPreSignedUrl, setAttachmentPreSignedUrl] =
    useState<AttachmentPresignedUrl>();

  const [isUploading, setIsUploading] = useState(false);

  const [isAttachmentAdding, setIsAttachmentAdding] = useState(false);

  const generatePresignedUrl = async (file: File) => {
    try {
      setLoading(true);

      const payload = {
        attachment: serialize(Attachment, {
          format: file.type,
          name: file.name,
        }),
      };

      const { data } = await axiosInstance.post(
        ApiRoutes.ATTACHMENT_PRESIGNED_URL,
        payload,
      );

      const attachmentPreSignedUrl = deserialize(
        AttachmentPresignedUrl,
        data["attachment"],
      );

      setAttachmentPreSignedUrl(attachmentPreSignedUrl);

      return attachmentPreSignedUrl;
    } finally {
      setLoading(false);
    }
  };

  const uploadToS3 = async (attachment: Attachment, file: File) => {
    try {
      if (!attachment.url) return;

      setIsUploading(true);

      const { data } = await Axios.put(attachment.url, file);

      return data;
    } finally {
      setIsUploading(false);
    }
  };

  const addAttachment = async (attachment: Attachment) => {
    try {
      setLoading(true);

      const response = await axiosInstance.post(ApiRoutes.ATTACHMENTS, {
        attachment: serialize(Attachment, attachment),
      });

      const data = deserialize(Attachment, response.data["attachment"]);

      setAttachment(data);

      setAttachments((attachments) => [...attachments, data]);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const uploadAttachment = async (file: File) => {
    try {
      setIsAttachmentAdding(true);
      const attachment = await generatePresignedUrl(file);

      await uploadToS3(attachment, file);

      const newAttachment = await addAttachment({
        s3Key: attachment?.key,
        size: file.size,
        name: file.name,
        format: attachment.format,
      });

      return newAttachment;
    } catch (ex) {
      setIsAttachmentAdding(false);
    }
  };

  return {
    loading,
    attachment,
    attachmentPreSignedUrl,
    addAttachment,
    generatePresignedUrl,
    attachments,
    setAttachment,
    isUploading,
    uploadAttachment,
    isAttachmentAdding,
  };
};

export default AttachmentService;
