import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { addToWishlist } from "../services/wishlistService";
import axios from "axios";
import PageLoader from "../components/PageLoader";
import { toast } from "react-toastify";
import { getReviews, addReview } from "../services/reviewService";
import { getCategories } from "../services/categoryService";
import "../styles/forms.css";
import Select from "react-select";
import customSelectStyles from "../styles/selectStyles";
import Pagination from "../components/Pagination";
import {HiXMark, HiOutlineChatBubbleLeftRight, HiOutlineStar, HiOutlineTruck, HiOutlineArrowPath, HiOutlineShieldCheck } from "react-icons/hi2";
import API_BASE_URL from "../services/api";
import { optimizeCloudinaryImage } from "../utils/cloudinary";



function Products() {

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
  useState(["ALL"]);

  const loadCategories =
async () => {

  try {

    const data =
      await getCategories();

    setCategories([
      "ALL",
      ...data.map(
        category =>
          category.name
      )
    ]);

  } catch (error) {

    toast.error(
    error.response?.data ||
    "Something went wrong"
);

  }

};
  
  const [loading, setLoading] =
  useState(true);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [selectedCategory,
    setSelectedCategory] =
    useState("ALL");
  
  const [sortOption,
    setSortOption] =
    useState("DEFAULT");
  
  const [currentPage,
  setCurrentPage] =
  useState(1);

  const productsPerPage = 6;
  
  const [selectedProduct,
    setSelectedProduct] =
    useState(null);
  
  const [reviews,
    setReviews] =
    useState([]);
  
  const [reviewPage, setReviewPage] = useState(1);

  const reviewsPerPage = 3;
  
  const [averageRating,
    setAverageRating] =
    useState(0);
  
  const [rating,
    setRating] =
    useState(5);
  
  const [comment,
    setComment] =
    useState("");
  
  const [fiveStarCount,
    setFiveStarCount] =
    useState(0);

  const [fourStarCount,
    setFourStarCount] =
    useState(0);

  const [threeStarCount,
    setThreeStarCount] =
    useState(0);

  const [twoStarCount,
    setTwoStarCount] =
    useState(0);

  const [oneStarCount,
    setOneStarCount] =
    useState(0);
  
    const calculateRatingStats =
    (reviewsData) => {

      setFiveStarCount(
        reviewsData.filter(
          r => r.rating === 5
        ).length
      );

      setFourStarCount(
        reviewsData.filter(
          r => r.rating === 4
        ).length
      );

      setThreeStarCount(
        reviewsData.filter(
          r => r.rating === 3
        ).length
      );

      setTwoStarCount(
        reviewsData.filter(
          r => r.rating === 2
        ).length
      );

      setOneStarCount(
        reviewsData.filter(
          r => r.rating === 1
        ).length
      );
  };
  
  const handleReview =
  async () => {

    try {

      await addReview(
        selectedProduct.id,
        rating,
        comment
      );

      toast.success(
        "Review Added ⭐"
      );

      const data =
  await getReviews(
    selectedProduct.id
  );

      setReviews(data);
      
      setReviewPage(1);

calculateRatingStats(
  data
      );
      
      if (data.length > 0) {

    const total = data.reduce(
        (sum, review) => sum + review.rating,
        0
    );

    setAverageRating(
        (total / data.length).toFixed(1)
    );

} else {

    setAverageRating(0);

}



      setComment("");

      setRating(5);

    } catch (error) {

      toast.error(
    error.response?.data ||
    "Something went wrong"
);

      toast.error(
        "Failed To Add Review"
      );

    }

  };

  useEffect(() => {

    loadProducts();
    loadCategories();

  }, []);

  const filteredProducts = useMemo(() => {

    let result = [...products];

    if (selectedCategory !== "ALL") {

        result = result.filter(
            product =>
                product.category &&
                product.category.name === selectedCategory
        );

    }

    if (searchTerm.trim() !== "") {

        result = result.filter(product =>
            product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );

    }

    switch (sortOption) {

        case "PRICE_ASC":
            result.sort((a, b) => a.price - b.price);
            break;

        case "PRICE_DESC":
            result.sort((a, b) => b.price - a.price);
            break;

        case "NAME_ASC":
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;

        case "NAME_DESC":
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;

        default:
            break;
    }

    return result;

}, [products, searchTerm, selectedCategory, sortOption]);

  const totalPages = Math.ceil(

  filteredProducts.length /

  productsPerPage

);

const currentProducts =

  filteredProducts.slice(

    (currentPage - 1) * productsPerPage,

    currentPage * productsPerPage

    );
  
  const reviewTotalPages = Math.ceil(

    reviews.length / reviewsPerPage

);

const currentReviews = reviews.slice(

    (reviewPage - 1) * reviewsPerPage,

    reviewPage * reviewsPerPage

);

  useEffect(() => {

  setCurrentPage(1);

}, [

  searchTerm,

  selectedCategory,

  sortOption

  ]);
  
  useEffect(() => {

    setReviewPage(1);

}, [selectedProduct]);

  const loadProducts = async () => {

  try {

    setLoading(true);

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API_BASE_URL}/api/products`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setProducts(
      response.data
    );

  } catch (error) {

    console.error(
      "Products Error:",
      error
    );

  } finally {

    setLoading(false);

  }

};

  
  const addToCart = async (productId) => {

  try {

    const token =
      localStorage.getItem("token");

    await axios.post(
      `${API_BASE_URL}/api/cart`,
      {
        productId: productId,
        quantity: 1
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    toast.success(
  "Added To Cart 🛒"
);

  } catch (error) {

  toast.error(
    error.response?.data ||
    "Something went wrong"
);

  if (
    error.response?.data?.message
  ) {

    toast.error(
      error.response.data.message
    );

  } else if (
    typeof error.response?.data ===
    "string"
  ) {

    toast.error(
      error.response.data
    );

  } else {

    toast.error(
      "Failed To Add Cart"
    );

  }

}

  };
  
  const handleWishlist =
  async (productId) => {

    try {

      await addToWishlist(
        productId
      );

      toast.success(
  "Added To Wishlist ❤️"
);

    } catch (error) {

  toast.error(
    error.response?.data ||
    "Something went wrong"
);

  if (
    error.response?.data?.message
  ) {

    toast.error(
  error.response.data.message
);

  } else {

    toast.error(
  "Failed To Add Wishlist"
);
  }
}
    };
  


  return (

    <>
      <Navbar />

      {
        loading ? (
            <PageLoader
                title="Loading Products"
                message="Please wait while we fetch the latest products..."
            />
        ) : (

            <div
              style={{
                padding: "40px"
              }}
            >

              <h1
                className="gradient-text"
              >
                Products
              </h1>

              <div className="products-toolbar">

                <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className="cool-input"
  style={{
    maxWidth: "800px",
    flex: 1,
    minWidth: 0,
    marginTop: 0
  }}
/>

                <div className="products-filter">
                  <Select
                    isSearchable={false}
        tabSelectsValue={false}
        styles={customSelectStyles}
        options={categories.map(category => ({
            value: category,
            label: category
        }))}
        value={{
            value: selectedCategory,
            label: selectedCategory
        }}
        onChange={(selected) =>
            setSelectedCategory(selected.value)
        }
    />
</div>

<div className="products-sort">
                  <Select
                    isSearchable={false}
        tabSelectsValue={false}
        styles={customSelectStyles}
        options={[
            { value:"DEFAULT", label:"Sort By" },
            { value:"PRICE_ASC", label:"Price Low → High" },
            { value:"PRICE_DESC", label:"Price High → Low" },
            { value:"NAME_ASC", label:"Name A → Z" },
            { value:"NAME_DESC", label:"Name Z → A" }
        ]}
        value={[
            { value:"DEFAULT", label:"Sort By" },
            { value:"PRICE_ASC", label:"Price Low → High" },
            { value:"PRICE_DESC", label:"Price High → Low" },
            { value:"NAME_ASC", label:"Name A → Z" },
            { value:"NAME_DESC", label:"Name Z → A" }
        ].find(option => option.value === sortOption)}
        onChange={(selected) =>
            setSortOption(selected.value)
        }
    />
</div>

              </div>

              <div className="product-grid">

                {
                  currentProducts.map(
                    product => (

                      <div
                        key={product.id}
                        className="glass-card"
                        onClick={async () => {

  setSelectedProduct(
    product
  );

  try {

    const data =
      await getReviews(
        product.id
      );

    setReviews(data);

calculateRatingStats(
  data
);

    if (data.length > 0) {

      const total =
        data.reduce(
          (sum, review) =>
            sum + review.rating,
          0
        );

      setAverageRating(
    (total / data.length).toFixed(1)
);

    } else {

      setAverageRating(0);

    }

  } catch (error) {

    toast.error(
    error.response?.data ||
    "Something went wrong"
);

  }

}}
                        style={{
                          cursor: "pointer",
                          padding: "20px"
                        }}
                      >
                        <img
                          src={
                            optimizeCloudinaryImage(product.imageUrl, 700)
                              ? product.imageUrl
                              : `${API_BASE_URL}/images/${product.imageUrl}`
                          }
                          alt={product.name}
                          loading="eager"
                          decoding="async"
                          draggable={false}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                            borderRadius: "12px"
                          }}
                        />

                        <h2>{product.name}</h2>

                        <p>{product.description}</p>

                        <h3 className="gradient-text">
                          ₹{product.price}
                        </h3>
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
          )
      }

      
      
      {selectedProduct && (
  <div
    onClick={() =>
      setSelectedProduct(null)
    }
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "20px 0",
      overflowY: "auto",
      zIndex: 99999
    }}
  >

<div
  className="glass-card product-modal"
  onClick={(e) => e.stopPropagation()}
>
            
<button
  onClick={() => setSelectedProduct(null)}
  style={{
    position: "absolute",
    top: "12px",
    right: "12px",

    width: "42px",
    height: "42px",

    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "14px",

    background:
      "linear-gradient(135deg, rgba(25,25,40,.95), rgba(15,15,25,.95))",

    backdropFilter: "blur(18px)",

    color: "#e2e8f0",

    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    boxShadow:
      "0 10px 30px rgba(0,0,0,.45), 0 0 20px rgba(139,92,246,.25)",

    transition: "all .2s ease",

    zIndex: 9999
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      "scale(1.08) rotate(90deg)";

    e.currentTarget.style.boxShadow =
      "0 12px 35px rgba(0,0,0,.5), 0 0 25px rgba(236,72,153,.4)";
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "scale(1) rotate(0deg)";

    e.currentTarget.style.boxShadow =
      "0 10px 30px rgba(0,0,0,.45), 0 0 20px rgba(139,92,246,.25)";
  }}
>
  <HiXMark size={20} />
</button>

      <div className="product-modal-layout">

        {/* LEFT SIDE */}

              <div className="product-modal-left">
                
  {/* Background glow */}

<div
    className="product-glow"
    style={{
        position: "absolute",
        borderRadius: "50%",
        background:
            "radial-gradient(circle, rgba(168,85,247,.38), transparent 70%)",
        filter: "blur(70px)",
        zIndex: 0
    }}
/>

  {/* Image card */}

  <div className="product-image-card"
    style={{
      background:
        "linear-gradient(145deg, rgba(15,23,42,.95), rgba(30,41,59,.75))",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "32px",
      boxShadow:
        "0 25px 80px rgba(0,0,0,.55)",
      backdropFilter: "blur(25px)",
      position: "relative",
      zIndex: 2,
      transition: "all .3s ease"
    }}
  >
                  <img
                    className="product-image"
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    src={
                        selectedProduct.imageUrl?.startsWith("http")
                            ? optimizeCloudinaryImage(selectedProduct.imageUrl, 1200)
                            : `${API_BASE_URL}/images/${selectedProduct.imageUrl}`
                    }
                    alt={selectedProduct.name}
                    style={{
                      transition: "transform .3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1)";
                    }}
                  />
  </div>

  {/* Feature badges */}

<div className="product-badges">

  <div className="product-badge">

    <HiOutlineTruck
      size={18}
      color="#8b5cf6"
    />

    <span>
      Free Delivery
    </span>

  </div>

  <div className="product-badge">

    <HiOutlineArrowPath
      size={18}
      color="#06b6d4"
    />

    <span>
      Easy Returns
    </span>

  </div>

  <div className="product-badge">

    <HiOutlineShieldCheck
      size={18}
      color="#22c55e"
    />

    <span>
      Warranty
    </span>

  </div>

</div>
</div>


        {/* RIGHT SIDE */}

              <div className="product-modal-right">

          <div
  style={{
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "28px",
    textAlign: "center",
    marginBottom: "30px",
    backdropFilter: "blur(18px)"
  }}
>

  <h1
    style={{
      fontSize: "clamp(2rem, 4vw, 42px)",
      marginBottom: "12px"
    }}
  >
    {selectedProduct.name}
  </h1>

  <h2
    className="gradient-text"
    style={{
      fontSize: "clamp(1.7rem, 3vw, 36px)",
      marginBottom: "18px"
    }}
  >
    ₹{selectedProduct.price}
  </h2>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      flexWrap: "wrap",
      marginBottom: "18px"
    }}
  >

    <span
      style={{
        padding: "8px 16px",
        borderRadius: "999px",
        background: "rgba(139,92,246,.18)"
      }}
    >
      {selectedProduct.category?.name}
    </span>

    <span
      style={{
        padding: "8px 16px",
        borderRadius: "999px",
        background:
          selectedProduct.stock > 0
            ? "rgba(0,255,153,.18)"
            : "rgba(255,68,68,.18)",
        color:
          selectedProduct.stock > 0
            ? "#00ff99"
            : "#ff4444"
      }}
    >
      Stock: {selectedProduct.stock}
    </span>

  </div>

  <p
    style={{
      maxWidth: "500px",
      margin: "0 auto",
      color: "#cbd5e1",
      lineHeight: "1.8"
    }}
  >
    {selectedProduct.description}
  </p>

</div>

          <hr
            style={{
              margin: "25px 0"
            }}
          />

<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px"
  }}
>
  <HiOutlineChatBubbleLeftRight
    size={28}
    color="#8b5cf6"
  />

  <h2
    style={{
      margin: 0
    }}
  >
    Product Reviews
  </h2>
</div>

                <div
  style={{
    marginTop: "20px",
    marginBottom: "20px",
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }}
>

  {[
    { stars: 5, count: fiveStarCount },
    { stars: 4, count: fourStarCount },
    { stars: 3, count: threeStarCount },
    { stars: 2, count: twoStarCount },
    { stars: 1, count: oneStarCount }
  ].map(item => (

    <div
      key={item.stars}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}
    >

      <span
        style={{
          minWidth: "70px",
          color: "#FFD700",
          fontWeight: "bold"
        }}
      >
        {"★".repeat(item.stars)}
      </span>

      <div
        style={{
          flex: 1,
          height: "12px",
          background: "#1e293b",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >

        <div
          style={{
            width: `${
              reviews.length === 0
                ? 0
                : (item.count / reviews.length) * 100
            }%`,
            height: "100%",
            background:
              "linear-gradient(90deg,#ff4fd8,#8b5cf6,#00e5ff)"
          }}
        />

      </div>

      <span
        style={{
          minWidth: "25px",
          textAlign: "right"
        }}
      >
        {item.count}
      </span>

    </div>

  ))}

</div>
                
                <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
    marginBottom: "20px"
  }}
>

  <span
  style={{
    fontSize: "24px",
    color: "#FFD700"
  }}
>
  {
    "★".repeat(
      Math.round(
        Number(averageRating)
      )
    )
  }

  {
    "☆".repeat(
      5 -
      Math.round(
        Number(averageRating)
      )
    )
  }
</span>

<span
  style={{
    color: "#cbd5e1",
    fontSize: "18px"
  }}
>
  {Number(averageRating).toFixed(1)}
  /5
  ({reviews.length} Reviews)
</span>



</div>

          <div
  style={{
    marginTop: "15px",
    maxHeight: "330px",
    overflowY: "auto",
    paddingRight: "20px",
    marginRight: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  }}
>

            {
              reviews.length === 0
              ? (
                <p
                  style={{
                    color: "#94a3b8"
                  }}
                >
                  No reviews yet.
                </p>
              )
              : (
                currentReviews.map(
                  review => (

                    <div
  key={review.id}
  className="glass-card"
  style={{
  padding: "20px",
  marginBottom: "15px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)"
}}
>

                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between"
                        }}
                      >

                        <strong>
                          {review.user?.name}
                        </strong>

                        <span>
                          {
                            "⭐".repeat(
                              review.rating
                            )
                          }
                        </span>

                      </div>

                      <p
                        style={{
                          marginTop: "10px"
                        }}
                      >
                        {review.comment}
                      </p>

                    </div>

                  )
                )
              )
            }

                </div>
                
                <Pagination
                  currentPage={reviewPage}
                  totalPages={reviewTotalPages || 1}
                  setCurrentPage={setReviewPage}
                />


<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
    marginBottom: "15px"
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "15px"
    }}
  >
    <HiOutlineStar
      size={28}
      color="#f59e0b"
    />

    <h2
      style={{
        margin: 0
      }}
    >
      Add Review
    </h2>
  </div>

  <div
    style={{
      display: "flex",
      gap: "10px",
      fontSize: "35px",
      justifyContent: "center"
    }}
                  >
                    

            {
              [1,2,3,4,5].map(
                star => (

                  <span
                    key={star}
                    onClick={() =>
                      setRating(star)
                    }
                    style={{
                      cursor: "pointer",
                      color:
                        star <= rating
                        ? "#FFD700"
                        : "#555"
                    }}
                  >
                    ★
                  </span>

                )
              )
            }

                  </div>
                  </div>



                <textarea
                  className="cool-input"
            rows="3"
            placeholder="Write review..."
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            style={{
              marginTop: "15px"
            }}
          />

<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  }}
>
  <button
    className="glow-button"
    onClick={handleReview}
    style={{
      padding: "12px 28px",
      minWidth: "180px"
    }}
  >
    Submit Review
  </button>
</div>


          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >

            <button
              className="glow-button"
                    onClick={() => {
                      
                      if (
                        selectedProduct.stock <= 0
                      ) {

                        toast.error(
                          "Product is out of stock"
                        );

                        return;
                      }

                      addToCart(
                        selectedProduct.id
                      );

                    }}
                    style={{
              padding: "12px"
            }}
            >
              Add To Cart
            </button>

            <button
              className="glow-button"
              onClick={() =>
                handleWishlist(
                  selectedProduct.id
                )
              }
                    style={{
              padding: "12px"
            }}
            >
              ❤️ Wishlist
            </button>

          </div>

        </div>

      </div>

          </div>

  
        
        </div>

        
      )}
      

    </>
  );
}

export default Products;