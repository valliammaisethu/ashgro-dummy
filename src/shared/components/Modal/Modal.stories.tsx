import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Modal, { ModalProps } from '.';
import Button from '../Button';


export default {
  title: 'Components/Modal',
  component: Modal,
} as Meta<typeof Modal>;

export const Simple = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button type='primary' clickHandler={handleButtonClick}>Open Modal</Button>
      <Modal {...args} visible={isOpen} closeModal={handleDrawerClose} />
    </>
  );
};

Simple.args = {
  children: <p>Modal Content</p>,
  title: 'Modal Title',
};

