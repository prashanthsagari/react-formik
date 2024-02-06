/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserRegistrationForm from "../UserRegistrationForm";

describe("UserRegistrationForm", () => {
  test("renders form fields correctly", () => {
    render(<UserRegistrationForm />);

    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  test("displays error messages for invalid inputs", async () => {
    render(<UserRegistrationForm />);

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Password confirmation is required")
    ).toBeInTheDocument();
  });

  test("displays error message for password length less than 6 characters", async () => {
    render(<UserRegistrationForm />);

    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "pass" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });

  test("displays error message for password confirmation mismatch", async () => {
    render(<UserRegistrationForm />);

    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "password456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Passwords must match")).toBeInTheDocument();
  });

  test("submits form with valid inputs", async () => {
    render(<UserRegistrationForm />);

    fireEvent.change(screen.getByLabelText("Name:"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password:"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.queryByText((content, element) => {
        const normalizedText = JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          confirmPassword: "password123",
        });
        const elementText = element.textContent || "";
        return elementText.includes(normalizedText);
      })
    );
  });
});
