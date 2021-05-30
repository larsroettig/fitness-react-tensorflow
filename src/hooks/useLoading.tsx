import { useReducer } from "react";

type State =
  | { status: "empty" }
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success" };

export type Action =
  | { type: "start" }
  | { type: "success" }
  | { type: "failure"; error: string };

export const useLoading = () => {
  const reducer = (state: State, action: Action): State => {

    switch (action.type) {
      case "start":
        return { status: "loading" };
      case "success":
        return { status: "success" };
      case "failure":
        return { status: "error", error: action.error };
    }
  };

  return useReducer(reducer, { status: "empty" });
};
