import { useEffect, useState } from "react";
import "../styles/forms.css";
import {useParams, useNavigate} from "react-router-dom";
import {getProductById, updateProduct, uploadImage} from "../services/productService";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { HiOutlinePhotograph } from "react-icons/hi";
import API_BASE_URL from "../services/api";

function EditProduct() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [product, setProduct] = useState({

      name: "",
      description: "",
      price: "",
      stock: "",
      imageUrl: "",
      categoryId: ""

  });
    
    const [preview,
        setPreview] =
            useState(null);

  useEffect(() => {

    loadProduct();

  }, []);

  const loadProduct =
    async () => {

      try {

        const data =
          await getProductById(id);

        setProduct({

            ...data,

            categoryId: data.category?.id || ""

        });

        setPreview(
            data.imageUrl.startsWith("http")
                ? data.imageUrl
                : `${API_BASE_URL}/images/${data.imageUrl}`
        );

      } catch (error) {

        toast.error(
          "Failed to load product"
        );
      }
    };

const handleImageUpload =
async (e) => {

  const file =
    e.target.files[0];

  if (!file) return;

  try {

    setPreview(
      URL.createObjectURL(file)
    );

    const imageUrl =
        await uploadImage(file);

    setProduct(prev => ({
            ...prev,
            imageUrl
    }));

    toast.success(
      "Image Uploaded"
    );

  } catch (error) {

    toast.error(
    error.response?.data ||
    "Something went wrong"
);

    toast.error(
      "Image Upload Failed"
    );
  }
};

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updateProduct(
          id,
          product
        );

        toast.success(
          "Product Updated"
        );

        navigate(
          "/admin/products"
        );

      } catch (error) {

        toast.error(
          "Update Failed"
        );
      }
      console.log(product.imageUrl);
    };
  
  const handleChange = (e) => {

  const { name, value } = e.target;

  setProduct({

    ...product,

    [name]: value

  });

};
    

  return (

    <>
  <Navbar />

  <div
    style={{
      padding: "40px",
      maxWidth: "700px",
      margin: "0 auto"
    }}
  >

    <h1
      className="gradient-text"
      style={{
        marginBottom: "30px"
      }}
    >
      Edit Product
    </h1>

    <div
      className="glass-card"
      style={{
        padding: "35px"
      }}
    >

{
  preview && (

    <img
      src={preview}

      alt={product.name}

      style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "20px",
          marginBottom: "30px"
      }}
    />

  )
                  }
                  
<div className="form-group">

    <label>
        Change Product Image
    </label>

    <label className="upload-box">

        <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
        />

        <HiOutlinePhotograph size={22} />
        <span>Upload Product Image</span>

    </label>

    {
        product.imageUrl && (

            <p
                className="image-url"
                title={product.imageUrl}
            >
                ✓ {product.imageUrl}
            </p>

        )
    }

</div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >

        <div>
          <label>Name</label>

          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            className="cool-input"
          />
        </div>

        <div>
          <label>Description</label>

                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            rows="4"
                            className="cool-input"
                        />
        </div>

        <div>
          <label>Price (₹)</label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="cool-input"
          />
        </div>

        <div>
          <label>Stock</label>

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="cool-input"
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px"
          }}
        >

          <button
            className="glow-button"
                              style={{
                                  flex: 1,
                padding: "10px"
            }}
          >
            Update Product
          </button>

          <button
            type="button"

            className="glow-button"

            style={{
              flex: 1,
              background:
                    "linear-gradient(90deg,#ff416c,#ff4b2b)",
              padding: "10px"
            }}

            onClick={() =>
              navigate("/admin/products")
            }
          >
            Cancel
          </button>

        </div>

      </form>

    </div>

  </div>

</>

  );
}

export default EditProduct;