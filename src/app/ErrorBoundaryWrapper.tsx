// app/ErrorBoundaryWrapper.tsx
"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

const ErrorBoundaryWrapper = ({ children }: ErrorBoundaryWrapperProps) => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      if (window.location.pathname !== "/error") {
        router.push("/error");
      }
    }
  }, [hasError, router]);

  return (
    <ErrorBoundary>
      {React.cloneElement(children as React.ReactElement, {
        setError: setHasError,
      })}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
