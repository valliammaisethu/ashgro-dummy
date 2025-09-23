import { Meta } from "@storybook/react";
import withFormik from "@bbbtech/storybook-formik";
import { action } from "@storybook/addon-actions";
import Radio, { Props } from ".";
import React from "react";

export default {
  title: "Components/Radio",
  component: Radio,
  decorators: [withFormik]
} as Meta;

const options = [
  {
    label: "Option 1",
    value: "1"
  },
  {
    label: "Option 2",
    value: "2"
  },
  {
    label: "Option 3",
    value: "3"
  },
  {
    label: "Option 4",
    value: "4"
  }
];

export const Default = (args: Props) => {
  return <Radio {...args} />;
};

Default.args = {
  name: "radio",
  onChange: (value: string | number) => action("onChangeCalled")(value),
  options
};
