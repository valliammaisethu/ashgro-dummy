import { RcFile } from "antd/es/upload";
import { serializable } from "serializr";
import { AttachmentTypes } from "src/enums/attachmentTypes.enum";

export class AttachmentPayload {
  @serializable
  fileName?: string;

  @serializable
  contentType?: string;

  @serializable
  fileSize?: string;

  @serializable
  attachmentType?: AttachmentTypes;

  file?: RcFile;
}

export class S3UploadError extends Error {
  attachmentId: string;

  constructor(message: string, attachmentId: string) {
    super(message);
    this.name = "S3UploadError";
    this.attachmentId = attachmentId;
  }
}
