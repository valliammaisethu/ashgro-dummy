import { Meta, StoryObj } from "@storybook/react";
import InputField from ".";
import withFormik from "@bbbtech/storybook-formik";

export default {
  title: "Components/Input",
  component: InputField,
  decorators: [withFormik],
} as Meta;
type Story = StoryObj<typeof InputField>;

export const Simple: Story = {
  args: {
    type: "text",
    name: "input",
    placeholder: "Enter the value",
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    name: "input",
    placeholder: "Enter the number",
  },
};
