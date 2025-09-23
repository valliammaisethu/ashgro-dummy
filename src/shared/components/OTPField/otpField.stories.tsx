import { Meta, StoryObj } from "@storybook/react";
import OTPField from ".";
import withFormik from "@bbbtech/storybook-formik";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/OtpField",
  component: OTPField,
  decorators: [withFormik]
} as Meta;
type Story = StoryObj<typeof OTPField.Formik>;

export const Default: Story = {};

Default.args = {
  name: "otp",
  numInputs: 4,
  onChange: (value: string) => action("onChangeCalled")(value)
};
