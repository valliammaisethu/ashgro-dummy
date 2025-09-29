import React from "react";
import renderWithContext from "../../utils/renderWithContext";
import Dropdown from ".";
import { getQueriesForElement, screen } from "@testing-library/react";
import { Gender } from "../../../enums/genders.enum";
import { Form, Formik } from "formik";
import { DOM_ELEMENT_ROLE } from "../../../enums/domElementRole.enum";
import { DOM_ELEMENT_ATTRIBUTE } from "../../../enums/domElementAttribute";
import { vi } from "vitest";

const { getByText, getByRole, getByTitle } = screen;

const genderOptions = [
  { label: "Male", value: Gender.MALE },
  { label: "Female", value: Gender.FEMALE },
];

const initialValues = { gender: "" };

const formikWrappedField = () => (
  <Formik initialValues={initialValues} onSubmit={vi.fn()}>
    <Form>
      <Dropdown.Formik name="gender" options={genderOptions} />
    </Form>
  </Formik>
);

describe("<Dropdown />", () => {
  it("Should Render Title if passed as prop", () => {
    const title = "Gender";

    renderWithContext(<Dropdown name="gender" title={title} />);

    expect(getByText(title)).toBeInTheDocument();
  });

  it("Should not Render Title if not passed", () => {
    const { container } = renderWithContext(<Dropdown name="gender" />);

    expect(
      container.getElementsByClassName("dropdown-field__title").length,
    ).toBeFalsy();
  });

  it("Should Render Selected Option", async () => {
    const { user } = renderWithContext(
      <Dropdown name="gender" options={genderOptions} />,
    );

    const dropdown = getByRole(DOM_ELEMENT_ROLE.COMBOBOX) as HTMLInputElement;

    // Open Dropdown Menu
    await user.click(dropdown);

    // Get Male Option
    const maleOption = getByTitle("Male") as HTMLOptionElement;

    const options = getByRole(DOM_ELEMENT_ROLE.LISTBOX);

    // Click Male Option
    await user.click(maleOption);

    expect(
      Array.from(options.children).filter(
        (elem) =>
          elem.getAttribute(DOM_ELEMENT_ATTRIBUTE.ARIA_SELECTED) === "true",
      ).length,
    ).toBe(1);
  });

  it("Should Render no value if no option is selected", async () => {
    const { user } = renderWithContext(
      <Dropdown name="gender" options={genderOptions} />,
    );

    const dropdown = getByRole(DOM_ELEMENT_ROLE.COMBOBOX) as HTMLInputElement;

    // Open Dropdown Menu
    await user.click(dropdown);

    const options = getByRole(DOM_ELEMENT_ROLE.LISTBOX);

    // Move from dropdown without selecting any option
    await user.tab();

    expect(
      Array.from(options.children).filter(
        (elem) =>
          elem.getAttribute(DOM_ELEMENT_ATTRIBUTE.ARIA_SELECTED) === "true",
      ).length,
    ).toBe(0);
  });
});

describe("<Dropdown.Formik />", () => {
  it("Should Render Selected Option with Formik onChange", async () => {
    const { user, baseElement } = renderWithContext(formikWrappedField());

    const dropdown = getByRole(DOM_ELEMENT_ROLE.COMBOBOX) as HTMLInputElement;

    // Open Dropdown Menu
    await user.click(dropdown);

    // Get Female Option
    const femaleOption = getByTitle("Female") as HTMLOptionElement;

    // Click Female Option
    await user.click(femaleOption);

    const selectedOption =
      getQueriesForElement(baseElement).getByLabelText("Female");

    expect(
      selectedOption.getAttribute(DOM_ELEMENT_ATTRIBUTE.ARIA_SELECTED),
    ).toBe("true");
  });

  it("Should Render no value If no option selected with Formik onChange", async () => {
    const { user } = renderWithContext(formikWrappedField());

    const dropdown = getByRole(DOM_ELEMENT_ROLE.COMBOBOX) as HTMLInputElement;

    // Open Dropdown Menu
    await user.click(dropdown);

    // Move from Dropdown without selecting any option
    await user.tab();

    const options = getByRole(DOM_ELEMENT_ROLE.LISTBOX);

    expect(
      Array.from(options.children).filter(
        (elem) =>
          elem.getAttribute(DOM_ELEMENT_ATTRIBUTE.ARIA_SELECTED) === "true",
      ).length,
    ).toBe(0);
  });
});
