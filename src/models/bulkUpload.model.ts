import { serializable, object } from "serializr";

export class BulkUploadParams {
  @serializable
  s3Key?: string;

  @serializable
  clubId: string = "";

  @serializable
  attachmentId: string = "";
}

export class BulkImportStatusData {
  @serializable
  canStartImport: boolean = false;
}

export class BulkImportStatusResponse {
  @serializable
  title: string = "";

  @serializable
  description: string = "";

  @serializable(object(BulkImportStatusData))
  data: BulkImportStatusData = new BulkImportStatusData();

  @serializable
  success: boolean = false;
}
