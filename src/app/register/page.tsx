"use client";
import { useActionState } from "react";
import { registerUser } from "../actions/users";

const initialState = {
  errors: {},
  values: {
    username: "",
    name: "",
    password: "",
    passwordConfirm: "",
  },
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values?.username}
            />
          </label>
          {state.errors?.username && (
            <p style={{ color: "red" }} data-testid="username-error">
              {state.errors.username}
            </p>
          )}
        </div>{" "}
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state.values?.name} />
          </label>
          {state.errors?.name && (
            <p style={{ color: "red" }}>{state.errors.name}</p>
          )}
        </div>{" "}
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              defaultValue={state.values?.password}
            />
          </label>
          {state.errors?.password && (
            <p style={{ color: "red" }}>{state.errors.password}</p>
          )}
        </div>
        <div>
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              defaultValue={state.values?.passwordConfirm}
            />
          </label>
          {state.errors?.passwordConfirm && (
            <p style={{ color: "red" }} data-testId="passwordConfirm-error">
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <button type="submit" data-testid="register-button">
          Register
        </button>
      </form>
    </div>
  );
}
