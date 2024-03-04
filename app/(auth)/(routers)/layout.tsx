import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex justify-center items-center h-[100vh]">{children}</div>;
};

export default AuthLayout;
