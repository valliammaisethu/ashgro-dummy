
import { Meta, StoryObj, } from '@storybook/react';
import Stepper from '.';
import React from 'react';

export default {
  title: 'Components/Stepper',
  component: Stepper,
} as Meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

Default.args={
    title: "Stepper Form",
    destroyOnChange: true,
    items: [
        {
            component: <h1>Step 1</h1>
        },
        {
            component: <h1>Step 2</h1>
        },
        {
            component: <h1>Step 3</h1>
        }
    ]
}