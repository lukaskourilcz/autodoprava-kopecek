"use client";

import React, { Suspense } from "react";
import HomePage from "./HomePage";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function Page() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading...</p>}>
        <HomePage />
      </Suspense>
    </ErrorBoundary>
  );
}
