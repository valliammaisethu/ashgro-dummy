import { list, object, serializable } from "serializr";

import { ProfileDetails } from "./profile.model";

export class TranscriptConversation {
  @serializable
  id?: string;

  @serializable
  isUser?: boolean;

  @serializable
  message?: string;

  @serializable
  createdAt?: string;
}

export class TranscriptSession {
  @serializable
  id?: string;

  @serializable(list(object(TranscriptConversation)))
  conversations?: TranscriptConversation[];
}

export class TranscriptClub {
  @serializable
  id?: string;

  @serializable
  clubLogo?: string;

  @serializable
  clubName?: string;
}

export class TranscriptData {
  @serializable(list(object(TranscriptSession)))
  sessions?: TranscriptSession[];

  @serializable(object(TranscriptClub))
  club?: TranscriptClub;

  @serializable(object(ProfileDetails))
  user?: ProfileDetails;
}
