import React from "react";
import { Formik } from "formik";
import Switch, { SwitchProps } from ".";
import renderWithContext from "../../utils/renderWithContext";
import { screen } from "@testing-library/react";
import { DOM_ELEMENT_ROLE } from "../../../enums/domElementRole.enum";
import { vi } from "vitest";

const { getByRole } = screen;

const getFormikWrappedField = (props?: Omit<SwitchProps, "name">) => (
  <Formik initialValues={{ active: false }} onSubmit={vi.fn()}>
    <Switch.Formik name="active" {...props} />
  </Formik>
);

describe("<SwitchComponent />", () => {
  it("Should onChange when clicked", async () => {
    const mockChangeHandler = vi.fn();
    const { user } = renderWithContext(
      getFormikWrappedField({ onChange: mockChangeHandler }),
    );
    const switchField = getByRole(DOM_ELEMENT_ROLE.SWITCH);

    await user.click(switchField);

    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
  });

  it("Should be toggled Off if checked is false", async () => {
    renderWithContext(getFormikWrappedField({ checked: false }));
    const switchField = getByRole(DOM_ELEMENT_ROLE.SWITCH);

    expect(switchField).not.toBeChecked();
  });

  it("Should be toggled On if checked is true", async () => {
    renderWithContext(getFormikWrappedField({ checked: true }));
    const switchField = getByRole(DOM_ELEMENT_ROLE.SWITCH);

    expect(switchField).toBeChecked();
  });
});
