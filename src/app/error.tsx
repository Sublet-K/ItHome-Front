// app/error.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ErrorPage = ({ error, reset }) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    // You can also log the error to an error reporting service
  }, [error]);

  return (
    <div>
      <h1>Something went wrong!</h1>
      <button onClick={() => reset()}>Try again</button>
      <button onClick={() => router.push("/")}>Go to Home</button>
    </div>
  );
};

export default ErrorPage;
