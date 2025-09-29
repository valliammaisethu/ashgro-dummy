import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import BreadCrumb from ".";
import { Routes } from "react-router-dom";
import { withRouter } from "storybook-addon-react-router-v6";

const breadCrumbParams = [
  {
    path: "",
    breadcrumbName: "Home",
  },
  {
    path: "",
    breadcrumbName: "Components",
  },
];

export default {
  title: "Components/BreadCrumb",
  component: Routes,
  decorators: [withRouter],
  argTypes: {
    params: {
      control: "object",
    },
  },
} as Meta<typeof BreadCrumb>;

const Template: StoryFn<typeof BreadCrumb> = (args) => <BreadCrumb {...args} />;

export const Default = Template.bind({});

Default.args = {
  params: breadCrumbParams,
};

export const NestedLevel = Template.bind({});
NestedLevel.args = {
  params: [
    ...breadCrumbParams,
    {
      path: "/breadcrumb",
      breadcrumbName: "Breadcrumb",
    },
  ],
};
