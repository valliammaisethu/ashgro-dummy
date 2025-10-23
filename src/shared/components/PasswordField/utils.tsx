import { passwordAsterisk } from "src/constants/sharedComponents";
import { HandlePasswordChangeParams } from "src/shared/types/sharedComponents.type";

export const insertCharactersAt = (
  text: string,
  position: number,
  characters: string,
): string => {
  const before = text.substring(0, position);
  const after = text.substring(position);
  return before + characters + after;
};

export const deleteCharactersAt = (
  text: string,
  position: number,
  count: number,
): string => {
  const before = text.substring(0, position);
  const after = text.substring(position + count);
  return before + after;
};

export const handlePasswordChange = ({
  e,
  passwordState,
  setPasswordState,
  onChange,
}: HandlePasswordChangeParams) => {
  const { realValue } = passwordState;
  const maskedInput = e.target.value;
  const currentLength = maskedInput.length;
  const previousLength = realValue.length;
  const lengthDifference = currentLength - previousLength;
  const cursorPosition = e.target.selectionStart || currentLength;

  if (lengthDifference === 0) return;

  let updatedRealValue: string;

  if (lengthDifference > 0) {
    const insertPosition = cursorPosition - lengthDifference;
    const newCharacters = maskedInput.substring(insertPosition, cursorPosition);
    updatedRealValue = insertCharactersAt(
      realValue,
      insertPosition,
      newCharacters,
    );
  } else {
    const deletedCount = Math.abs(lengthDifference);
    updatedRealValue = deleteCharactersAt(
      realValue,
      cursorPosition,
      deletedCount,
    );
  }

  setPasswordState({
    ...passwordState,
    realValue: updatedRealValue,
    maskedValue: passwordAsterisk.repeat(updatedRealValue.length),
  });
  onChange(updatedRealValue);
};
