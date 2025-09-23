import { Meta, StoryObj, } from '@storybook/react';
import Skeleton from '.';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
} as Meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

Default.args = {
  active: true,
  avatar: false,
  loading: true,
  paragraph: true,
  round: true,
  title: true
}