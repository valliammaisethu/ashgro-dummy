import { Meta, StoryObj } from '@storybook/react';
import DatePicker from '.';

export default {
  title: 'Components/DatepickerField',
  component: DatePicker,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'middle', 'large']
    },
    picker: {
      control: 'select',
      options: ['date', 'week', 'month', 'quarter', 'year']
    },
    placement: {
      control: 'select',
      options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight']
    }
  },
} as Meta<typeof DatePicker>;
type Story = StoryObj<typeof DatePicker>;

export const Simple: Story = {
  args: {
    name: 'date',
    title: "Date Field",
    size: 'middle',
    allowClear: false,
    bordered: true,
    disabled: false,
    format: "DD/MM/YYYY",
    picker: "date",
    placeholder: "Select Date",
    placement: "bottomLeft"
  }
}