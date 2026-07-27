import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCategories, createCategory, deleteCategory } from "../services/categoryService";
import "../styles/forms.css";
import { toast } from "react-toastify";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Pagination from "../components/Pagination";
import "../styles/AdminCategories.css";
import PageLoader from "../components/PageLoader";

    function AdminCategories() {

        const [categories,
            setCategories] =
            useState([]);
        
        const [loading, setLoading] = useState(true);

        const [name,
            setName] =
                useState("");
        
        const [confirmDialog, setConfirmDialog] = useState({
            open: false,
            title: "",
            message: "",
            action: null
        });

        const [currentPage, setCurrentPage] = useState(1);

        const categoriesPerPage = 8;

    useEffect(() => {

        loadCategories();

    }, []);
        
                const totalPages = Math.ceil(

            categories.length /

            categoriesPerPage

        );

        const currentCategories = categories.slice(

            (currentPage - 1) * categoriesPerPage,

            currentPage * categoriesPerPage

        );
        
        useEffect(() => {

    if (

        currentPage > totalPages &&

        totalPages > 0

    ) {

        setCurrentPage(totalPages);

    }

}, [

    categories.length,

    currentPage,

    totalPages

]);

    const loadCategories = async () => {
        try {

            setLoading(true);

            const data = await getCategories();

            setCategories(data);

        } catch {

            toast.error("Failed to load categories");

        } finally {

            setLoading(false);

        }
    };

    const handleAdd =
    async (e) => {

        e.preventDefault();

        try {

        await createCategory({
            name
        });

        toast.success(
            "Category Added"
        );

        setName("");

        loadCategories();

        } catch {

        toast.error(
            "Failed to add category"
        );
        }
    };

const handleDelete = (category) => {

    setConfirmDialog({

        open: true,

        title: "Delete Category",

        message: `Delete "${category.name}"?`,

        action: async () => {

            try {

                await deleteCategory(category.id);

                toast.success("Category Deleted");

                loadCategories();

            } catch {

                toast.error("Delete failed");

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
        
        if (loading) {
    return (
        <PageLoader
            title="Loading Categories"
            message="Fetching categories..."
        />
    );
}

    return (

        <>
        <Navbar />

        <div className="admin-categories-page">

            <h1
            className="gradient-text"
            >
            Category Management
            </h1>

            <form
                onSubmit={handleAdd}
                className="category-form"
            >
    <input
        className="cool-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Category Name"
        style={{
            marginTop: 0
        }}
    />

    <button
        className="glow-button"
    >
        Add Category
    </button>
</form>

            <div className="category-grid">

            {currentCategories.map(category => (

                <div
                key={category.id}
                className="glass-card category-card"
                >

                <h2>
                    {category.name}
                </h2>

                <button
                    className="glow-button"

                    style={{
                    width: "100%",
                    marginTop: "20px",

                    background:
                            "linear-gradient(90deg,#ff416c,#ff4b2b)",
                        padding: "10px"
                    }}

                    onClick={() =>
                        handleDelete(category)
                    }
                >
                    Delete
                </button>

                </div>

            ))}

            </div>
            
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages || 1}
                    setCurrentPage={setCurrentPage}
                />

            </div>
            
            {
confirmDialog.open && (

<div
    style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,10,20,.78)",
        backdropFilter: "blur(12px)",

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",

        overflowY: "auto",

        padding: "20px",

        zIndex: 9999
    }}

    onClick={() =>
        setConfirmDialog({
            open: false,
            title: "",
            message: "",
            action: null
        })
    }
>

<div
    className="glass-card"

    onClick={(e) => e.stopPropagation()}

    style={{
        width: "100%",
        maxWidth: "460px",

        padding: "30px",

        margin: "auto",

        borderRadius: "22px",

        textAlign: "center",

        background: "rgba(18,18,28,.92)",

        border: "1px solid rgba(255,255,255,.08)",

        boxShadow: "0 30px 80px rgba(0,0,0,.45)"
    }}
>

<div
    style={{
        width: "clamp(60px, 12vw, 78px)",
        height: "clamp(60px, 12vw, 78px)",

        margin: "0 auto 20px",

        borderRadius: "50%",

        background: "linear-gradient(135deg,#ef4444,#dc2626)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        boxShadow: "0 0 35px rgba(239,68,68,.45)"
    }}
>
    <HiOutlineExclamationTriangle
        size={36}
        color="white"
    />
</div>

<h2
    style={{
        marginBottom: "10px",
        fontSize: "clamp(24px, 5vw, 30px)"
    }}
>
    {confirmDialog.title}
</h2>

<p
    style={{
        color: "#94a3b8",
        lineHeight: "1.7",
        fontSize: "clamp(15px, 3vw, 17px)",
        marginBottom: "35px"
    }}
>
    {confirmDialog.message}
</p>

<div
    style={{
        display: "flex",

        gap: "12px",

        flexWrap: "wrap"
    }}
>

<button
    className="glow-button"
    style={{
        flex: 1,
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.12)",
        padding: "12px 18px"
    }}
    onClick={() =>
        setConfirmDialog({
            open: false,
            title: "",
            message: "",
            action: null
        })
    }
>
    Cancel
</button>

<button
    className="glow-button"
    style={{
        flex: 1,
        background:
            "linear-gradient(90deg,#ef4444,#dc2626)",
        padding: "12px 18px"
    }}
    onClick={confirmDialog.action}
>
    Delete Category
</button>

</div>

</div>

</div>

)}

        </>
    );
    }

    export default AdminCategories;