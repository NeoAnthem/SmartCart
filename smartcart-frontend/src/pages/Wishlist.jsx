import {useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {getWishlist, removeWishlistItem } from "../services/wishlistService";
import { addToCart } from "../services/cartService";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";
import API_BASE_URL from "../services/api";

function Wishlist() {

  const [wishlistItems,
          setWishlistItems] =
    useState([]);
  
  const [loading, setLoading] = useState(true);

  const [currentPage,
        setCurrentPage] =
  useState(1);

  const itemsPerPage = 6;

  const fetchWishlist = async () => {
      try {

          setLoading(true);

          const data = await getWishlist();

          setWishlistItems(data);

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

    fetchWishlist();

  }, []);

  useEffect(() => {

  setCurrentPage(1);

}, [wishlistItems.length]);

  const handleRemove =
    async (id) => {

      try {

        await removeWishlistItem(id);

        setWishlistItems(
          wishlistItems.filter(
            item => item.id !== id
          )
        );

      } catch (error) {

        toast.error(
    error.response?.data ||
    "Something went wrong"
);

      }

    };
  
  const handleMoveToCart =
  async (item) => {

    try {

      await addToCart(
        item.product.id
      );

      await removeWishlistItem(
        item.id
      );

      setWishlistItems(
        wishlistItems.filter(
          wishlistItem =>
            wishlistItem.id !== item.id
        )
      );

      toast.success(
  "Moved To Cart Successfully 🛒"
);

    } catch (error) {

      toast.error(
    error.response?.data ||
    "Something went wrong"
);

      toast.error(
  "Failed To Move Item"
);

    }

  };

  const totalPages = Math.ceil(

  wishlistItems.length /

  itemsPerPage

);

const currentWishlistItems =

  wishlistItems.slice(

    (currentPage - 1) * itemsPerPage,

    currentPage * itemsPerPage

    );
  
  if (loading) {
    return (
        <PageLoader
            title="Loading Wishlist"
            message="Fetching your wishlist..."
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
          My Wishlist
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginTop: "10px"
          }}
        >
          Items :
          {" "}
          {wishlistItems.length}
        </p>

        {
          wishlistItems.length === 0 && (

            <div
              className="glass-card"
              style={{
                padding: "60px",
                textAlign: "center",
                marginTop: "30px"
              }}
            >

              <h2
                className="gradient-text"
              >
                Wishlist Is Empty
              </h2>

              <p
                style={{
                  color: "#cbd5e1",
                  marginTop: "15px"
                }}
              >
                Save products you love.
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

          )
        }

        <div className="product-grid">

          {
            currentWishlistItems.map(
              (item) => (

                <div
                  key={item.id}
                  className="glass-card"
                  style={{
                    padding: "20px"
                  }}
                >

                  <img
                    src={
                        item.product.imageUrl.startsWith("http")
                            ? item.product.imageUrl
                            : `${API_BASE_URL}/images/${item.product.imageUrl}`
                    }
                    alt={
                      item.product.name
                    }
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
                      marginTop: "20px"
                    }}
                  >
                    {item.product.name}
                  </h2>

                  <p
                    style={{
                      color: "#cbd5e1"
                    }}
                  >
                    {
                      item.product.description
                    }
                  </p>

                  <h3
                    className="gradient-text"
                  >
                    ₹ {item.product.price}
                  </h3>

                  <p
                    style={{
                      color: "#00e5ff"
                    }}
                  >
                    Category:
                    {" "}
                    {
                      item.product.category
                        ?.name
                    }
                  </p>

                  <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  }}
>

  <button
    className="glow-button"
    style={{
      flex: 1,
      padding: "8px"
    }}
    onClick={() =>
      handleMoveToCart(item)
    }
  >
    Move To Cart
  </button>

  <button
    className="glow-button"
    style={{
      flex: 1,
      background:
        "linear-gradient(90deg,#ef4444,#ff4fd8)"
    }}
    onClick={() =>
      handleRemove(item.id)
    }
  >
    Remove
  </button>

</div>

                </div>

              )
            )
          }

        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 1}
          setCurrentPage={setCurrentPage}
        />

      </div>

    </>

  );

}

export default Wishlist;