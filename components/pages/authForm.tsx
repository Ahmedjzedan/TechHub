"use client";

import { useActionState } from "react";
import { Button } from "../ui/button";
import AuthButton from "../ui/buttons/authButton";
import { LabledInput } from "../ui/labeledInput";
import Link from "next/link";
import { authenticate, AuthState } from "@/app/auth/actions"; // Adjust path

type AuthFormProps = {
  mode: "signin" | "signup";
};

const initialState: AuthState = {
  errors: {},
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignIn = mode === "signin";
  const [state, formAction] = useActionState(authenticate, initialState);

  return (
    <div className="flex-col w-[75vw] sm:w-[40vw] m-8">
      <div className="flex gap-4 items-center">
        <AuthButton text="Sign in" pressed={isSignIn} href="/signin" />
        <AuthButton text="Sign up" pressed={!isSignIn} href="/signup" />
      </div>

      <form
        action={formAction}
        className="flex flex-col gap-4 items-center mt-12 mb-4"
      >
        <input type="hidden" name="mode" value={mode} />

        <div className="flex flex-col gap-4 items-center w-full">
          {isSignIn ? (
            <>
              <LabledInput
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                error={state.errors?.email}
              />
              <LabledInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                className="mb-4"
                error={state.errors?.password}
              />
            </>
          ) : (
            <>
              <LabledInput
                label="Full Name"
                name="name"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                error={state.errors?.name}
              />
              <LabledInput
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                error={state.errors?.email}
              />
              <LabledInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                error={state.errors?.password}
              />
              <LabledInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                autoComplete="new-password"
                className="mb-4"
                error={state.errors?.confirmPassword}
              />
            </>
          )}
        </div>

        {state.errors?.api && (
          <p className="text-sm text-red-500">{state.errors.api}</p>
        )}

        <span className="text-text-subtle text-sm">
          {isSignIn ? (
            <>
              Dont have an account? click{" "}
              <Link
                href={"/signup"}
                className="underline text-secondary font-semibold"
              >
                here
              </Link>{" "}
              to sign up instead
            </>
          ) : (
            <>
              Already have an account? click{" "}
              <Link
                href={"/signin"}
                className="underline text-secondary font-semibold"
              >
                here
              </Link>{" "}
              to sign in instead
            </>
          )}
        </span>

        <div className="flex gap-4">
          <Button type="submit" className="px-8 text-md w-30">
            {isSignIn ? "Sign in" : "Sign up"}
          </Button>
          <Link href={"/"}>
            <Button variant={"outline"} className="px-8 text-md">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
