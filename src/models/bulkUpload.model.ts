import { serializable } from "serializr";

export class BulkUploadParams {
  @serializable
  s3Key: string = "";

  @serializable
  clubId: string = "";
}
