import { Meta, StoryObj } from "@storybook/react";
import Offline from ".";

export default {
  title: "Components/Offline",
  component: Offline,
} as Meta;
type Story = StoryObj<typeof Offline>;

export const IsOnline: Story = {};
IsOnline.args = {
  isOffline: false,
};

export const IsOffline: Story = {};
IsOffline.args = {
  isOffline: true,
};
