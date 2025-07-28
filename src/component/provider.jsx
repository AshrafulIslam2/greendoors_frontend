// ✅ Correct version
"use client";
import store from "@/state/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </Provider>
  );
}
