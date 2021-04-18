import Login from "./Login";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Login tests", () => {

  let user;

  const handler = jest.fn();

  beforeEach(() => {
    user = {
      "email": "seisenberg@middlebury.edu", "password":"password123"
    };

    handler.mockReset();
  });
  

  test("Login button is disabled without email and password", () => {
    const { container } = render(<Login complete={handler} />);
    
    const emailInput = container.querySelector("input[name=email");
    expect(emailInput).toHaveValue("");

    const passwordInput = container.querySelector("input[name=password");
    expect(passwordInput).toHaveValue("");

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: user.email } });

    fireEvent.change(passwordInput, { target: { value: user.password } });

    expect(emailInput).toHaveValue(user.email);
    expect(passwordInput).toHaveValue(user.password);
    expect(loginButton).toBeEnabled();
  });

  test("Login button is disabled if email removed", () => {
    const { container } = render(<Login complete={handler} />);

    const emailInput = container.querySelector("input[name=email");
    expect(emailInput).toHaveValue("");

    const passwordInput = container.querySelector("input[name = password");
    expect(passwordInput).toHaveValue("");

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: user.email } });

    fireEvent.change(passwordInput, { target: { value: user.password } });

    expect(emailInput).toHaveValue(user.email);
    expect(passwordInput).toHaveValue(user.password);
    expect(loginButton).toBeEnabled();

    fireEvent.change(emailInput, { target: { value: "" } });

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue(user.password);
    expect(loginButton).toBeDisabled();
  });

  test("Login button is disabled if password removed", () => {
    const { container } = render(<Login complete={handler} />);

    const emailInput = container.querySelector("input[name=email");
    expect(emailInput).toHaveValue("");

    const passwordInput = container.querySelector("input[name = password");
    expect(passwordInput).toHaveValue("");

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: user.email } });

    fireEvent.change(passwordInput, { target: { value: user.password } });

    expect(emailInput).toHaveValue(user.email);
    expect(passwordInput).toHaveValue(user.password);
    expect(loginButton).toBeEnabled();

    fireEvent.change(passwordInput, { target: { value: "" } });

    expect(passwordInput).toHaveValue("");
    expect(emailInput).toHaveValue(user.email);
    expect(loginButton).toBeDisabled();
  });

  // test("Message if password and email do not match", () => {

  //   const { container } = render(<Login complete={handler} />);

  //   const emailInput = container.querySelector("input[name=email");
  //   expect(emailInput).toHaveValue("");

  //   const passwordInput = container.querySelector("input[name = password");
  //   expect(passwordInput).toHaveValue("");

  //   const loginButton = screen.getByRole("button", { name: "Login" });
  //   expect(loginButton).toBeDisabled();

  //   const message = screen.getByRole("textbox", { name: "Message" });
  //   expect(message).toHaveValue("");

  //   fireEvent.change(emailInput, { target: { value: "hrigdon@middlbury.edu" } });

  //   fireEvent.change(passwordInput, { target: { value: user.password } });

  //   expect(message).toHaveValue("password and email do not match!");

    
  // });

});