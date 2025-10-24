import React, { useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { IconPencil, IconDelete } from "obra-icons-react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "src/assets/images/profilePicture.webp";
import styles from "./profilePictureInput.module.scss";

interface ProfilePictureInputProps {
  name: string;
  label?: string;
  required?: boolean;
}

const ProfilePictureInput = ({
  name,
  label = "Profile Picture",
  required = false,
}: ProfilePictureInputProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteClick = () => {
    setPreview(null);
    field.onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      field.onChange(file);

      const reader = new FileReader();
      reader.onloadstart = () => {
        setIsLoading(true);
      };
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}
      </div>
      <div
        className={`${styles.imageWrapper} ${preview ? styles.withBorder : ""} ${isLoading ? styles.loading : ""}`}
        onClick={!preview && !isLoading ? handleEditClick : undefined}
      >
        <img
          src={preview || logo}
          alt="Profile"
          className={styles.profileImage}
        />
        {isLoading && (
          <div className={styles.loaderOverlay}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
            />
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={isLoading}
        />
      </div>
      {preview && !isLoading && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleEditClick}
          >
            <IconPencil size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
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
