import { list, object, serializable } from "serializr";

import { ProfileDetails } from "./profile.model";
import { Pagination } from "./pagination.model";
import { BasicProfile } from "./common.model";

export class TranscriptConversation {
  @serializable
  id?: string;

  @serializable
  isUser?: boolean;

  @serializable
  message = "";

  @serializable
  createdAt?: string;
}

export class TranscriptSession {
  @serializable
  id?: string;

  @serializable(list(object(TranscriptConversation)))
  conversations?: TranscriptConversation[];
}

export class TranscriptClub extends BasicProfile {
  @serializable
  id?: string;

  @serializable
  clubLogoUrl?: string;
}

export class TranscriptData {
  @serializable(list(object(TranscriptSession)))
  sessions?: TranscriptSession[];

  @serializable(object(TranscriptClub))
  club?: TranscriptClub;

  @serializable(object(ProfileDetails))
  user?: ProfileDetails;

  @serializable(object(Pagination))
  pagination = new Pagination();
}
