import { useCallback, useRef } from "react";
import { ValidateEmail } from "../utils/helpers";
import { ResponseModel } from "src/models/response.model";

interface UseDebouncedEmailValidationParams {
  validateMutateAsync: (data: {
    email: string;
    clubId: string;
  }) => Promise<ResponseModel>;
  clubId?: string;
  debounceMs?: number;
}

export const useDebouncedEmailValidation = ({
  validateMutateAsync,
  clubId,
  debounceMs = 500,
}: UseDebouncedEmailValidationParams) => {
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleEmailChange = useCallback(
    (email: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        if (email && clubId && ValidateEmail(email)) {
          validateMutateAsync({ email, clubId });
        }
      }, debounceMs);
    },
    [clubId, validateMutateAsync, debounceMs],
  );

  return { handleEmailChange };
};
