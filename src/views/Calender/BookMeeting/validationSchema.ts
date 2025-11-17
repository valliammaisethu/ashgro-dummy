import * as yup from "yup";

import { BOOK_MEETING_FIELDS, BOOK_MEETING_VALIDATION } from "./constants";

const { TITLE, TYPE, NAME, SLOT_DATE, MEETING_TIME } = BOOK_MEETING_FIELDS;
const {
  DATE_REQUIRED,
  NAME_REQUIRED,
  TIME_INVALID_RANGE,
  TIME_REQUIRED,
  TITLE_REQUIRED,
  TYPE_REQUIRED,
} = BOOK_MEETING_VALIDATION;

export const validationSchema = yup.object().shape({
  [TITLE.name]: yup.string().required(TITLE_REQUIRED),

  [TYPE.name]: yup.string().required(TYPE_REQUIRED),

  [NAME.name]: yup.string().required(NAME_REQUIRED),

  [SLOT_DATE.name]: yup.string().required(DATE_REQUIRED),

  [MEETING_TIME.name]: yup
    .array()
    .of(yup.string().nullable())
    .test("valid-range", TIME_INVALID_RANGE, (value) => {
      if (!value || value.length !== 2) return true;

      const [start, end] = value;

      if (!start || !end) return !start && !end;

      return end > start;
    })
    .required(TIME_REQUIRED),
});
