// components/ReduxProvider.tsx
"use client"; // This directive makes this a client component

import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
