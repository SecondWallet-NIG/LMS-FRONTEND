"use client";
import ResetPasswordScreen from "../components/reset-password/ResetPasswordScreen";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const verificationToken = searchParams.get("token") || "";

  return <ResetPasswordScreen verificationToken={verificationToken} />;
}
