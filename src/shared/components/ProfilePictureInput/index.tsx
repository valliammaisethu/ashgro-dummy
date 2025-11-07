import React, { useRef, useState, useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { IconPencil, IconDelete } from "obra-icons-react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";

import logo from "src/assets/images/profilePicture.webp";
import {
  imageAccept,
  imageUploadFailed,
  profileImageAllowedTypes,
  profileImageType,
  profileMaxSize,
  profileMaxSizeTitle,
} from "src/constants/sharedComponents";
import { AttachmentService } from "src/services/AttachmentService/attachment.service";
import { AttachmentPayload, S3UploadError } from "src/models/attachment.model";
import { AttachmentTypes } from "src/enums/attachmentTypes.enum";
import { HtmlButtonType } from "src/enums/buttons.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import { NotificationTypes } from "src/enums/notificationTypes";
import { ProfilePictureInputProps } from "src/shared/types/sharedComponents.type";
import { renderNotification } from "src/shared/utils/renderNotification";
import { defaultPlaceholder } from "./constants";

import styles from "./profilePictureInput.module.scss";

const ProfilePictureInput = ({
  name,
  label = defaultPlaceholder,
  required = false,
}: ProfilePictureInputProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attachmentId, setAttachmentId] = useState("");
  const { uploadFile, deleteFile, getAttachmentPreview } = AttachmentService();

  const { data: previewUrl, isLoading: isLoadingPreview } = useQuery(
    getAttachmentPreview(attachmentId),
  );

  useEffect(() => {
    if (field.value && !attachmentId) setAttachmentId(field.value);
  }, [field.value, attachmentId]);

  useEffect(() => {
    if (previewUrl) setPreview(previewUrl);
  }, [previewUrl]);

  const handleEditClick = () => fileInputRef.current?.click();

  const handleDeleteClick = async () => {
    if (attachmentId) {
      try {
        setIsLoading(true);
        await deleteFile.mutateAsync(attachmentId);
      } catch {
        setIsLoading(false);
        return;
      } finally {
        setIsLoading(false);
      }
    }

    setPreview(null);
    setAttachmentId("");
    field.onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > profileMaxSize) {
      renderNotification(profileMaxSizeTitle, "", NotificationTypes.ERROR);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!profileImageAllowedTypes.includes(file.type)) {
      renderNotification(profileImageType, "", NotificationTypes.ERROR);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsLoading(true);

    try {
      const attachmentPayload: AttachmentPayload = {
        file: file as RcFile,
        attachmentType: AttachmentTypes.PROFILE_PIC,
      };

      const result = await uploadFile.mutateAsync(attachmentPayload);

      if (result?.id) {
        setAttachmentId(result.id);
        field.onChange(result.id);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      if (error instanceof S3UploadError && error.attachmentId) {
        await deleteFile.mutateAsync(error.attachmentId);
      }

      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      renderNotification(imageUploadFailed, "", NotificationTypes.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}
      </div>
      <div
        className={clsx(styles.imageWrapper, {
          [styles.withBorder]: preview,
          [styles.loading]: isLoading || isLoadingPreview,
        })}
        onClick={
          !preview && !isLoading && !isLoadingPreview
            ? handleEditClick
            : undefined
        }
      >
        <img src={preview || logo} className={styles.profileImage} />
        {(isLoading || isLoadingPreview) && (
          <div className={styles.loaderOverlay}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
            />
          </div>
        )}
        <input
          ref={fileInputRef}
          type={INPUT_TYPE.FILE}
          accept={imageAccept}
          onChange={handleFileChange}
          className="d-none"
          disabled={isLoading || isLoadingPreview}
        />
      </div>
      {preview && !isLoading && !isLoadingPreview && (
        <div className={styles.actions}>
          <button
            type={HtmlButtonType.BUTTON}
            className={styles.actionButton}
            onClick={handleEditClick}
          >
            <IconPencil size={20} strokeWidth={1.5} />
          </button>
          <button
            type={HtmlButtonType.BUTTON}
            className={styles.actionButton}
            onClick={handleDeleteClick}
          >
            <IconDelete size={20} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureInput;
