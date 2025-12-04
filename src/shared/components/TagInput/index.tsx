import React, { useState } from "react";
import { Input, Tag } from "antd";
import { useFormContext, useController } from "react-hook-form";

import { TagInputProps } from "src/shared/types/sharedComponents.type";
import { defaultTagInputPlaceholder } from "src/constants/sharedComponents";

import styles from "./tagInput.module.scss";
import Label from "../Label";
import ErrorMessage from "../Error";

const TagInput: React.FC<TagInputProps> = ({
  name,
  label,
  placeholder = defaultTagInputPlaceholder,
  required,
}) => {
  const { control } = useFormContext();

  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleRemoveTag = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    removeTag(index);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return (
    <div>
      <Label className={styles.tagLabel} htmlFor={name} required={required}>
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInput}
        onKeyDown={onKeyDown}
      />

      <div className={styles.tagsContainer}>
        {value?.map((tag: string, index: number) => (
          <Tag
            key={`${tag}-${index}`}
            closeIcon
            className={styles.tag}
            onClose={handleRemoveTag(index)}
          >
            {tag}
          </Tag>
        ))}
      </div>
      <ErrorMessage message={error?.message} />
    </div>
  );
};

export default TagInput;
