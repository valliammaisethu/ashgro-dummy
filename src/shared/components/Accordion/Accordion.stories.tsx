import { Meta, StoryObj } from "@storybook/react";
import Accordion from ".";

export default {
  title: "Components/Accordion",
  component: Accordion,
} as Meta<typeof Accordion>;
type Story = StoryObj<typeof Accordion>;

const accordionList = [
  {
    id: "1",
    title: "Tile 1",
    description: "Description for title 1",
    showArrow: true,
  },
  {
    id: "2",
    title: "Title 2",
    description: "Description for title 2",
    showArrow: true,
  },
];

export const Primary: Story = {
  args: {
    accordionList,
    defaultActiveKey: "1",
    // onChange: (key) => console.log(key),
  },
};

export const AccordionWithoutArrow: Story = {
  args: {
    ...Primary.args,
    accordionList: accordionList.map((item) => ({
      ...item,
      showArrow: false,
    })),
  },
};
