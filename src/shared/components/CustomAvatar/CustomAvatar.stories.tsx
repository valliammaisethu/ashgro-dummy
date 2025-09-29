import { Meta, StoryObj } from "@storybook/react";
import CustomAvatar from ".";

export default {
  title: "Components/CustomAvatar",
  component: CustomAvatar,
} as Meta<typeof CustomAvatar>;
type Story = StoryObj<typeof CustomAvatar>;

export const Large: Story = {
  args: {
    name: "Lokesh Kumar",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    ...Large.args,
    size: "small",
  },
};

export const SingleWordLarge: Story = {
  args: {
    name: "Lokesh",
    size: "large",
  },
};

export const SingleWordSmall: Story = {
  args: {
    ...SingleWordLarge.args,
    size: "small",
  },
};
