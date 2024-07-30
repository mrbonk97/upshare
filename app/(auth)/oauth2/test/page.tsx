"use client";

import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TestLoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem(
      "access_token",
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzIyMzU4NzY5LCJleHAiOjE3MjM1NjgzNjl9.dUwr26gDCdxcwOP-r_v3JorzMM6FaP3fVdtyqLUG62rprAXuBc2M2M6SuH3bkzBD3YQjO5byvHNQzbrsgm1CiA"
    );
    setTimeout(() => router.push("/home"), 500);
  }, []);
  return (
    <main className="h-full flex2">
      <Spinner />
    </main>
  );
};

export default TestLoginPage;
