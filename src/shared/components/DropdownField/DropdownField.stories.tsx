import { Meta, StoryObj } from "@storybook/react";
import DropdownField from ".";
import withFormik from "@bbbtech/storybook-formik";

const options = [
  {
    label: "Option 1",
    value: "1",
  },
  {
    label: "Option 2",
    value: "2",
  },
  {
    label: "Option 3",
    value: "3",
  },
  {
    label: "Option 4",
    value: "4",
  },
];

export default {
  title: "Components/DropDown",
  component: DropdownField,
  decorators: [withFormik],
  argTypes: {
    mode: {
      control: "select",
      options: ["multiple", "tags", undefined],
    },
  },
} as Meta<typeof DropdownField>;
type Story = StoryObj<typeof DropdownField>;

export const Simple: Story = {
  args: {
    name: "dropdown",
    title: "Dropdown Field",
    placeholder: "Select an option",
    options: [...options],
    mode: undefined,
  },
};

export const Tags: Story = {
  args: {
    ...Simple.args,
    title: "Tags Dropdown Field",
    mode: "tags",
  },
};
