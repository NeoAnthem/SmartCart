import { NavLink } from "react-router-dom";
import cartLogo from "../assets/cart-logo.svg";
import { HiOutlineUserCircle } from "react-icons/hi2";
import "./Navbar.css";
import { useState } from "react";
import { HiOutlineBars3, HiXMark } from "react-icons/hi2";



function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const role =
    localStorage.getItem("role");

  return (

    <nav className="navbar">

      {/* Logo */}

      <NavLink to="/products" className="logo">
        


        <img
          src={cartLogo}
          alt="SmartCart Logo"
        />

        <h2>
          SmartCart
        </h2>

      </NavLink>

      <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
      >
          {menuOpen ? <HiXMark /> : <HiOutlineBars3 />}
      </button>


      {/* Center Menu */}

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>

        <NavLink to="/products"
          onClick={() => setMenuOpen(false)}
        style={{
                  color: "#b917ea"
          }}
        >
          Products
        </NavLink>

        <NavLink to="/cart"
          onClick={() => setMenuOpen(false)}
        style={{
                  color: "#b917ea"
          }}
        >
          Cart
        </NavLink>

        <NavLink to="/wishlist"
          onClick={() => setMenuOpen(false)}
        style={{
                  color: "#b917ea"
          }}
        >
          Wishlist
        </NavLink>

        <NavLink to="/orders"
          onClick={() => setMenuOpen(false)}
        style={{
                  color: "#b917ea"
          }}
        >
          Orders
        </NavLink>


        {

          role === "ROLE_ADMIN" && (

            <>

              <NavLink
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "#00e5ff"
                }}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/orders"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "#00e5ff"
                }}
              >
                Manage Orders
              </NavLink>

              <NavLink
                to="/admin/reports"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "#00e5ff"
                }}
              >
                Reports
              </NavLink>

              <NavLink
                to="/admin/users"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "#00e5ff"
                }}
              >
                Users
              </NavLink>

              <NavLink to="/admin/categories"
                onClick={() => setMenuOpen(false)}
              style={{
                  color: "#00e5ff"
                }}>
                Categories
              </NavLink>

              <NavLink
                to="/admin/products"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "#00e5ff",
                  
                }}
              >
                Products Admin
              </NavLink>

            </>

          )

        }

        <NavLink
            to="/profile"
            className="mobile-profile-link"
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#b917ea"
            }}
        >
            Profile
        </NavLink>

      </div>


      {/* Right Profile Icon */}

      <NavLink to="/profile" className="profile-link">

        <HiOutlineUserCircle />

      </NavLink>

    </nav>

  );

}

export default Navbar;