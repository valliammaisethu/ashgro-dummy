import React from "react";
import { Meta } from "@storybook/react";
import Notification, { INotification } from ".";
import Button from "../Button";

export default {
  title: "Components/Notification",
  component: Notification ?? null,
  argTypes: {
    type: {
      options: ["success", "error", "warning", "info", "open"],
      control: { type: "select" },
    },
  },
} as Meta<typeof Notification>;

const NotificationOpenComponent = (args: INotification) => {
  const handleButtonClick = () => {
    Notification({
      message: args.message,
      description: args.description,
      type: args.type,
    });
  };

  return (
    <Button type="primary" clickHandler={handleButtonClick}>
      Open Notification
    </Button>
  );
};

export const SuccessNotification = (args: INotification) => {
  return <NotificationOpenComponent {...args} />;
};

SuccessNotification.args = {
  message: "Success Notification",
  description: "",
  type: "success",
};

export const ErrorNotification = (args: INotification) => {
  return <NotificationOpenComponent {...args} />;
};

ErrorNotification.args = {
  message: "Error Notification",
  description: "",
  type: "error",
};

export const WarningNotification = (args: INotification) => {
  return <NotificationOpenComponent {...args} />;
};

WarningNotification.args = {
  message: "Warning Notification",
  description: "",
  type: "warning",
};

export const InfoNotification = (args: INotification) => {
  return <NotificationOpenComponent {...args} />;
};

InfoNotification.args = {
  message: "Info Notification",
  description: "",
  type: "info",
};

export const OpenNotification = (args: INotification) => {
  return <NotificationOpenComponent {...args} />;
};

OpenNotification.args = {
  message: "Testing",
  description: "",
  type: "open",
};
