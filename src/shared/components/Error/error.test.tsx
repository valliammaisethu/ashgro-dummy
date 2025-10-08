import React from "react";
import ErrorMessage from ".";
import renderWithContext from "../../utils/renderWithContext";
import { screen } from "@testing-library/react";

describe("<Error />", () => {
  it("Should render passed error message", () => {
    const errorMessage = "Email is Invalid";
    renderWithContext(<ErrorMessage message={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
