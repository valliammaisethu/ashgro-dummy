import { Meta, StoryObj } from '@storybook/react';
import Button from '.';
import { MouseEvent } from 'react';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta<typeof Button>;
type Story = StoryObj<typeof Button>;


export const Primary: Story = {
  args: {
    type: 'primary',
    children: "button",
    clickHandler: (e: MouseEvent) => console.log(e)
  }
}

export const Default: Story = {
  args: {
    ...Primary.args,
    type: 'default'
  }
}

export const Dashed: Story = {
  args: {
    ...Primary.args,
    type: 'dashed'
  }
}

export const Text: Story = {
  args: {
    ...Primary.args,
    type: 'text'
  }
}

export const Link: Story = {
  args: {
    ...Primary.args,
    type: 'link',
    href: "https://www.google.com/"
  }
}

export const Disabled: Story = {
  args: {
    ...Primary.args,
    type: 'primary',
    disabled: true
  }
}

export const Loading: Story = {
  args: {
    ...Primary.args,
    type: 'primary',
    loading: true
  }
}

