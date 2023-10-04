"use client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import OnboardingScreen from "../components/login/OnboardingScreen";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";

export default function Home() {
  return <OnboardingScreen />;
}
