import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";
import {getCart, removeCartItem, updateCartQuantity, validateCoupon} from "../services/cartService";
import {checkout} from "../services/orderService";
import { processPayment } from "../services/paymentService";
import Pagination from "../components/Pagination";
import PageLoader from "../components/PageLoader";
import API_BASE_URL from "../services/api";
import { optimizeCloudinaryImage } from "../utils/cloudinary";


function Cart() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] =
    useState([]);
  
  const [couponCode,
    setCouponCode] =
    useState("");

  const [discount,
    setDiscount] =
    useState(0);
  
  const [isCheckingOut,
    setIsCheckingOut] =
    useState(false);
  
  const [orderPlaced,
    setOrderPlaced] =
    useState(false);
  
  const [currentPage,
  setCurrentPage] =
  useState(1);

  const itemsPerPage = 6;

  const fetchCart = async () => {
      try {
          setLoading(true);

          const data = await getCart();

          setCartItems(data);
      } catch (error) {
          toast.error(
              error.response?.data ||
              "Something went wrong"
          );
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {

    fetchCart();

  }, []);

    const totalPages = Math.ceil(

  cartItems.length /

  itemsPerPage

);

const currentCartItems =

  cartItems.slice(

    (currentPage - 1) * itemsPerPage,

    currentPage * itemsPerPage

  );

  useEffect(() => {

  if (

    currentPage > totalPages &&

    totalPages > 0

  ) {

    setCurrentPage(totalPages);

  }

}, [

  cartItems.length,

  currentPage,

  totalPages

]);

  const handleRemove = async (cartId) => {

    try {

      await removeCartItem(cartId);

      setCartItems(prev =>

        prev.filter(

          item => item.id !== cartId

        )

      );

    } catch (error) {

      toast.error(
    error.response?.data ||
    "Something went wrong"
);
    }
  };

  const applyCoupon =
  async () => {

    try {

      const value =
        await validateCoupon(
          couponCode
        );

      setDiscount(value);

      toast.success(
        `Coupon Applied! ${value}% OFF`
      );

    } catch (error) {

      toast.error(
        "Invalid Coupon"
      );

    }

  };

  const handleQuantityChange =
    async (
      cartId,
      quantity
    ) => {

      try {

        await updateCartQuantity(
          cartId,
          quantity
        );

        const updatedData =
          await getCart();

        setCartItems(
          updatedData
        );

      } catch (error) {

  toast.error(
    error.response?.data ||
    "Something went wrong"
);

  toast.error(
  error.response?.data ||
  "Not enough stock available"
);

}
    };

  const totalAmount =
    cartItems.reduce(
      (total, item) =>
        total +
        (
          item.product.price *
          item.quantity
        ),
      0
    );
  

  
const handleCheckout = async () => {

  if (isCheckingOut) return;

  setIsCheckingOut(true);

  try {

    const order = await checkout(couponCode);

    setOrderPlaced(true);

    // Immediately clear cart from UI
    setCartItems([]);

    // Reset coupon
    setCouponCode("");
    setDiscount(0);

    // Show success instantly
    toast.success("Order Placed Successfully 🎉");

    // Process payment in background
    processPayment(order.id)
      .catch(console.error);

    // Redirect after 2 seconds
    setTimeout(() => {

      navigate("/orders");

    }, 2000);

  } catch (error) {

    toast.error(
    error.response?.data ||
    "Something went wrong"
);

    toast.error(
      error.response?.data ||
      "Checkout Failed"
    );

    setIsCheckingOut(false);

  }

  };
  
  if (loading) {
    return (
        <PageLoader
            title="Loading Cart"
            message="Fetching your cart..."
        />
    );
  }

  return (

    <>
      <Navbar />

      <div
        style={{
          padding: "40px"
        }}
      >

        <h1
          className="gradient-text"
        >
          My Cart
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#cbd5e1"
          }}
        >
          Items : {cartItems.length}
        </p>

        {cartItems.length === 0 && !orderPlaced && (

          <div
            className="glass-card"
            style={{
              padding: "50px",
              marginTop: "30px",
              textAlign: "center"
            }}
          >

            <h2
              className="gradient-text"
            >
              Your Cart Is Empty
            </h2>

            <p
              style={{
                marginTop: "15px",
                color: "#cbd5e1"
              }}
            >
              Add some amazing products to your cart.
            </p>

            <button
              className="glow-button"
              style={{
                marginTop: "20px",
                padding: "10px"
              }}
              onClick={() =>
                window.location.href =
                "/products"
              }
            >
              Browse Products
            </button>

          </div>

        )}

        {orderPlaced && (

  <div
    className="glass-card"
    style={{
      padding: "60px",
      marginTop: "30px",
      textAlign: "center"
    }}
  >

    <div
      style={{
        fontSize: "90px"
      }}
    >
      🎉
    </div>

    <h1
      className="gradient-text"
      style={{
        marginTop: "20px",
        fontSize: "42px"
      }}
    >
      Order Confirmed!
    </h1>

    <p
      style={{
        marginTop: "20px",
        color: "#cbd5e1",
        fontSize: "18px",
        lineHeight: "32px"
      }}
    >
      Thank you for shopping with
      <strong> SmartCart</strong>.
      <br />
      Your order has been placed successfully.
    </p>

    <div
      style={{
        marginTop: "35px",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: "55px",
          height: "55px",
          border: "5px solid rgba(255,255,255,0.15)",
          borderTop: "5px solid #06b6d4",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
    </div>

    <h3
      style={{
        marginTop: "25px",
        color: "#22c55e"
      }}
    >
      Redirecting to My Orders...
    </h3>

  </div>

)}


        {cartItems.length > 0 && (

<>
  <div className="product-grid">

    {
      currentCartItems.map((item) => (

        <div
          key={item.id}
          className="glass-card"
          style={{
            padding: "20px"
          }}
        >

          <img
            loading="eager"
            decoding="async"
            draggable={false}
            src={
                item.product.imageUrl.startsWith("http")
                    ? optimizeCloudinaryImage(item.product.imageUrl, 600)
                    : `${API_BASE_URL}/images/${item.product.imageUrl}`
            }
            alt={item.product.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x220?text=No+Image";
            }}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "12px"
            }}
          />

          <h2
            style={{
              marginTop: "15px"
            }}
          >
            {item.product.name}
          </h2>

          <p
            style={{
              color: "#cbd5e1"
            }}
          >
            {item.product.description}
          </p>

          <h3 className="gradient-text">
            ₹ {item.product.price}
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              marginTop: "20px",
              marginBottom: "20px"
            }}
          >

            <button
              className="glow-button"
              style={{
                width: "45px",
                height: "45px",
                fontSize: "22px",
                borderRadius: "50%"
              }}
              onClick={() =>
                handleQuantityChange(
                  item.id,
                  Math.max(
                    1,
                    item.quantity - 1
                  )
                )
              }
            >
              -
            </button>

            <span
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                minWidth: "30px",
                textAlign: "center"
              }}
            >
              {item.quantity}
            </span>

            <button
              className="glow-button"
              style={{
                width: "45px",
                height: "45px",
                fontSize: "22px",
                borderRadius: "50%"
              }}
              onClick={() =>
                handleQuantityChange(
                  item.id,
                  item.quantity + 1
                )
              }
            >
              +
            </button>

          </div>

          <button
            className="glow-button"
            onClick={() =>
              handleRemove(item.id)
            }
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "12px",
              background:
                "linear-gradient(90deg,#ef4444,#ff4fd8)"
            }}
          >
            Remove
          </button>

        </div>

      ))
    }

            </div>
            
            <Pagination
  currentPage={currentPage}
  totalPages={totalPages || 1}
  setCurrentPage={setCurrentPage}
/>

  <div
    className="glass-card"
    style={{
      padding: "30px",
      marginTop: "20px",
      textAlign: "center"
    }}
  >

    <h2 className="gradient-text">
  Cart Total
</h2>

{
  discount > 0 && (

    <p
      style={{
        color: "#94a3b8",
        textDecoration: "line-through",
        fontSize: "22px",
        marginTop: "15px"
      }}
    >
      ₹ {totalAmount}
    </p>

  )
}

<h1
  style={{
    marginTop: "10px"
  }}
>
  ₹
  {
    totalAmount -
    (
      totalAmount *
      discount / 100
    )
  }
</h1>

{
  discount > 0 && (

    <p
      style={{
        color: "#22c55e",
        marginTop: "10px",
        fontWeight: "bold",
        fontSize: "18px"
      }}
    >
      Coupon Applied: {discount}% OFF 🎉
    </p>

  )
}
    
<div className="coupon-container">

<input
    className="cool-input"
    type="text"
    placeholder="Coupon Code"
    value={couponCode}
    onChange={(e) => setCouponCode(e.target.value)}
    style={{
        width: "240px",
        marginTop: 0,
        height: "45px",
        borderRadius: "16px",
        boxSizing: "border-box"
    }}
/>

<button
    className="glow-button"
    onClick={applyCoupon}
    style={{
        height: "45px",
        padding: "0 24px",
        marginTop: 0
    }}
>
    Apply
</button>

</div>

<button
  className="glow-button"
  onClick={handleCheckout}
  disabled={isCheckingOut}
  style={{
    marginTop: "20px",
    padding: "15px 40px",
    opacity: isCheckingOut ? 0.7 : 1,
    cursor: isCheckingOut ? "not-allowed" : "pointer"
  }}
>
  {
    isCheckingOut
      ? "Processing..."
      : "Proceed To Checkout"
  }
</button>

  </div>
</>

)}

      </div>

    </>

  );

}

export default Cart;