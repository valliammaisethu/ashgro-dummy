import React from "react";
import { screen } from "@testing-library/react";
import LoginForm from ".";
import renderWithContext from "../../shared/utils/renderWithContext";
import * as router from "react-router";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";
import { DOM_ELEMENT_ROLE } from "../../enums/domElementRole.enum";
import { vi } from 'vitest'

const { getByText, getByPlaceholderText, getByRole, queryByText } = screen;

describe("<LoginForm />", () => {
  it("Welcome should be in the document", () => {
    // Arrange
    renderWithContext(<LoginForm />);

    //Assert
    expect(getByText(/Welcome/i)).toBeInTheDocument();
  });

  it.each([
    ["Password is a required field"],
    ["Email is a required field"],
    ["Email must be a valid email"],
    ["Password must be at least 8 characters"]
  ])(
    "Shouldn't have validation errors when loading the form",
    async (errorMessage) => {
      // Arrange
      renderWithContext(<LoginForm />);

      //Assert
      expect(queryByText(errorMessage)).toBeNull();
    }
  );

  it.each([["Email is a required field"], ["Password is a required field"]])(
    "Should Show all Validation Error when submitting empty form",
    async (errorMessage) => {
      // Arrange
      const { user } = renderWithContext(<LoginForm />);

      const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, {
        name: /Login/i
      });

      // Act
      await user.click(submitButton);

      // Assert
      expect(getByText(errorMessage)).toBeInTheDocument();
    }
  );

  it("Should Show Email Validation Error when submitting form with empty email & valid password", async () => {
    // Arrange
    const { user } = renderWithContext(<LoginForm />);

    const passwordField = getByPlaceholderText(/Enter Password/i);
    const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, {
      name: /Login/i
    });

    // Act
    await user.type(passwordField, "Password@123");
    await user.click(submitButton);

    // Assert
    expect(getByText(/Email is a required field/i)).toBeInTheDocument();
  });

  it("Should Show Password Validation Error when submitting form with valid email & empty password", async () => {
    // Arrange
    const { user } = renderWithContext(<LoginForm />);

    const emailField = getByPlaceholderText(/Enter Email/i);
    const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, {
      name: /Login/i
    });

    // Act
    await user.type(emailField, "test123@gmail.com");
    await user.click(submitButton);

    // Assert
    expect(getByText(/Password is a required field/i)).toBeInTheDocument();
  });

  it("Should Show Email Validation Error when entering invalid email", async () => {
    // Arrange
    const { user } = renderWithContext(<LoginForm />);

    const emailField = getByPlaceholderText(/Enter Email/i);
    const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, {
      name: /Login/i
    });

    // Act
    await user.type(emailField, "test123");
    await user.click(submitButton);

    // Assert
    expect(getByText(/Email must be a valid email/i)).toBeInTheDocument();
  });

  it("Should Show Password Validation Error when entering invalid password less than 7 characters", async () => {
    // Arrange
    const { user } = renderWithContext(<LoginForm />);

    const passwordField = getByPlaceholderText(/Enter Password/i);
    const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, {
      name: /Login/i
    });

    // Act
    await user.type(passwordField, "test123");
    await user.click(submitButton);

    // Assert
    expect(
      getByText(/Password must be at least 8 characters/i)
    ).toBeInTheDocument();
  });

  it("Should call navigate method with home route when Form submit", async () => {
    // Arrange
    // Mock navigate to check whether it is called with correct argument
    const navigateMockFn = vi.fn();
    const spyInstance = vi
      .spyOn(router, "useNavigate")
      .mockImplementation(() => navigateMockFn);
    const { user } = renderWithContext(<LoginForm />);

    const emailField = getByPlaceholderText(/Enter Email/i);
    const passwordField = getByPlaceholderText(/Enter Password/i);
    const submitButton = getByRole(DOM_ELEMENT_ROLE.BUTTON, {
      name: /Login/i
    });

    // Act
    await user.type(emailField, "test@gmail.com");
    await user.type(passwordField, "Password@123");

    await user.click(submitButton);

    // Assert
    expect(navigateMockFn).toHaveBeenCalledWith(AppRoutes.HOME);

    spyInstance.mockRestore();
  });
});
