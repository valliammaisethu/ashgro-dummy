import React, { ComponentProps } from "react";
import DatePicker from ".";
import renderWithContext from "../../utils/renderWithContext";
import { screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import dayjs from 'dayjs'
import { DOM_ELEMENT_ROLE } from "../../../enums/domElementRole.enum";
import { SharedComponentsConstants } from "../../../constants/sharedComponents";
import { vi } from 'vitest'

const { getByText, getByRole, queryByText } = screen;

const START_DATE_REQUIRED = "Start Date is a required Field";

const validationSchema = Yup.object().shape({
  startDate: Yup.date().required().label("Start Date")
});

const formikWrappedField = (
  props?: Omit<ComponentProps<typeof DatePicker.Formik>, "name">
) => (
  <Formik
    initialValues={{ startDate: "" }}
    onSubmit={vi.fn()}
    validationSchema={validationSchema}
  >
    <Form>
      <DatePicker.Formik name="startDate" {...props} />
      <Button htmlType="submit">Add</Button>
    </Form>
  </Formik>
);

describe("<DatePicker />", () => {
  it("Should Render Title if passed as prop", () => {
    const title = "Start Date";

    renderWithContext(<DatePicker name="startDate" title={title} />);

    expect(getByText(title)).toBeInTheDocument();
  });

  it("Should not Render Title if not passed", () => {
    const { container } = renderWithContext(<DatePicker name="startDate" />);

    expect(
      container.getElementsByClassName("dropdown-field__title").length
    ).toBeFalsy();
  });

  it("Should Render Selected Date", async () => {
    const { user } = renderWithContext(<DatePicker name="startDate" />);
    const dateField = getByRole(DOM_ELEMENT_ROLE.TEXT_BOX);
    const selectedDate = "2023-02-02";

    await user.type(dateField, selectedDate);

    expect(dateField).toHaveValue(selectedDate);
  });

  it("Should Render Today When Today Button is Clicked", async () => {
    const { user } = renderWithContext(<DatePicker name="startDate" />);
    const dateField = getByRole(DOM_ELEMENT_ROLE.TEXT_BOX);
    const selectedDate = dayjs().format(SharedComponentsConstants.DATE_FORMAT);

    await user.click(dateField);
    const today = getByText(/today/i);

    await user.click(today);

    expect(dateField).toHaveValue(selectedDate);
  });
});

describe("<DatePicker.Formik />", () => {
  it("Should Show Error when validation Fails", async () => {
    const { user } = renderWithContext(formikWrappedField());
    const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, { name: "Add" });

    await user.click(submitButton);

    expect(getByText(new RegExp(START_DATE_REQUIRED, "i"))).toBeInTheDocument();
  });

  it.each([[START_DATE_REQUIRED]])(
    "Should not show any errors when Form Loads",
    (errorMessage) => {
      renderWithContext(formikWrappedField());
      expect(queryByText(errorMessage)).toBeNull();
    }
  );

  it.each([[START_DATE_REQUIRED]])(
    "Should not Show Error when validation pass",
    async (errorMessage) => {
      const { user } = renderWithContext(formikWrappedField());
      const dateField = getByRole(DOM_ELEMENT_ROLE.TEXT_BOX);
      const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, { name: "Add" });

      await user.click(dateField);
      const today = getByText(/today/i);

      await user.click(today!);
      await user.click(submitButton);

      expect(queryByText(errorMessage)).not.toBeInTheDocument();
    }
  );
});
