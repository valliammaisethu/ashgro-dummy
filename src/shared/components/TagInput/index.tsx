import React, { useState } from "react";
import { Input, Tag, Select } from "antd";
import { useFormContext, useController } from "react-hook-form";

import { TagInputProps } from "src/shared/types/sharedComponents.type";
import { defaultTagInputPlaceholder } from "src/constants/sharedComponents";

import styles from "./tagInput.module.scss";
import Label from "../Label";
import ErrorMessage from "../Error";
import ConditionalRenderComponent from "../ConditionalRenderComponent";

const TagInput: React.FC<TagInputProps> = ({
  name,
  label,
  placeholder = defaultTagInputPlaceholder,
  required,
  options,
  loading,
  disabled,
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

  const addTag = (tagValue?: string) => {
    if (value.includes(tagValue)) return;
    onChange([...value, tagValue]);
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

  const handleSelectChange = (selectedValue: string) => addTag(selectedValue);

  const availableOptions =
    options?.filter((opt) => !value.includes(opt.id)) || [];

  return (
    <div>
      <Label className={styles.tagLabel} htmlFor={name} required={required}>
        {label}
      </Label>

      <ConditionalRenderComponent
        visible={!!options}
        fallback={
          <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInput}
            disabled={disabled}
            onKeyDown={onKeyDown}
          />
        }
      >
        <Select
          key={value?.length}
          placeholder={placeholder}
          onChange={handleSelectChange}
          value={undefined}
          options={availableOptions}
          loading={loading}
          disabled={!availableOptions.length}
          showSearch={false}
        />
      </ConditionalRenderComponent>

      <div className={styles.tagsContainer}>
        {value?.map((tag: string, index: number) => {
          const displayName =
            options?.find((opt) => opt.id === tag)?.name || tag;

          return (
            <Tag
              key={`${tag}-${index}`}
              closeIcon
              className={styles.tag}
              onClose={handleRemoveTag(index)}
            >
              {displayName}
            </Tag>
          );
        })}
      </div>
      <ErrorMessage message={error?.message} />
    </div>
  );
};

export default TagInput;
