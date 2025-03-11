"use client";

import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div style={{ padding: "20px" }}>{children}</div>;
}
