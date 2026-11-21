"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { AtSign, CircleAlert, CircleCheck, Eye, EyeOff, LockKeyhole, UserRoundPlus } from "lucide-react";
import { Controller, type Resolver, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterFormType } from "@/app/register/register.interface";
import { signUpUser } from "@/app/register/register.services";
import { passwordPattern, registerSchema } from "@/app/register/register.zod";
import { loginSchema } from "@/app/login/login.zod";
import { signIn } from "next-auth/react";

const strengthLevels = [
  { label: "", bar: "*:bg-slate-300!", text: "text-slate-400" },
  { label: "Weak", bar: "*:bg-red-500!", text: "text-red-500" },
  { label: "Fair", bar: "*:bg-amber-500!", text: "text-amber-600" },
  { label: "Good", bar: "*:bg-lime-500!", text: "text-lime-600" },
  { label: "Strong", bar: "*:bg-emerald-600!", text: "text-emerald-600" },
];

function FieldStatus({
  type,
  children,
}: {
  type: "error" | "success";
  children: ReactNode;
}) {
  const isError = type === "error";
  const Icon = isError ? CircleAlert : CircleCheck;

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`mt-2 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-xs ${isError ? "border-red-200 bg-red-50 text-red-600" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
    >
      <Icon aria-hidden="true" className="mt-px size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const signup = mode === "register";
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    mode: "onTouched",
    resolver: signup
      ? zodResolver(registerSchema)
      : (zodResolver(loginSchema) as unknown as Resolver<RegisterFormType>),
  });

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "rePassword" });

  const strength = [
    password.length >= 8,
    /\d/.test(password),
    /[@$!%*?&]/.test(password),
    /[a-z]/.test(password) && /[A-Z]/.test(password),
  ].filter(Boolean).length;
  const level = strengthLevels[strength];
  const passwordValid = passwordPattern.test(password);

  const passwordsMatch = confirmPassword !== "" && confirmPassword === password;
  let confirmError: string | undefined;
  if (!passwordsMatch) {
    if (confirmPassword !== "") {
      confirmError = "Your passwords do not match.";
    } else if (errors.rePassword) {
      confirmError = "Please confirm your password.";
    }
  }

  const input =
    "h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-100";

  function inputClass(hasError: boolean) {
    return `${input} ${hasError ? "border-red-400 ring-2 ring-red-100" : ""}`;
  }

  async function handleUserRegister(data: RegisterFormType) {
    setMessage("");

    try {
      const result = await signUpUser(data);

      if (result.success) {
        router.push("/login");
      } else {
        setMessage(result.message);
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  }

  async function handleUserLogin(data: RegisterFormType) {
    setMessage("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setMessage("Incorrect email or password.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  }

  function onSubmit(data: RegisterFormType) {
    if (signup) {
      return handleUserRegister(data);
    }
    return handleUserLogin(data);
  }

  return (
    <Card
      className={`gap-0 rounded-2xl border-gray-100 bg-white px-5 py-7 shadow-[0_12px_35px_rgba(15,23,42,0.10)] sm:px-8 ${signup ? "sm:py-7" : "sm:px-10 sm:py-8"}`}
    >
      <div className="text-center">
        {!signup ? (
          <p className="text-2xl font-extrabold tracking-tight text-gray-900">
            <span className="text-emerald-600">Fresh</span>Cart
          </p>
        ) : null}
        <h1
          className={`${signup ? "text-2xl" : "mt-2 text-xl"} font-bold text-gray-900`}
        >
          {signup ? "Create Your Account" : "Welcome Back!"}
        </h1>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {signup
            ? "Start your fresh journey with us today"
            : "Sign in to continue your fresh shopping experience"}
        </p>
      </div>

      <div className={`mt-8 grid gap-3 ${signup ? "grid-cols-2" : "grid-cols-1"}`}>
        {["Google", "Facebook"].map((provider) => (
          <Button
            key={provider}
            type="button"
            variant="outline"
            onClick={() => setMessage(`${provider} sign in is not connected yet.`)}
            className={`h-11 bg-white text-sm font-medium text-slate-700 ${signup ? "rounded-lg" : "rounded-xl"}`}
          >
            <span
              aria-hidden="true"
              className={`text-xl font-bold ${provider === "Google" ? "text-red-500" : "flex size-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white"}`}
            >
              {provider === "Google" ? "G" : "f"}
            </span>
            {signup ? provider : `Continue with ${provider}`}
          </Button>
        ))}
      </div>

      <div className="my-6 flex items-center gap-4 text-xs text-slate-500">
        <Separator className="w-auto! flex-1 bg-slate-100" />
        <span>{signup ? "or" : "OR CONTINUE WITH EMAIL"}</span>
        <Separator className="w-auto! flex-1 bg-slate-100" />
      </div>

      <form
        noValidate={signup}
        onSubmit={handleSubmit(onSubmit)}
        className={signup ? "space-y-6" : "space-y-5"}
      >
        {signup && (
          <div>
            <Label
              htmlFor="auth-name"
              className="mb-2 block text-sm text-slate-700"
            >
              Name<span aria-hidden="true">*</span>
            </Label>
            <Input
              id="auth-name"
              {...register("name")}
              autoComplete="name"
              placeholder="Ali Ahmed"
              aria-invalid={errors.name ? true : undefined}
              className={inputClass(!!errors.name)}
            />
            {errors.name && (
              <FieldStatus type="error">{errors.name.message}</FieldStatus>
            )}
          </div>
        )}

        <div>
          <Label
            htmlFor="auth-email"
            className="mb-2 block text-sm text-slate-700"
          >
            {signup ? "Email" : "Email Address"}
            {signup && <span aria-hidden="true">*</span>}
          </Label>
          <div className="relative">
            {!signup && (
              <AtSign
                aria-hidden="true"
                className="absolute top-3.5 left-4 size-4 text-slate-400"
              />
            )}
            <Input
              id="auth-email"
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder={signup ? "ali@example.com" : "Enter your email"}
              required={!signup}
              aria-invalid={errors.email ? true : undefined}
              className={`${inputClass(!!errors.email)} ${!signup ? "rounded-xl pl-11" : ""}`}
            />
          </div>
          {errors.email && (
            <FieldStatus type="error">{errors.email.message}</FieldStatus>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <Label htmlFor="auth-password" className="text-sm text-slate-700">
              Password{signup && "*"}
            </Label>
            {!signup && (
              <Button
                variant="ghost"
                type="button"
                onClick={() => setMessage("Password recovery is not connected yet.")}
                className="h-auto rounded-sm p-0 text-xs font-normal text-green-600 hover:bg-transparent hover:underline"
              >
                Forgot Password?
              </Button>
            )}
          </div>
          <div className="relative">
            {!signup && (
              <LockKeyhole
                aria-hidden="true"
                className="absolute top-3.5 left-4 size-4 text-slate-400"
              />
            )}
            <Input
              id="auth-password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              autoComplete={signup ? "new-password" : "current-password"}
              required={!signup}
              placeholder={
                signup ? "create a strong password" : "Enter your password"
              }
              aria-describedby={signup ? "password-help" : undefined}
              aria-invalid={errors.password ? true : undefined}
              className={`${inputClass(!!errors.password)} pr-11 ${!signup ? "rounded-xl pl-11" : ""}`}
            />
            <Button
              variant="ghost"
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-0 right-0 flex h-11 w-11 items-center justify-center rounded-md p-0 text-slate-400 hover:bg-transparent hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
          {signup && passwordValid && (
            <FieldStatus type="success">Password meets all requirements.</FieldStatus>
          )}
          {signup && !passwordValid && errors.password && (
            <FieldStatus type="error">{errors.password.message}</FieldStatus>
          )}
          {signup && (
            <div className="mt-3">
              <div className="flex items-center gap-3">
                <Progress
                  value={(strength / 4) * 100}
                  className={`h-1.5 flex-1 bg-slate-100 ${level.bar}`}
                />
                <span className={`w-14 text-right text-xs font-medium ${level.text}`}>
                  {password ? level.label : ""}
                </span>
              </div>
              <p id="password-help" className="mt-2 text-[11px] leading-4 text-slate-500">
                Use at least 8 characters with an uppercase letter, a lowercase
                letter, a number, and a symbol (@$!%*?&). Only letters, numbers,
                and these symbols are allowed.
              </p>
            </div>
          )}
        </div>

        {signup && (
          <>
            <div>
              <Label
                htmlFor="auth-confirm-password"
                className="mb-2 block text-sm text-slate-700"
              >
                Confirm Password<span aria-hidden="true">*</span>
              </Label>
              <Input
                id="auth-confirm-password"
                {...register("rePassword")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm your password"
                aria-invalid={confirmError ? true : undefined}
                className={inputClass(!!confirmError)}
              />
              {passwordsMatch && (
                <FieldStatus type="success">Passwords match.</FieldStatus>
              )}
              {confirmError && (
                <FieldStatus type="error">{confirmError}</FieldStatus>
              )}
            </div>

            <div>
              <Label
                htmlFor="auth-phone"
                className="mb-2 block text-sm text-slate-700"
              >
                Phone Number<span aria-hidden="true">*</span>
              </Label>
              <Input
                id="auth-phone"
                {...register("phone")}
                type="tel"
                autoComplete="tel"
                placeholder="01012345678"
                aria-invalid={errors.phone ? true : undefined}
                className={inputClass(!!errors.phone)}
              />
              {errors.phone && (
                <FieldStatus type="error">{errors.phone.message}</FieldStatus>
              )}
            </div>

            <div>
              <div className="flex items-start gap-2">
                <Controller
                  control={control}
                  name="terms"
                  render={({ field }) => (
                    <Checkbox
                      id="auth-terms"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                      className="mt-0.5 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
                    />
                  )}
                />
                <Label
                  htmlFor="auth-terms"
                  className="block text-xs font-normal leading-5 text-slate-600"
                >
                  I agree to the{" "}
                  <Link
                    href="#terms"
                    className="font-medium text-emerald-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#privacy"
                    className="font-medium text-emerald-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  <span aria-hidden="true"> *</span>
                </Label>
              </div>
              {errors.terms && (
                <FieldStatus type="error">{errors.terms.message}</FieldStatus>
              )}
            </div>
          </>
        )}

        {!signup && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="auth-remember"
              checked={remember}
              onCheckedChange={(checked) => setRemember(checked === true)}
              className="data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
            />
            <Label
              htmlFor="auth-remember"
              className="text-xs font-normal text-slate-600"
            >
              Keep me signed in
            </Label>
          </div>
        )}

        {message && <FieldStatus type="error">{message}</FieldStatus>}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full gap-2 rounded-lg bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-emerald-400"
        >
          {signup && <UserRoundPlus className="size-4" />}
          {isSubmitting
            ? signup
              ? "Creating account..."
              : "Signing in..."
            : signup
              ? "Create My Account"
              : "Sign In"}
        </Button>
      </form>

      <p className="mt-5 border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
        {signup ? "Already have an account?" : "New to FreshCart?"}{" "}
        <Link
          href={signup ? "/login" : "/register"}
          className="font-semibold text-emerald-600 hover:text-emerald-700"
        >
          {signup ? "Sign In" : "Create an account"}
        </Link>
      </p>
      {!signup && (
        <div className="mt-4 flex justify-center gap-4 text-[10px] text-gray-400">
          <span>♙ SSL Secured</span>
          <span>♧ 50K+ Users</span>
          <span>★ 4.9 Rating</span>
        </div>
      )}
    </Card>
  );
}