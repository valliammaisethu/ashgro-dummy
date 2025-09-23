import React, { ComponentProps } from "react";
import OTPField from ".";
import renderWithContext from "../../utils/renderWithContext";
import { screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import { DOM_ELEMENT_ROLE } from "../../../enums/domElementRole.enum";
import { vi } from 'vitest'

const { getAllByRole } = screen;

const { TEXT_BOX } = DOM_ELEMENT_ROLE;

const formikWrappedOtpField = (
  props?: ComponentProps<typeof OTPField.Formik>
) => (
  <Formik initialValues={{ otp: "" }} onSubmit={vi.fn()}>
    <Form>
      <OTPField.Formik name="otp" {...props} />
    </Form>
  </Formik>
);

describe("<OtpField />", () => {
  it("Should render 6 number fields by default", async () => {
    renderWithContext(<OTPField onChange={vi.fn()} />);

    expect(getAllByRole(TEXT_BOX).length).toBe(6);
  });

  it("Should render n number fields if n is passed as numsInput prop", async () => {
    const numsInput = 3;
    renderWithContext(<OTPField numInputs={numsInput} onChange={vi.fn()} />);

    expect(getAllByRole(TEXT_BOX).length).toBe(numsInput);
  });

  it("Should Call onChange n times based on n typed Characters", async () => {
    const numsInput = 3;
    const mockedChangeHandler = vi.fn();
    const otp: string = new Array(numsInput)
      .fill(0)
      .reduce((prev, _, index) => `${prev}${index + 1}`, "");

    const { user } = renderWithContext(
      <OTPField numInputs={numsInput} onChange={mockedChangeHandler} />
    );

    const inputFields = screen.getAllByRole(TEXT_BOX);

    for (let i = 0; i < numsInput; i++)
      await user.type(inputFields[i], otp.charAt(i));

    expect(mockedChangeHandler).toHaveBeenCalledTimes(numsInput);
  });

  it("Should Call onChange with Typed Value", async () => {
    const numsInput = 3;
    const mockedChangeHandler = vi.fn();
    const otp = new Array(numsInput)
      .fill(0)
      .reduce<string>((prev, _, index) => `${prev}${index + 1}`, "");
    const { user } = renderWithContext(
      <OTPField numInputs={numsInput} onChange={mockedChangeHandler} />
    );

    const inputFields = screen.getAllByRole(TEXT_BOX);

    for (let i = 0; i < numsInput; i++)
      await user.type(inputFields[i], otp.charAt(i));

    for (let i = 0; i < numsInput; i++)
      expect(mockedChangeHandler).toHaveBeenNthCalledWith(i + 1, otp.charAt(i));
  });
});

describe("<OtpField.Formik />", () => {
  it("Should Render Typed Value", async () => {
    const numsInput = 3;
    const otp = new Array(numsInput)
      .fill(0)
      .reduce<string>((prev, _, index) => `${prev}${index + 1}`, "");
    const { user } = renderWithContext(formikWrappedOtpField());

    const inputFields = screen.getAllByRole(TEXT_BOX);

    for (let i = 0; i < numsInput; i++)
      await user.type(inputFields[i], otp.charAt(i));

    for (let i = 0; i < numsInput; i++)
      expect(inputFields[i]).toHaveValue(otp.charAt(i));
  });
});
