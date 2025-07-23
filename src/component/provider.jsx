// ✅ Correct version
"use client";
import store from "@/state/store";
import { Provider } from "react-redux";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
