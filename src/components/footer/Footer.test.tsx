import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  test("render", () => {
    render(<Footer />);
    const textElement = screen.getByText(/projects/i);
    expect(textElement).toBeInTheDocument();
  });
});
/* eslint-env jest */
