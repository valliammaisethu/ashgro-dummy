import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj, } from '@storybook/react';
import FileUpload from '.';
import Button from '../Button';
import { UploadFile } from 'antd';

export default {
  title: 'Components/FileUpload',
  component: FileUpload,
} as Meta;
type Story = StoryObj<typeof FileUpload>;

export const Simple: Story = {
  args: {
    handleChange: (file: FileList | UploadFile<any>)=>action('onOkClick')(file),
    children: <Button >Click to Upload</Button>,
    multiple: false,
    maxCount: 1,
    dragdrop: false
  },
}

export const DragDrop: Story = {
  args: {
    handleChange: (file: FileList | UploadFile<any>)=>action('onOkClick')(file),
    multiple: true,
    dragdrop: true,
    uploadText: 'Click or drag file to this area to upload',
    uploadHint: 'Support for a single or bulk upload.'
  },
}