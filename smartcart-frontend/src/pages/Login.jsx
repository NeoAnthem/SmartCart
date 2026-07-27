import { useState } from "react";
import "../styles/forms.css";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import cartLogo from "../assets/cart-logo.svg";
import "../styles/Login.css";

function Login() {
  

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
  
  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await loginUser(email, password);

    console.log(response);

    localStorage.setItem("token", response.token);
    localStorage.setItem("name", response.name);
    localStorage.setItem("email", response.email);
    localStorage.setItem("role", response.role);

    window.location.href = "/products";

  } catch (error) {

    toast.error(
      error.response?.data ||
      "Something went wrong"
    );

    toast.error("Login Failed");
  }
};
  
  

  return (

    <div className="login-page">

      <form className="login-card" onSubmit={handleLogin}>


        <div className="login-header">

        <img
          src={cartLogo}
          alt="SmartCart Logo"
          className="login-logo"
        />

  <h1 className="login-title">
    SmartCart
</h1>

</div>

        <p className="login-subtitle">
            The Future Of Online Shopping
        </p>

        <input
          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          style={{
  width: "100%",

  padding: "14px",

  marginTop: "15px",

  borderRadius: "12px",

  border:
    "1px solid rgba(255,255,255,0.15)",

  background:
    "rgba(255,255,255,0.05)",

  color: "#ffffff",

  outline: "none"
          }}
        />

        <input
          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          style={{
  width: "100%",

  padding: "14px",

  marginTop: "15px",

  borderRadius: "12px",

  border:
    "1px solid rgba(255,255,255,0.15)",

  background:
    "rgba(255,255,255,0.05)",

  color: "#ffffff",

  outline: "none"
}}
        />

        <button
          type="submit"
          style={{
              width: "100%",
              padding: "14px",
              marginTop: "20px",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontWeight: "600",
              background: "linear-gradient(90deg,#ff4fd8,#8b5cf6)",
              boxShadow: "0 0 25px rgba(255,79,216,0.4)"
          }}
        >
          Login
        </button>

        <p
  style={{
    marginTop: "18px",
    color: "#94a3b8",
    textAlign: "center",
    letterSpacing: "1px"
  }}
>
  Secure • Fast • Futuristic
</p>

        <div
  style={{
    marginTop: "30px",
    textAlign: "center",
    color: "#cbd5e1"
  }}
>
  Don't have an account?

  <button
    onClick={() =>
      window.location.href =
        "/register"
    }
    style={{
      background: "none",
      border: "none",
      color: "#ec4899",
      cursor: "pointer",
      fontWeight: "bold",
      marginLeft: "5px"
    }}
  >
    Sign Up
  </button>
</div>

      </form>

    </div>

  );

}

export default Login;