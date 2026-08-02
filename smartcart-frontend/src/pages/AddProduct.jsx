import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";        
import { getCategories } from "../services/categoryService";
import { uploadImage } from "../services/productService";
import { createProduct } from "../services/productService";  
import "../styles/forms.css";
import { toast } from "react-toastify";
import Select from "react-select";
import customSelectStyles from "../styles/selectStyles";
import { HiOutlinePhotograph } from "react-icons/hi";


function AddProduct() {
        
    const [categories,
        setCategories] =
            useState([]);
    
    const [preview,
        setPreview] =
        useState(null);
    
    const [isAdding,
        setIsAdding] =
        useState(false);

    const navigate =
        useNavigate();
    
    const [fileInputKey,
        setFileInputKey] =
        useState(0);

    const [product, setProduct] =
        useState({

        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: ""
        });
    
    
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

            toast.error(
            "Failed to load categories"
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
        URL.createObjectURL(
            file
        )
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
    
    useEffect(() => {

        loadCategories();

    }, []);

    const handleChange =
        (e) => {

        setProduct({

            ...product,

            [e.target.name]:
            e.target.value
        });
        };

const handleSubmit =
    async (e) => {

    e.preventDefault();

    if (isAdding) return;

    setIsAdding(true);

    try {

        await createProduct(product);

        toast.success(
            "Product Added Successfully 🎉"
        );

        // Reset form
        setProduct({

            name: "",
            description: "",
            price: "",
            stock: "",
            imageUrl: "",
            categoryId: ""

        });

        // Clear preview
        setPreview(null);

        // Reset file input
        setFileInputKey(
            prev => prev + 1
        );

        // Ready for next product
        setIsAdding(false);

    } catch (error) {

        toast.error(
    error.response?.data ||
    "Something went wrong"
);

        toast.error(

            error.response?.data ||

            "Failed to add product"

        );

        setIsAdding(false);

    }

};



    return (

        <>
        <Navbar />

        <div
            style={{
            maxWidth: "800px",

            margin: "40px auto",

            padding: "40px"
            }}
        >

            <h1
            className="gradient-text"

            style={{
                marginBottom: "30px"
            }}
            >
            Add New Product
            </h1>

            <div
            className="glass-card"

            style={{
                padding: "40px"
            }}
            >

            <form

                onSubmit={handleSubmit}

                style={{
                display: "flex",

                flexDirection: "column",

                gap: "26px"
                }}
            >

                <div className="form-group">

                <label>
                    Product Name
                </label>

                <input
                    type="text"

                    name="name"

                    value={product.name}

                    onChange={handleChange}

                    className="cool-input"
                />

                </div>

                <div className="form-group">

                <label>
                    Description
                </label>

                            <textarea
                                className="cool-input"

                            rows="4"

                            name="description"

                            value={product.description}

                            onChange={handleChange}

                        />

                </div>

                <div className="form-group">

                <label>
                    Price (₹)
                </label>

                <input

                    type="number"

                    name="price"

                    value={product.price}

                    onChange={handleChange}

                    className="cool-input"
                />

                </div>

                <div className="form-group">

                <label>
                    Stock
                </label>

                <input

                    type="number"

                    name="stock"

                    value={product.stock}

                    onChange={handleChange}

                    className="cool-input"
                />

                </div>



                    <div className="form-group">

                        <label>
    Product Image
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

{
    preview && (

        <img
            src={preview}
            alt="Preview"
            style={{
                width:"100%",
                maxHeight:"300px",
                objectFit:"cover",
                borderRadius:"20px",
                marginTop:"20px"
            }}
        />

    )
}

                    </div>


                <div className="form-group">

                <label>
                    Category
                </label>

                            <Select
                                isSearchable={false}
    tabSelectsValue={false}
    placeholder="Select Category"
    options={categories.map(category => ({
        value: category.id,
        label: category.name
    }))}
    value={
        categories
            .map(category => ({
                value: category.id,
                label: category.name
            }))
            .find(option => option.value == product.categoryId)
    }
    onChange={(selected) =>
        setProduct({
            ...product,
            categoryId: selected.value
        })
    }
    styles={customSelectStyles}
/>

                </div>

                <div
                style={{
                    display: "flex",

                    gap: "15px"
                }}
                >

                <button

    type="submit"

    className="glow-button"

    disabled={isAdding}

    style={{

        flex: 1,

        padding: "8px",

        opacity:
            isAdding ? 0.7 : 1,

        cursor:
            isAdding
                ? "not-allowed"
                : "pointer"

    }}

>

    {

        isAdding

            ? "Adding Product..."

            : "Add Product"

    }

</button>

                <button

                    type="button"

                    className="glow-button"

                    style={{
                    flex: 1,

                    background:
                            "linear-gradient(90deg,#ff416c,#ff4b2b)",
                    padding: "8px"
                    }}

                    onClick={() =>
                    navigate(
                        "/admin/products"
                    )
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

    export default AddProduct;