import { useEffect, useState } from "react";
import Chatbot from "./components/Chatbot";

/* USER COMPONENTS */
import SplashScreen from "./components/SplashScreen";
import Hero from "./components/Hero";
import SendOtp from "./components/SendOtp";
import VerifyOtp from "./components/VerifyOtp";
import Login from "./components/Login";
import LoginOtp from "./components/LoginOtp";
import Dashboard from "./components/Dashboard";
import AdminUserLinks from "./components/admin/AdminUserLinks";
import About from "./components/About";
import Navbar from "./components/Navbar";

/* ADMIN COMPONENTS */
import AdminLogin from "./components/admin/AdminLogin";
import AdminOtp from "./components/admin/AdminOtp";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {

  const [step, setStep] = useState("splash");
  const [email, setEmail] = useState("");
  const [, setToken] = useState(localStorage.getItem("token") || "");
  const [adminEmail, setAdminEmail] = useState(localStorage.getItem("admin") || "");

  /* SPLASH SCREEN */
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep("home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /* SPLASH PAGE */
  if (step === "splash") {
    return <SplashScreen />;
  }

  /* USER DASHBOARD */
  if (step === "dashboard") {
    return <Dashboard setStep={setStep} />;
  }

  if (step === "about") {
  return <About />;
}
  
  /* ADMIN DASHBOARD */
  if (step === "admin-dashboard") {
    return <AdminDashboard setStep={setStep} />;
  }

  /* ADMIN USER LINKS PAGE */
  if (step === "admin-user-links") {
    return <AdminUserLinks setStep={setStep} />;
  }


  /* ADMIN LOGIN */
  if (step === "admin-login") {
    return (
      <AdminLogin
        onNext={(email) => {
          setAdminEmail(email);
          setStep("admin-otp");
        }}
      />
    );
  }
  <Navbar setStep={setStep} />


  /* ADMIN OTP */
  if (step === "admin-otp") {
    return (
      <AdminOtp
        email={adminEmail}
        onVerified={() => {
          localStorage.setItem("admin", adminEmail);
          setStep("admin-dashboard");
        }}
      />
    );
  }

  return (
    <>
      <Hero
        setStep={setStep}
        goToLogin={() => setStep("login")}
        goToRegister={() => setStep("register")}
        goToAdmin={() => setStep("admin-login")}
      >

        {/* REGISTER FLOW */}
        {step === "register" && (
          <SendOtp
            onNext={(userEmail) => {
              setEmail(userEmail);
              setStep("verify");
            }}
            goToLogin={() => setStep("login")}
          />
        )}

        {step === "verify" && (
          <VerifyOtp
            email={email}
            onVerified={() => setStep("login")}
          />
        )}

        {/* LOGIN FLOW */}
        {step === "login" && (
          <Login
            onNext={(userEmail) => {
              setEmail(userEmail);
              setStep("login-otp");
            }}
          />
        )}

        {step === "login-otp" && (
          <LoginOtp
            email={email}
            onVerified={(jwtToken) => {
              localStorage.setItem("token", jwtToken);
              setToken(jwtToken);
              setStep("dashboard");
            }}
          />
        )}

      </Hero>

      {/* CHATBOT (VISIBLE ONLY ON HOME PAGE) */}
      {step === "home" && <Chatbot />}

    </>
  );
}

export default App;
