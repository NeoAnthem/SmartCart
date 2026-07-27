import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";
import "../styles/forms.css";

import cartLogo from "../assets/cart-logo.svg";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleRegister =
    async (e) => {
  
      e.preventDefault();

  if (
    password !==
    confirmPassword
  ) {

    toast.error(
      "Passwords do not match"
    );

    return;
  }

  try {

    await registerUser(

      name,
      email,
      password

    );

    toast.success(
      "Registration Successful 🎉"
    );

    setTimeout(() => {

      window.location.href =
        "/login";

    }, 2000);

  } catch (error) {

    toast.error(
    error.response?.data ||
    "Something went wrong"
);

    toast.error(

      error.response?.data ||

      "Registration Failed"

    );
  }
};

  return (

    <div className="login-page">

      <form
          className="login-card register-card"
          onSubmit={handleRegister}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "15px"
          }}
        >

          <img
            src={cartLogo}
            alt="SmartCart Logo"
            style={{
              width: "100px",
              height: "100px",
              marginBottom: "10px",
              filter:
                "drop-shadow(0 0 35px rgba(196,92,255,0.9))"
            }}
          />

          <h1
            style={{
              fontSize: "52px",
              fontWeight: "700",
              marginTop: "-30px",
              background:
                "linear-gradient(90deg,#ff4fd8,#8b5cf6,#00e5ff)",

              WebkitBackgroundClip:
                "text",

              WebkitTextFillColor:
                "transparent"
            }}
          >
            SmartCart
          </h1>

        </div>

        <p
          style={{
            marginTop: "10px",
            color: "#cbd5e1",
            textAlign: "center"
          }}
        >
          Create Your Customer Account
        </p>

        <input
          className="cool-input"
          type="text"

          placeholder="Full Name"

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

        />

        <input
          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="cool-input"
        />

        <input
          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="cool-input"
        />

        <input
          type="password"

          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }

          className="cool-input"
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

            background:
              "linear-gradient(90deg,#ff4fd8,#8b5cf6)",

            boxShadow:
              "0 0 25px rgba(255,79,216,0.4)"
          }}
        >
          Register
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
          Already have an account?

          <button
            onClick={() =>
              window.location.href =
                "/login"
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
            Login
          </button>

        </div>

      </form>

    </div>

  );

}


export default Register;