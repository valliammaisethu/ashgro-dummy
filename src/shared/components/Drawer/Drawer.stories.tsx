import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Drawer, { drawerProps } from '.';
import { Meta, StoryObj } from '@storybook/react';
import Button from '../Button';


export default {
  title: 'Components/Drawer',
  component: Drawer,
} as Meta<typeof Drawer>;

export const Interactive = (args: drawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
    action('onButtonClick')();
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
    args.onClose();
  };

  return (
    <>
    <Button  type='primary' clickHandler={handleButtonClick}>Open Drawer</Button>
      <Drawer {...args} open={isOpen} onClose={handleDrawerClose} />
    </>
  );
};

Interactive.args = {
  title: 'Drawer Title',
  width: 300,
  closable: true,
  onClose: action('onClose'),
  closeIcon: null,
  footer: null,
  size: 'default',
  zIndex: 1000,
  placement: 'right',
  children: <p>Drawer Content</p>,
};