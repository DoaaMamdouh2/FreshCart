import AuthForm from "@/components/AuthForm/AuthForm";
import AuthShowcase from "@/components/AuthShowcase/AuthShowcase";

export default function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isSignup = mode === "register";

  return (
    <main className="flex flex-1 items-center bg-white">
      <div className={`mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:px-8 ${isSignup ? "lg:grid-cols-[minmax(0,1fr)_minmax(430px,0.9fr)] lg:gap-12" : "lg:grid-cols-2 lg:gap-10"}`}>
        <AuthShowcase mode={mode} />
        <div className={`mx-auto w-full ${isSignup ? "max-w-xl" : "max-w-lg"}`}>
          <AuthForm mode={mode} />
        </div>
      </div>
    </main>
  );
}
