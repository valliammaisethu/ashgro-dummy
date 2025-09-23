import { Meta, StoryObj } from '@storybook/react';
import Checkbox from '.';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;
type Story = StoryObj<typeof Checkbox>;

export const SingleCheckbox: Story = {
  args: {
    children: "Checkbox",
    checked: false,
    disabled: false,
    indeterminate: false,
    defaultChecked: false,
    group: false,
    onChange(singleHandler, groupHandler) {
      console.log(" singleHandler", singleHandler)
      console.log(" groupHandler", groupHandler)
    },
  }
}

export const GroupCheckbox: Story = {
  args: {
    ...SingleCheckbox.args,
    group: true,
    options: [
      "Option 1", "Option 2", "Option 3"
    ]
  }
}