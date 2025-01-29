"use client";

import React, { Suspense } from "react";
import HomePage from "./HomePage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HomePage />
    </Suspense>
  );
}
