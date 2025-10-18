export interface DetailItem {
  title: string;
  value: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface ProspectData {
  name: string;
  imageUrl: string;
  followUpDate: string;
  contactInfo: ContactInfo;
  leadDetails: DetailItem[];
  feesAndDues: DetailItem[];
}

export interface ActivityData {
  id: string;
  title: string;
  content: string;
}
