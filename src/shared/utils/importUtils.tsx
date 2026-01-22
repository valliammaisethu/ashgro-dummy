import pdfIcon from "src/assets/images/pdfIcon.webp";
import wordIcon from "src/assets/images/wordIcon.webp";
import excelIcon from "src/assets/images/excelIcon.webp";
import { imageAlts } from "src/constants/imageAlts";

const fileIconConfig: Record<string, { src: string; alt: string }> = {
  pdf: {
    src: pdfIcon,
    alt: imageAlts.pdfIcon,
  },
  doc: {
    src: wordIcon,
    alt: imageAlts.wordIcon,
  },
  docx: {
    src: wordIcon,
    alt: imageAlts.wordIcon,
  },
  xls: {
    src: excelIcon,
    alt: imageAlts.excelIcon,
  },
  xlsx: {
    src: excelIcon,
    alt: imageAlts.excelIcon,
  },
};
export const renderUploadingIcon = (file: string) => {
  const ext = file.split(".").pop()?.toLowerCase();
  return ext ? fileIconConfig[ext] : undefined;
};
