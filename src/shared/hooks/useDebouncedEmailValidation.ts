import { AxiosError } from "axios";
import { useCallback, useRef } from "react";
import { ValidateEmail } from "../utils/helpers";
import { ResponseModel } from "src/models/response.model";

export type EmailValidationError = AxiosError<ResponseModel>;

interface UseDebouncedEmailValidationParams {
  validateMutateAsync: (data: {
    email: string;
    clubId?: string;
  }) => Promise<ResponseModel>;
  clubId?: string;
  debounceMs?: number;
  onError?: (error: EmailValidationError) => void;
}

export const useDebouncedEmailValidation = ({
  validateMutateAsync,
  clubId,
  debounceMs = 500,
  onError,
}: UseDebouncedEmailValidationParams) => {
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleEmailChange = useCallback(
    (email: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(async () => {
        if (email && ValidateEmail(email)) {
          try {
            await validateMutateAsync({ email, clubId: clubId });
          } catch (error) {
            onError?.(error as EmailValidationError);
          }
        }
      }, debounceMs);
    },
    [clubId, validateMutateAsync, debounceMs, onError],
  );

  return { handleEmailChange };
};
