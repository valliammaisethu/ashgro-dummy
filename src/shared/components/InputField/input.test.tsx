import React from "react";
import { screen } from "@testing-library/react";
import { Formik } from "formik";
import { User } from "../../../models/user.model";
import InputField from ".";
import renderWithContext from "../../utils/renderWithContext";
import * as Yup from "yup";
import { INPUT_TYPE } from "../../../enums/inputType";
import { DOM_ELEMENT_ROLE } from "../../../enums/domElementRole.enum";
import { vi } from 'vitest'

const { getByRole, getByText, getByPlaceholderText, queryByText } = screen;

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
});

const getFormikWrappedField = () => (
  <Formik
    initialValues={new User()}
    validationSchema={validationSchema}
    onSubmit={vi.fn()}
  >
    <InputField
      name="email"
      type={INPUT_TYPE.EMAIL}
      placeholder="Enter Email"
    />
  </Formik>
);

describe("<InputField />", () => {
  it.each([["Email must be a valid email", "Email is a required field"]])(
    "Should not have any validation error when input loads",
    async (errorMessage) => {
      // Arrange
      renderWithContext(getFormikWrappedField());

      // Assert
      expect(queryByText(errorMessage)).toBeNull();
    }
  );

  it("Should have validation error when input is empty", async () => {
    // Arrange
    const { user } = renderWithContext(getFormikWrappedField());
    const input = getByRole(DOM_ELEMENT_ROLE.TEXT_BOX);

    // Act
    // Simulate Blur Event
    await user.click(input);
    await user.click(document.body);

    // Assert
    expect(getByText(/Email is a required field/i)).toBeInTheDocument();
  });

  it("Should have validation error when input value is invalid", async () => {
    // Arrange
    const { user } = renderWithContext(getFormikWrappedField());
    const input = getByPlaceholderText(/Enter Email/i);

    // Act
    await user.type(input, "test");
    await user.click(document.body);

    // Assert
    expect(getByText(/Email must be a valid email/i)).toBeInTheDocument();
  });
});
