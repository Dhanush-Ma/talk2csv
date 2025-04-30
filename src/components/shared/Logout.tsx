"use client";

import React from "react";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { logout } from "@/services/actions/auth.actions";

const Logout = () => {
  const { execute, isExecuting } = useAction(logout);
  return (
    <Button
      onClick={() => {
        execute();
      }}
      disabled={isExecuting}
    >
      Logout
    </Button>
  );
};

export default Logout;
