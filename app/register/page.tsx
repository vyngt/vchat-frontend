"use client";

import { useEffect, useReducer, useState } from "react";
import { clientFetch } from "@/lib/auth/fetch";
import { useRouter } from "next/navigation";
import type { BackendErrorResponse } from "@/lib/auth";

// Declare
// Example of useReducer
interface SignUpForm {
  username: string;
  password: string;
  password_2: string;
}

const initialForm: SignUpForm = {
  username: "",
  password: "",
  password_2: "",
};

type ChangeTextAction = {
  type: "change_username" | "change_password" | "change_password_2";
  value: string;
};

type ClearFormAction = {
  type: "clear";
};

type SignUpAction = ChangeTextAction | ClearErrorAction;

function SignUpReducer(state: SignUpForm, action: SignUpAction) {
  switch (action.type) {
    case "change_username": {
      return { ...state, username: action.value };
    }
    case "change_password": {
      return { ...state, password: action.value };
    }
    case "change_password_2": {
      return { ...state, password_2: action.value };
    }
    case "clear": {
      return { ...initialForm };
    }
  }
  throw Error("Unknown action ");
}

// Handler Error Message
interface ErrorForm {
  show: boolean;
  message: string;
}

type ClearErrorAction = { type: "clear" };

type SetErrorAction = {
  type: "error";
  value: string;
};

type ErrorFormAction = ClearErrorAction | SetErrorAction;
function ErrorFormReducer(state: ErrorForm, action: ErrorFormAction) {
  switch (action.type) {
    case "error": {
      return { show: true, message: action.value };
    }
    case "clear": {
      return { show: false, message: "" };
    }
  }
}

const initialErrorForm: ErrorForm = {
  message: "",
  show: false,
};

// Usage
export default function Page() {
  const [state, dispatch] = useReducer(SignUpReducer, initialForm);
  const [errState, dispatchErrState] = useReducer(
    ErrorFormReducer,
    initialErrorForm
  );
  const router = useRouter();

  const makeSignUp = async () => {
    if (state.username.trim().length < 1 || state.password.length < 1) return;
    try {
      const resp = await clientFetch({
        endpoint: "users/create",
        body: JSON.stringify(state),
        method: "POST",
      });

      if (resp.status === 200) {
        router.push("/login");
      } else {
        const result: BackendErrorResponse = await resp.json();
        dispatchErrState({ type: "error", value: result.message });
      }

      dispatch({ type: "clear" });
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    if (errState.show) {
      const to = setTimeout(() => {
        dispatchErrState({ type: "clear" });
      }, 3000);

      return () => clearTimeout(to);
    }
  }, [errState.show]);

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="text-center text-4xl mb-3">
        <strong>Sign Up</strong>
      </div>
      <div className="flex justify-center">
        <form method="post" className="w-[600px] flex flex-col gap-6">
          <label>
            <strong>Username</strong>
            <div className="border-primary bg-primary/20 rounded-md h-10">
              <input
                name="username"
                type="text"
                className="bg-transparent h-full px-2 w-full"
                onChange={(ev) => {
                  dispatch({ type: "change_username", value: ev.target.value });
                }}
                value={state.username}
              />
            </div>
          </label>
          <label>
            <strong>Password</strong>
            <div className="border-primary bg-primary/20 rounded-md h-10">
              <input
                name="password"
                type="password"
                className="bg-transparent h-full px-2 w-full"
                onChange={(ev) => {
                  dispatch({ type: "change_password", value: ev.target.value });
                }}
                value={state.password}
              />
            </div>
          </label>
          <label>
            <strong>Confirm Password</strong>
            <div className="border-primary bg-primary/20 rounded-md h-10">
              <input
                name="password2"
                type="password"
                className="bg-transparent h-full px-2 w-full"
                onChange={(ev) => {
                  dispatch({
                    type: "change_password_2",
                    value: ev.target.value,
                  });
                }}
                value={state.password_2}
              />
            </div>
          </label>
          <div className="flex justify-center">
            <button
              className="border-2 border-primary rounded-md p-2 hover:text-background hover:bg-primary transition-colors"
              type="button"
              onClick={makeSignUp}
            >
              Sign Up
            </button>
          </div>
          <div className="text-secondary text-center">{errState.message}</div>
        </form>
      </div>
    </div>
  );
}
