import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProducts, deleteProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import {getCategories} from "../services/categoryService";
import { toast } from "react-toastify";
import Select from "react-select";
import customSelectStyles from "../styles/selectStyles";
import ConfirmDialog from "../components/ConfirmDialog";
import Pagination from "../components/Pagination";
import "../styles/AdminProducts.css";
import PageLoader from "../components/PageLoader";
import API_BASE_URL from "../services/api";

function AdminProducts() {

const navigate =
    useNavigate();
  
  const [loading, setLoading] = useState(true);
  
  const [products,
    setProducts] =
    useState([]);
  
  const [search,
    setSearch] =
      useState("");

  const [categories,
    setCategories] =
      useState([]);

  const [selectedCategory,
    setSelectedCategory] =
    useState("");
  
  const [confirmDialog,
    setConfirmDialog] = useState({
        open: false,
        title: "",
        message: "",
        action: null
    });
  
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;
  
  const loadCategories =
    async () => {

      try {

        const data =
          await getCategories();

        setCategories(data);

      } catch (error) {

        toast.error(
    error.response?.data ||
    "Something went wrong"
);
      }
    };

  const loadProducts = async () => {
    try {

        setLoading(true);

        const data = await getProducts();

        setProducts(data);

    } catch (error) {

        toast.error(
            error.response?.data ||
            "Something went wrong"
        );

        toast.error("Failed to load products");

    } finally {

        setLoading(false);

    }
};
  
const handleDelete = (id) => {

    setConfirmDialog({

        open: true,

        title: "Delete Product",

        message: `Delete ${
            products.find(
                p => p.id === id
            )?.name
        }?`,

        action: async () => {

            try {

                await deleteProduct(id);

                toast.success(
                    "Product deleted successfully"
                );

                loadProducts();

            } catch (error) {

                toast.error(
                    "Delete failed"
                );

            }

            setConfirmDialog({

                open: false,

                title: "",

                message: "",

                action: null

            });

        }

    });

};

  useEffect(() => {

    loadProducts();

    loadCategories();

  }, []);

  useEffect(() => {

    setCurrentPage(1);

}, [search, selectedCategory]);

const filteredProducts =

    products.filter(product => {

        const matchesSearch =

            product.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );

        const matchesCategory =

            selectedCategory === ""

            ||

            product.category?.id ==
            selectedCategory;

        return (
            matchesSearch &&
            matchesCategory
        );
    });

const totalPages = Math.ceil(

    filteredProducts.length /

    productsPerPage

);

const currentProducts =

    filteredProducts.slice(

        (currentPage - 1) * productsPerPage,

        currentPage * productsPerPage

    );
  
  if (loading) {
    return (
        <PageLoader
            title="Loading Products"
            message="Fetching products..."
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

        <div className="products-header">

        <h1
          className="gradient-text"
        >
          Product Management
        </h1>

        <button

  className="glow-button"

  style={{
    marginTop: "20px",
    marginBottom: "20px",
    padding: "10px"
  }}

  onClick={() =>
    navigate(
      "/admin/products/add"
    )
  }
>
  + Add New Product
</button>

        <p
          style={{
            color: "#ccc"
          }}
        >
          Total Products : {products.length}
          </p>
          </div>

        <div
          className="responsive-toolbar"
          style={{
              marginTop: "20px",
              marginBottom: "30px"
          }}
        >

<input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="cool-input"
    style={{
        flex: 1,
      maxWidth: "900px",
        height: "50px",
        marginTop: 0,
        boxSizing: "border-box"
    }}
/>

          <div className="admin-select">
          <Select
    placeholder="All Categories"
    options={[
        {
            value: "",
            label: "All Categories"
        },
        ...categories.map(category => ({
            value: category.id,
            label: category.name
        }))
    ]}
    value={
        [
            {
                value: "",
                label: "All Categories"
            },
            ...categories.map(category => ({
                value: category.id,
                label: category.name
            }))
        ].find(option => option.value == selectedCategory)
    }
    onChange={(selected) =>
        setSelectedCategory(selected.value)
    }
    styles={customSelectStyles}
            />
            </div>

        </div>

        <div className="product-grid">

          {currentProducts.map(product => (

            <div
              key={product.id}
              className="glass-card"

              style={{
                padding: "25px"
              }}
            >

              <img
                src={
                    product.imageUrl.startsWith("http")
                        ? product.imageUrl
                        : `${API_BASE_URL}/images/${product.imageUrl}`
                }

                alt={product.name}

                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "15px"
                }}
              />

              <h2>
                {product.name}
              </h2>

              <p>
                {product.description}
              </p>

              <h3
                className="gradient-text"
              >
                ₹ {product.price}
              </h3>

              <p>
                Stock : {product.stock}
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
    flex: 1
  }}

  onClick={() =>
    navigate(
      `/admin/products/edit/${product.id}`
    )
  }
>
  Edit
</button>

  <button

    className="glow-button"

    style={{
      flex: 1,
      background:
        "linear-gradient(90deg,#ff416c,#ff4b2b)",
      padding: "12px"
    }}

    onClick={() =>
      handleDelete(
        product.id
      )
    }

  >
    Delete
  </button>

</div>

            </div>

          ))}

          <ConfirmDialog
    open={confirmDialog.open}
    title={confirmDialog.title}
    message={confirmDialog.message}
    onConfirm={confirmDialog.action}
    onCancel={() =>
        setConfirmDialog({
            open: false,
            title: "",
            message: "",
            action: null
        })
    }
/>

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

export default AdminProducts;