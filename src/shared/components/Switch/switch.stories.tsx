
import { Meta, StoryObj, } from '@storybook/react';
import Switch from '.';
import withFormik from '@bbbtech/storybook-formik';


export default {
  title: 'Components/Switch',
  component: Switch,
  decorators: [withFormik],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the switch is checked or not',
      defaultValue: false,
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Initial checked state of the switch',
      defaultValue: false,
    },
    size: {
      control: {
        type: 'radio',
        options: ['small', 'default'],
      },
      description: 'Size of the switch',
      defaultValue: 'default',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the switch is disabled or not',
      defaultValue: false,
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the switch is in loading state',
      defaultValue: false,
    },
    onChange: {
      action: 'changed',
      description: 'Function to be called when the switch is toggled',
      table: {
        disable: true
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Function to be called when the switch is clicked',
      table: {
        disable: true
      },
    },
  },
} as Meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

Default.args = {
  checked: false,
  size: 'small',
  disabled: false,
  loading: false
}
