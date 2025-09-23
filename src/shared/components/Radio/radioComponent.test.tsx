import React, { ComponentProps } from "react";
import renderWithContext from "../../utils/renderWithContext";
import RadioButton from ".";
import { screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import { DOM_ELEMENT_ROLE } from "../../../enums/domElementRole.enum";
import { vi } from 'vitest'

const { getByRole, getByText, getAllByRole } = screen;
const { RADIO } = DOM_ELEMENT_ROLE;

const formikWrappedRadioButton = (
  props?: ComponentProps<typeof RadioButton.Formik>
) => (
  <Formik initialValues={{ framework: "" }} onSubmit={vi.fn()}>
    <Form>
      <RadioButton
        options={[
          { label: "React", value: "react" },
          { label: "Angular", value: "angular" }
        ]}
        {...props}
      />
    </Form>
  </Formik>
);

describe("<RadioButton />", () => {
  it("Should not have label if not passed", () => {
    const { container } = renderWithContext(<RadioButton />);

    expect(
      container.querySelector(".radio-component__label")
    ).not.toBeInTheDocument();
  });

  it("Should Render label if passed", () => {
    const label = "Category";
    renderWithContext(<RadioButton label={label} />);

    expect(getByText(label)).toBeInTheDocument();
  });

  it("Should Render only one Selected Option", async () => {
    const { user } = renderWithContext(
      <RadioButton
        options={[
          { label: "React", value: "react" },
          { label: "Angular", value: "angular" }
        ]}
      />
    );

    const reactOption = getByRole(RADIO, {
      name: /react/i
    });

    await user.click(reactOption);

    expect(
      getAllByRole(RADIO, {
        checked: true
      }).length
    ).toBe(1);
  });

  it("Should Render last Selected Option", async () => {
    const { user } = renderWithContext(
      <RadioButton
        options={[
          { label: "React", value: "react" },
          { label: "Angular", value: "angular" }
        ]}
      />
    );

    const reactOption = getByRole(RADIO, {
      name: /react/i
    });

    const angularOption = getByRole(RADIO, {
      name: /angular/i
    });

    await user.click(reactOption);
    await user.click(angularOption);

    expect(angularOption).toBeChecked();
    expect(reactOption).not.toBeChecked();
  });

  it("Should Render the Selected Option", async () => {
    const { user } = renderWithContext(
      <RadioButton
        options={[
          { label: "React", value: "react" },
          { label: "Angular", value: "angular" }
        ]}
      />
    );

    const reactOption = getByRole(RADIO, {
      name: /react/i
    });

    await user.click(reactOption);

    expect(reactOption).toBeChecked();
  });
});

describe("<RadioButton.Formik />", () => {
  it("Should Render only last Selected Option", async () => {
    const { user } = renderWithContext(formikWrappedRadioButton());

    const reactOption = getByRole(RADIO, {
      name: /react/i
    });

    await user.click(reactOption);

    expect(
      getAllByRole(RADIO, {
        checked: true
      }).length
    ).toBe(1);
  });

  it("Should Render only one Selected Option", async () => {
    const { user } = renderWithContext(formikWrappedRadioButton());

    const reactOption = getByRole(RADIO, {
      name: /react/i
    });

    const angularOption = getByRole(RADIO, {
      name: /angular/i
    });

    await user.click(angularOption);
    await user.click(reactOption);

    expect(
      getAllByRole(RADIO, {
        checked: true
      }).length
    ).toBe(1);
  });

  it("Should Render last Selected Option", async () => {
    const { user } = renderWithContext(formikWrappedRadioButton());

    const reactOption = getByRole(RADIO, {
      name: /react/i
    });

    const angularOption = getByRole(RADIO, {
      name: /angular/i
    });

    await user.click(reactOption);
    await user.click(angularOption);

    expect(angularOption).toBeChecked();
    expect(reactOption).not.toBeChecked();
  });

  it("Should Render the Selected Option", async () => {
    const { user } = renderWithContext(formikWrappedRadioButton());

    const reactOption = getByRole(RADIO, {
      name: /react/i
    });

    await user.click(reactOption);

    expect(reactOption).toBeChecked();
  });
});
