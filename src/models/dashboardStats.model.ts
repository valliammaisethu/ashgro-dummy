import { serializable } from "serializr";

export class DashboardStats {
  @serializable
  chatbotLeads = 0;

  @serializable
  chatbotConversions = 0;

  @serializable
  clubsWithChatbot = 0;
}
