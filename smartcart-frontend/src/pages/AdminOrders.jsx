import { useEffect, useState } from "react";
import Select from "react-select";
import Navbar from "../components/Navbar";
import axios from "axios";
import customSelectStyles from "../styles/selectStyles";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";

function AdminOrders() {

  const [orders,
    setOrders] =
    useState([]);
  
  const [loading, setLoading] = useState(true);

  const token =
    localStorage.getItem(
      "token"
    );
  
  const [searchTerm, setSearchTerm] = useState("");

  const [sortOption, setSortOption] = useState("newest");
  
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 6;

  const loadOrders = async () => {
    try {

        setLoading(true);

        const response = await axios.get(
            "http://localhost:8080/api/orders/admin",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setOrders(response.data);

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data ||
            "Something went wrong"
        );

    } finally {

        setLoading(false);

    }
};

  useEffect(() => {

    loadOrders();

  }, []);

  useEffect(() => {

  setCurrentPage(1);

}, [searchTerm, sortOption, statusFilter]);

  const updateStatus = async (
  orderId,
  status
) => {

  try {

    await axios.put(
      `http://localhost:8080/api/orders/${orderId}/status`,
      {
        status: status
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    await loadOrders();

  } catch (error) {

    toast.error(
    error.response?.data ||
    "Something went wrong"
);
  }
  };
  
const filteredOrders = [...orders]

  .filter(order =>
    order.id
      .toString()
      .includes(searchTerm)
  )

  .filter(order =>
    statusFilter === "ALL"
      ? true
      : order.status === statusFilter
  )

  .sort((a, b) => {

    switch (sortOption) {

      case "oldest":
        return a.id - b.id;

      case "highest":
        return b.totalAmount - a.totalAmount;

      case "lowest":
        return a.totalAmount - b.totalAmount;

      default:
        return b.id - a.id;

    }

  });

  const totalPages = Math.ceil(

  filteredOrders.length /

  ordersPerPage

);

const currentOrders = filteredOrders.slice(

  (currentPage - 1) * ordersPerPage,

  currentPage * ordersPerPage

);

  
  const statusOptions = [

  {
    value: "PENDING",
    label: "🟡 Pending"
  },

  {
    value: "SHIPPED",
    label: "🔵 Shipped"
  },

  {
    value: "DELIVERED",
    label: "🟢 Delivered"
  },

  {
    value: "CANCELLED",
    label: "🔴 Cancelled"
  }

  ];
  
  if (loading) {
    return (
        <PageLoader
            title="Loading Orders"
            message="Fetching customer orders..."
        />
    );
}

  return (

    <>
      <Navbar />

      <div className="orders-page">

        <h1
          className="gradient-text"
        >
          Admin Orders
        </h1>

<div className="orders-toolbar">

  <input
    type="text"
    placeholder="Search Order ID..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="cool-input orders-search"
    style={{
        marginTop: 0
    }}
  />

  <div className="orders-sort">

    <Select
              styles={customSelectStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
      options={[
        {
          value: "newest",
          label: "Newest First"
        },
        {
          value: "oldest",
          label: "Oldest First"
        },
        {
          value: "highest",
          label: "Highest Amount"
        },
        {
          value: "lowest",
          label: "Lowest Amount"
        }
      ]}
      value={[
        {
          value: "newest",
          label: "Newest First"
        },
        {
          value: "oldest",
          label: "Oldest First"
        },
        {
          value: "highest",
          label: "Highest Amount"
        },
        {
          value: "lowest",
          label: "Lowest Amount"
        }
      ].find(
        option => option.value === sortOption
      )}
      onChange={(selected) =>
        setSortOption(selected.value)
      }
            />
            

          </div>
          
          <div className="orders-filter">

  <Select
    styles={customSelectStyles}
    menuPortalTarget={document.body}
    menuPosition="fixed"
    options={[
      {
        value: "ALL",
        label: "All Status"
      },
      {
        value: "PENDING",
        label: "Pending"
      },
      {
        value: "SHIPPED",
        label: "Shipped"
      },
      {
        value: "DELIVERED",
        label: "Delivered"
      },
      {
        value: "CANCELLED",
        label: "Cancelled"
      }
    ]}

    value={[
      {
        value: "ALL",
        label: "All Status"
      },
      {
        value: "PENDING",
        label: "Pending"
      },
      {
        value: "SHIPPED",
        label: "Shipped"
      },
      {
        value: "DELIVERED",
        label: "Delivered"
      },
      {
        value: "CANCELLED",
        label: "Cancelled"
      }
    ].find(option => option.value === statusFilter)}

    onChange={(selected) =>
      setStatusFilter(selected.value)
    }

  />

</div>

</div>

        <div className="orders-grid">

          {
            currentOrders.map(
              (order) => (

                <div
                  key={order.id}
                  className="glass-card"
                  style={{
                    padding: "25px"
                  }}
                    >

                  <h2>
                    Order #{order.id}
                  </h2>

                  <h3
                    className="gradient-text"
                  >
                    ₹{order.totalAmount}
                  </h3>

                  <p>
                    Customer:
                    {" "}
                    {order.user.name}
                  </p>

<div
  style={{
    marginTop: "12px"
  }}
>

<span>Status : </span>

<div
  className={`status ${order.status.toLowerCase()}`}
  style={{
    marginTop: "8px",
    display: "inline-block"
  }}
>

{order.status}

</div>

</div>

                  <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(140px,1fr))",
    gap: "12px",
    marginTop: "20px"
  }}
>
<div className="admin-order-status-select">

  <Select

    styles={customSelectStyles}
    menuPortalTarget={document.body}
    menuPosition="fixed"
    options={statusOptions}

    value={
      statusOptions.find(
        option =>
          option.value === order.status
      )
    }

    onChange={(selected) =>
      updateStatus(
        order.id,
        selected.value
      )
    }

  />

</div>

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

export default AdminOrders;