import Home from "../pages/index";
import { render, screen, fireEvent } from "@testing-library/react";


describe("Login index.js tests", () => {

let user;

  const handler = jest.fn();

  beforeEach(() => {
    user = {
      "email":"seisenberg@middlebury.edu", "password":"password123"
    };

    handler.mockReset();
  });


test("Message if password and email do not match", () => {

    const { container } = render(<Home />);

    const emailInput = container.querySelector("input[name=email");
    expect(emailInput).toHaveValue("");

    const passwordInput = container.querySelector("input[name = password");
    expect(passwordInput).toHaveValue("");

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDisabled();
  
    fireEvent.change(emailInput, { target: { value: "hrigdon@middlbury.edu" } });

    fireEvent.change(passwordInput, { target: { value: user.password } });

    fireEvent.click(loginButton);

    const message = screen.getByText("password and email do not match!")
    expect(message).toBeInTheDocument();

    
  });
});