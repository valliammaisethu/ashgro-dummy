import { DashboardStats } from "src/models/dashboardStats.model";

export const deleteModalTitle = "Custom Chart";

export const deleteModalDescription = "the custom chart %s";

export const getDashboardStatsValues = (stats = new DashboardStats()) => {
  return [
    {
      label: "Chatbot Leads",
      value: stats.chatbotLeads,
    },
    {
      label: "Chatbot Conversions",
      value: stats.chatbotConversions,
    },
    {
      label: "Clubs with Chatbot",
      value: stats.clubsWithChatbot,
    },
  ];
};
export const CHART_CONSTANTS = {
  CUSTOM_CHART: "Custom chart",
  DEFAULT_ITEM_WIDTH: 70,
  customTitle: "Delete Custom Chart",
  customDescription:
    "Are you sure you want to delete this %s ?This action is not reversible.",
  customWidth: 650,
};

export const superAdminChartItems = [
  { id: "conversions", name: "Chatbot Conversions" },
  { id: "spend-time", name: "Chatbot Spend Time" },
  { id: "crm-usage", name: "CRM Usage" },
];

export const chartFiltersTitle = "Filters - %s";

export const sampleFilter = "Lead Generation";

export const dropAnimationConfig = {
  duration: 300,
  easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
};

export const EMPTY_STATE_STRINGS = {
  TITLE: "Hmmm...",
  DESCRIPTION: "Looks like no results fit your selected filters",
};

export const ERROR_STATE_STRINGS = {
  TITLE: "Hold on...",
  DESCRIPTION: "Just a moment while we load this section",
};
