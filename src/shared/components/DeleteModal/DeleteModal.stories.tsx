import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import DeleteModal, { DeleteModalProps } from '.';


export default {
  title: 'Components/DeleteModal',
  component: DeleteModal,
} as Meta<typeof DeleteModal>;


export const Simple = (args: DeleteModalProps) => {
  return (
    <DeleteModal
      {...args}
    />
  );
};

Simple.args = {
  children: "Click here",
  resource: 'title',
  description: "Once deleted, It can't be reverted",
  onOk: () => action('onOkClick')(),
  onCancel: () => action('onCancelClick')(),
};