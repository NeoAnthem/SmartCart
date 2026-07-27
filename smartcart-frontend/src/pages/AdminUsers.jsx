import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { getAllUsers, deleteUser, updateUserRole } from "../services/adminUserService";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import Select from "react-select";
import customSelectStyles from "../styles/selectStyles";
import { HiOutlineEnvelope, HiOutlineIdentification } from "react-icons/hi2";
import Pagination from "../components/Pagination";
import "../styles/AdminUsers.css";
import PageLoader from "../components/PageLoader";


function AdminUsers() {

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] = useState(true);
    
    const [search, setSearch] =
      useState("");
  
    const [roleFilter, setRoleFilter] =
      useState("ALL");

    const [sortBy, setSortBy] =
    useState("NAME_ASC");
    
  
    const [selectedUser, setSelectedUser] = useState(null);

    const [confirmDialog, setConfirmDialog] = useState({
      open: false,
      title: "",
      message: "",
      action: null
    });
  
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 6;

    

    const loadUsers = async () => {
    try {

        setLoading(true);

        const data = await getAllUsers();

        setUsers(data);

    } catch (error) {

        toast.error(
            error.response?.data ||
            "Something went wrong"
        );

        toast.error("Failed to load users");

    } finally {

        setLoading(false);

    }
};

  useEffect(() => {

    loadUsers();

  }, []);

  const handleDelete =
      async (id) => {
        
          setConfirmDialog({
    open: true,
    title: "Delete User",
    message: `Delete ${users.find(u => u.id === id)?.name}?`,
    action: async () => {

        try {

            await deleteUser(id);

            toast.success("User deleted successfully");

            loadUsers();

        } catch (error) {

            toast.error(
                error.response?.data ||
                "Delete failed"
            );

        }

        setConfirmDialog(prev => ({
            ...prev,
            open: false
        }));
    }
});
    };
  
  const handleRoleChange = async (user) => {

    const newRole =
        user.role === "ROLE_ADMIN"
            ? "ROLE_CUSTOMER"
            : "ROLE_ADMIN";

setConfirmDialog({

    open: true,

    title: "Change User Role",

    message:
        `Change ${user.name} to ${
            newRole === "ROLE_ADMIN"
                ? "Administrator"
                : "Customer"
        }?`,

    action: async () => {

        try {

            await updateUserRole(
                user.id,
                newRole
            );

            toast.success(
                "Role updated successfully"
            );

            loadUsers();

        } catch (error) {

            toast.error(
                error.response?.data ||
                "Update failed"
            );

        }

        setConfirmDialog(prev => ({
            ...prev,
            open: false
        }));

    }

});

};
    
const filteredUsers =
    users
        .filter(user => {

            const matchesSearch =

                (user.name || "")
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                (user.email || "")
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesRole =

                roleFilter === "ALL"

                ||

                user.role === roleFilter;

            return matchesSearch && matchesRole;

        })

        .sort((a, b) => {

            switch (sortBy) {

                case "NAME_ASC":
                    return a.name.localeCompare(b.name);

                case "NAME_DESC":
                    return b.name.localeCompare(a.name);

                case "ID_ASC":
                    return a.id - b.id;

                case "ID_DESC":
                    return b.id - a.id;

                default:
                    return 0;
            }

        });


const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
);

const currentUsers = filteredUsers.slice(

    (currentPage - 1) * usersPerPage,

    currentPage * usersPerPage

);
  
  const totalUsers = users.length;

const totalAdmins =
    users.filter(
        user => user.role === "ROLE_ADMIN"
    ).length;

const totalCustomers =
    users.filter(
        user => user.role === "ROLE_CUSTOMER"
    ).length;

const searchResults =
    filteredUsers.length;
  
  const getInitials = (name) => {

    if (!name) return "?";

    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

};

const getRoleLabel = (role) =>

    role === "ROLE_ADMIN"
        ? "Administrator"
      : "Customer";
  
  useEffect(() => {

    setCurrentPage(1);

  }, [search, roleFilter, sortBy]);
    
    const roleOptions = [
    {
        value: "ALL",
        label: "All Roles"
    },
    {
        value: "ROLE_CUSTOMER",
        label: "Customers"
    },
    {
        value: "ROLE_ADMIN",
        label: "Admins"
    }
];

const sortOptions = [
    {
        value: "NAME_ASC",
        label: "Name ( A - Z )"
    },
    {
        value: "NAME_DESC",
        label: "Name ( Z - A )"
    },
    {
        value: "ID_ASC",
        label: "ID ( Lowest )"
    },
    {
        value: "ID_DESC",
        label: "ID ( Highest )"
    }
    ];
    
    if (loading) {
    return (
        <PageLoader
            title="Loading Users"
            message="Fetching users..."
        />
    );
}

    return (

    <>
    
        <Navbar />

            <div className="admin-users-page">

        <h1
            className="gradient-text"
        >
            User Management
        </h1>

<div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginTop: "30px",
        marginBottom: "35px"
    }}
>

    <div
    className="glass-card stat-card"
    onClick={() => setRoleFilter("ALL")}
    style={{
    cursor: "pointer",
    border:
        roleFilter === "ALL"
            ? "2px solid #8b5cf6"
            : ""
}}
>

        <h4>Total Users</h4>

        <h2>{totalUsers}</h2>

    </div>

    <div
    className="glass-card stat-card"
    onClick={() => setRoleFilter("ROLE_CUSTOMER")}
    style={{
    cursor: "pointer",
    border:
        roleFilter === "ROLE_CUSTOMER"
            ? "2px solid #8b5cf6"
            : ""
}}
>

        <h4>Customers</h4>

        <h2>{totalCustomers}</h2>

    </div>

    <div
    className="glass-card stat-card"
    onClick={() => setRoleFilter("ROLE_ADMIN")}
    style={{
    cursor: "pointer",
    border:
        roleFilter === "ROLE_ADMIN"
            ? "2px solid #8b5cf6"
            : ""
}}
>

        <h4>Admins</h4>

        <h2>{totalAdmins}</h2>

    </div>

    <div className="glass-card stat-card">

        <h4>Search Results</h4>

        <h2>{searchResults}</h2>

    </div>

</div>
              
<div className="users-toolbar">

    <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
            setSearch(e.target.value)
        }
        className="cool-input users-search"
    />

<Select
    options={roleOptions}
    value={
        roleOptions.find(
            option => option.value === roleFilter
        )
    }
    onChange={(selected) =>
        setRoleFilter(selected.value)
    }
    styles={customSelectStyles}
    className="admin-select"
    menuPortalTarget={document.body}
    menuPosition="fixed"
/>

<Select
    options={sortOptions}
    value={
        sortOptions.find(
            option => option.value === sortBy
        )
    }
    onChange={(selected) =>
        setSortBy(selected.value)
    }
    styles={customSelectStyles}
    className="admin-select"
    menuPortalTarget={document.body}
    menuPosition="fixed"
/>

</div>

        <div className="users-grid">

        {
            currentUsers.map(user => (

<div
    key={user.id}
    className="glass-card"
    style={{
        padding: "28px",
        borderRadius: "22px",
        transition: ".3s",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }}
>

                <div
    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }}
>

    <div
        style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "28px",
            fontWeight: "700",
            color: "white",
            background:
                "linear-gradient(135deg,#8b5cf6,#ec4899)",
            boxShadow:
                "0 0 25px rgba(139,92,246,.35)"
        }}
    >
        {getInitials(user.name)}
    </div>

    <h2
        style={{
            marginTop: "18px",
            marginBottom: "6px"
        }}
    >
        {user.name}
    </h2>

    <span
        style={{
            padding: "6px 16px",
            borderRadius: "50px",
            fontSize: "13px",
            fontWeight: "600",
            color: "white",
            background:
                user.role === "ROLE_ADMIN"
                    ? "linear-gradient(90deg,#8b5cf6,#6366f1)"
                    : "linear-gradient(90deg,#06b6d4,#3b82f6)"
        }}
    >
        {getRoleLabel(user.role)}
    </span>

</div>

<hr
    style={{
        border: "none",
        borderTop: "1px solid rgba(255,255,255,.08)",
        margin: "22px 0"
    }}
/>

<div
    style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px"
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
            size={18}
            color="#60a5fa"
        />

        <span>Email : {user.email}</span>
    </div>

    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#d1d5db"
        }}
    >
        <HiOutlineIdentification
            size={18}
            color="#a855f7"
        />

        <span>User ID : #{user.id}</span>
    </div>

</div>

<div
    style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "25px"
    }}
                >
                  
                  <button
    className="glow-button"
    style={{
        width: "100%",
        padding: "10px"
    }}
    onClick={() => setSelectedUser(user)}
>
    View Details
                  </button>
                  
                  <div
    style={{
        display: "flex",
        gap: "10px"
    }}
>

    <button
        className="glow-button"
        style={{
            flex: 1,
            padding: "10px"
        }}
        onClick={() =>
            handleRoleChange(user)
        }
    >
        {user.role === "ROLE_ADMIN"
            ? "Make Customer"
            : "Make Admin"}
    </button>

    {user.role !== "ROLE_ADMIN" && (

        <button
            className="glow-button"
            style={{
                flex: 1,
                padding: "10px",
                background:
                    "linear-gradient(90deg,#ef4444,#dc2626)"
            }}
            onClick={() =>
                handleDelete(user.id)
            }
        >
            Delete
        </button>

    )}

                  </div>
                </div>
                
                

              </div>

            ))
                    }
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
    zIndex: 10000
}}

onClick={()=>

setConfirmDialog({

    open:false,

    title:"",

    message:"",

    action:null

})

}
>

<div
  className="glass-card"
  onClick={(e)=>e.stopPropagation()}
  style={{
    width: "100%",
    maxWidth: "460px",
    padding: "30px",
    margin: "auto",
    borderRadius: "22px",
    textAlign: "center",
    background:
        "rgba(18,18,28,.92)",

  border:
  "1px solid rgba(255,255,255,.08)",

  boxShadow:
  "0 30px 80px rgba(0,0,0,.45)"
  }}
>

<div
    style={{
        width: "78px",
        height: "78px",
        margin: "0 auto 22px",
        borderRadius: "50%",
        background: "linear-gradient(135deg,#ef4444,#dc2626)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 0 35px rgba(239,68,68,.45)"
    }}
>
    <HiOutlineExclamationTriangle
        size={42}
        color="white"
    />
</div>

<h2
    style={{
        marginBottom: "10px",
        fontSize: "30px"
    }}
>
    {confirmDialog.title}
</h2>

<p
    style={{
        color: "#94a3b8",
        lineHeight: "1.7",
        fontSize: "17px",
        marginBottom: "35px"
    }}
>
    {confirmDialog.message}
</p>

<div
style={{
display:"flex",
gap:"12px"
}}
>

<button
className="glow-button"
style={{
flex:1,
background:"rgba(255,255,255,.06)",
border:"1px solid rgba(255,255,255,.12)",
padding: "10px"
}}
onClick={()=>
setConfirmDialog(prev=>({
...prev,
open:false
}))
}
>
Cancel
</button>

<button
className="glow-button"
style={{
flex:1,
background:
    "linear-gradient(90deg,#ef4444,#dc2626)",
padding: "10px"
}}
onClick={confirmDialog.action}
>
Confirm
</button>

</div>

</div>

</div>

)}

        {selectedUser && (

            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,.6)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    overflowY: "auto",
                    padding: "20px",
                    zIndex: 9999
                }}
            >

        <div
                className="glass-card"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    padding: "35px",
                    margin: "auto",
                    borderRadius: "24px"
                }}
        >

            <div
                style={{
                    textAlign: "center"
                }}
            >

                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto",
                        borderRadius: "50%",
                        background:
                            "linear-gradient(135deg,#8b5cf6,#ec4899)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "30px",
                        fontWeight: "700",
                        color: "white"
                    }}
                >
                    {getInitials(selectedUser.name)}
                </div>

                <h2
                    style={{
                        marginTop: "18px"
                    }}
                >
                    {selectedUser.name}
                </h2>

                <p
                    style={{
                        color: "#94a3b8"
                    }}
                >
                    {getRoleLabel(selectedUser.role)}
                </p>

            </div>

            <hr
                style={{
                    margin: "25px 0",
                    borderColor: "rgba(255,255,255,.08)"
                }}
            />

            <div
                style={{
                    display: "grid",
                    gap: "15px",
                    color: "#d1d5db"
                }}
            >

                <div>
                    <strong>Email</strong><br />
                    {selectedUser.email}
                </div>

                <div>
                    <strong>User ID</strong><br />
                    #{selectedUser.id}
                </div>

                <div>
                    <strong>Role</strong><br />
                    {getRoleLabel(selectedUser.role)}
                </div>

            </div>

            <button
                className="glow-button"
                style={{
                    width: "100%",
                  marginTop: "30px",
                    padding: "10px"
                }}
                onClick={() =>
                    setSelectedUser(null)
                }
            >
                Close
            </button>

        </div>

    </div>

)}



<Pagination
    currentPage={currentPage}
    totalPages={totalPages || 1}
    setCurrentPage={setCurrentPage}
/>

      </div>

    </>

  );

}

export default AdminUsers;