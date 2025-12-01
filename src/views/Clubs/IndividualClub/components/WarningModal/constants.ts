import { ClubSettingsTypes } from "src/enums/clubSettingsTypes.enum";

export const warningModalConstants = {
  title: "Reduce Templates?",
  getDescription: (mode: ClubSettingsTypes) =>
    `Are you sure you want to reduce the number of ${mode}? This will delete the last created ${mode} permanently.`,
};
