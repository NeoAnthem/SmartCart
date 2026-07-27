import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import {HiOutlineEnvelope, HiOutlineUserCircle, HiOutlineCheckBadge,HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineShoppingBag } from "react-icons/hi2";
import { updateProfile, changePassword, getProfileStats } from "../services/profileService";
import { toast } from "react-toastify";
import "../styles/Profile.css";

function Profile() {

    const name =
      localStorage.getItem(
        "name"
      );
  
    const email =
    localStorage.getItem(
      "email"
    );

    const role =
      localStorage.getItem(
        "role"
    );
  
    const [updatedName, setUpdatedName] = useState(name);

    const [updatedEmail, setUpdatedEmail] = useState(email);

  
    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    
  const [stats, setStats] = useState({

    totalOrders: 0,

    wishlistItems: 0,

    cartItems: 0,

    memberSince: "-"
});

  const [showLogoutModal,
    setShowLogoutModal] =
    useState(false);
  
  const [showEditModal, setShowEditModal] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);


  



  const handleLogout =
() => {

  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("role");

  window.location.href =
    "/login";
};

  const handleProfileUpdate = async () => {

    if (!/\S+@\S+\.\S+/.test(updatedEmail)) {

          toast.error("Please enter a valid email");

          return;
      }

    if (!updatedName.trim() || !updatedEmail.trim()) {


    toast.error(
        "Name and email cannot be empty"
    );
    return;
}
  
    setProfileLoading(true);

  try {

    await updateProfile(
      updatedName,
      updatedEmail
    );

    localStorage.setItem(
      "name",
      updatedName
    );

    localStorage.setItem(
      "email",
      updatedEmail
    );

    setShowEditModal(false);

    toast.success(
      "Profile updated successfully. Redirecting to login..."
    );

    setTimeout(() => {

      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      window.location.href = "/login";

    }, 2000);

  } catch (error) {
    toast.error(
      error.response?.data ||
      "Something went wrong"
    );
  } finally {

    setProfileLoading(false);

  }
};

const handlePasswordUpdate = async () => {

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  if (newPassword.length < 6) {
  toast.error(
    "Password must be at least 6 characters"  
  );
  return;
  }
  
  if (!currentPassword.trim()) {
    toast.error(
        "Please enter your current password"
    );
    return;
}

  setPasswordLoading(true);

  try {

    await changePassword(
      currentPassword,
      newPassword
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowPasswordModal(false);

    toast.success("Password changed successfully");

  } catch (error) {
    toast.error(
      error.response?.data ||
      "Something went wrong"
    );
  } finally {

    setPasswordLoading(false);

  }
  };
  
  useEffect(() => {

    const loadStats = async () => {

        try {

            const data = await getProfileStats();

            setStats(data);

        } catch (error) {

            toast.error(
    error.response?.data ||
    "Something went wrong"
);
        }
    };

    loadStats();

}, []);
  
return (

  <>
    <Navbar />

    <div className="profile-page">

      <h1 className="gradient-text">
        My Profile
      </h1>

      <div className="profile-layout">

        {/* LEFT CARD */}

        <div className="glass-card profile-card">

          <h2
            className="gradient-text"
            style={{
              fontSize: "32px"
            }}
          >
            {name}
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            Welcome back to SmartCart

            <HiOutlineShoppingBag
              size={18}
              color="#8b5cf6"
            />
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "16px"
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#d1d5db"
              }}
            >
              <HiOutlineEnvelope
                size={20}
                color="#60a5fa"
              />

              <span>{email}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#d1d5db"
              }}
            >
              <HiOutlineUserCircle
                size={20}
                color="#a855f7"
              />

              <span>{role.replace("ROLE_", "")}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#22c55e",
                fontWeight: "600"
              }}
            >
              <HiOutlineCheckBadge size={20} />

              <span>Active</span>
            </div>

          </div>

          <div className="profile-info-cards">

            <div
              className="glass-card"
              style={{
                padding: "15px",
                flex: 1
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <HiOutlineShieldCheck
                  size={22}
                  color="#8b5cf6"
                />

                <h3>Account</h3>
              </div>

              <p
                style={{
                  margin: "8px 0 0 30px",
                  color: "#cbd5e1"
                }}
              >
                Verified
              </p>

            </div>

            <div
              className="glass-card"
              style={{
                padding: "15px",
                flex: 1
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <HiOutlineSparkles
                  size={22}
                  color="#22c55e"
                />

                <h3>Status</h3>
              </div>

              <p
                style={{
                  margin: "8px 0 0 30px",
                  color: "#cbd5e1"
                }}
              >
                Active
              </p>

            </div>

          </div>

          <div className="profile-actions">
            
<button
  className="glow-button"
  style={{
    padding: "10px 16px"
  }}
  onClick={() => setShowEditModal(true)}
>
  Edit Profile
</button>

<button
  className="glow-button"
  style={{
    padding: "10px 16px",
    background:
      "linear-gradient(90deg,#0ea5e9,#06b6d4)"
  }}
  onClick={() => setShowPasswordModal(true)}
>
  Change Password
</button>

  <button
    className="glow-button"
    onClick={() =>
      setShowLogoutModal(true)
    }
    style={{
      padding: "10px 16px",
      background:
        "linear-gradient(90deg,#ef4444,#dc2626)"
    }}
  >
    Logout
  </button>
          </div>
          </div>

        {/* RIGHT CARD */}

        <div className="glass-card profile-card">

          <h2 className="gradient-text">
            Account Stats
          </h2>

          <div className="profile-stats-grid">

            <div
              className="glass-card"
              style={{
                padding: "18px"
              }}
            >
              <h3>Total Orders</h3>
              <p style={{ color: "#60a5fa" }}>
                {stats.totalOrders}
              </p>
            </div>

            <div
              className="glass-card"
              style={{
                padding: "18px"
              }}
            >
              <h3>Wishlist</h3>
              <p style={{ color: "#ec4899" }}>
                {stats.wishlistItems}
              </p>
            </div>

            <div
              className="glass-card"
              style={{
                padding: "18px"
              }}
            >
              <h3>Cart</h3>
              <p style={{ color: "#22c55e" }}>
                {stats.cartItems}
              </p>
            </div>

            <div
              className="glass-card"
              style={{
                padding: "18px"
              }}
            >
              <h3>Member Since</h3>
              <p style={{ color: "#f59e0b" }}>
                {stats.memberSince}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

    {
      showLogoutModal && (

<div
  onClick={() =>
    setShowLogoutModal(false)
  }
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999
  }}
>

  <div
    className="glass-card profile-modal logout-modal"
    onClick={(e) =>
      e.stopPropagation()
    }
  >

    <h2
      className="gradient-text"
    >
      Logout
    </h2>

    <p
      style={{
        marginTop: "15px",
        color: "#cbd5e1"
      }}
    >
      Are you sure you want to logout?
    </p>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginTop: "30px"
      }}
    >

      <button
        className="glow-button"
        style={{
          background: "#ef4444",
          padding: "10px 20px"
        }}
        onClick={
          handleLogout
        }
      >
        Logout
      </button>

      <button
        className="glow-button"
        style={{
          padding: "10px 20px"
        }}
        onClick={() =>
          setShowLogoutModal(false)
        }
      >
        Cancel
      </button>

    </div>

  </div>

</div>

)
    }
    
    {
  showEditModal && (

    <div
      onClick={() => {

          setUpdatedName(name);

          setUpdatedEmail(email);

          setShowEditModal(false);

      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999
      }}
    >

      <div
        className="glass-card profile-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="gradient-text">
          Edit Profile
        </h2>

        <input
          className="cool-input"
          type="text"
          value={updatedName}
          onChange={(e) =>
            setUpdatedName(e.target.value)
          }
          placeholder="Name"
          style={{
            marginTop: "20px",
            width: "100%"
          }}
        />

        <input
          className="cool-input"
          type="email"
          value={updatedEmail}
          onChange={(e) =>
            setUpdatedEmail(e.target.value)
          }
          placeholder="Email"
          style={{
            marginTop: "15px",
            width: "100%"
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "25px"
          }}
        >

          <button
            className="glow-button"
            onClick={() => {

                setUpdatedName(name);

                setUpdatedEmail(email);

                setShowEditModal(false);

            }}
                style={{
                  padding: "10px"
                }}
          >
            Cancel
          </button>

          <button
                className="glow-button"
                onClick={handleProfileUpdate}
                disabled={profileLoading}
                style={{
                  padding: "10px"
                }}
          >
            {profileLoading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>

  )
    }
    
    {
  showPasswordModal && (

    <div
      onClick={() => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setShowPasswordModal(false);
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999
      }}
    >

      <div
        className="glass-card profile-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="gradient-text">
          Change Password
        </h2>

        <input
          className="cool-input"
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
          style={{
            marginTop: "20px",
            width: "100%"
          }}
        />

        <input
          className="cool-input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          style={{
            marginTop: "15px",
            width: "100%"
          }}
        />

        <input
          className="cool-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          style={{
            marginTop: "15px",
            width: "100%"
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "25px"
          }}
        >

          <button
            className="glow-button"
            onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setShowPasswordModal(false);
            }}
                style={{
                  padding: "10px"
                }}
          >
            Cancel
          </button>

              <button
                className="glow-button"
                onClick={handlePasswordUpdate}
                disabled={passwordLoading}
                style={{
                    padding: "10px"
                  }}
              >
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>

        </div>

      </div>

    </div>

  )
}
    </>

  );

}

export default Profile;