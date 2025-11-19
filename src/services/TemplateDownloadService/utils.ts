import { TemplateEntity } from "src/enums/templateEntity.enum";

export const downloadTemplateFile = (blob: Blob, entity: TemplateEntity) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${entity.toLowerCase()}_import_template.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
