import { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from '.';

export default {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
} as Meta<typeof ErrorMessage>;
type Story = StoryObj<typeof ErrorMessage>;

export const Simple: Story = {
  args: {
    message: "This field is required"
  },
}

