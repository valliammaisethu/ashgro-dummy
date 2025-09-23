import React from "react";
import { render } from "@testing-library/react";
import RequireNetwork from "../components/HOC/requireNetwork";
import { AuthProvider } from "../../context/AuthContext";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

interface RenderReturn extends ReturnType<typeof render> {
  user: ReturnType<(typeof userEvent)["setup"]>;
}

const renderWithContext = (
  ...arg: Partial<Parameters<typeof render>>
): RenderReturn => {
  const [ui, options] = arg;
  return {
    user: userEvent.setup(),
    ...(render(
      <RequireNetwork>
        <AuthProvider>{ui}</AuthProvider>
      </RequireNetwork>,
      {
        wrapper: BrowserRouter,
        ...options,
      }
    ) as ReturnType<typeof render>),
  };
};

export default renderWithContext;
