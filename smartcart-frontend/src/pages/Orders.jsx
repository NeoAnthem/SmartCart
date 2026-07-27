import { useEffect, useState } from "react";
import "../styles/forms.css";
import Navbar from "../components/Navbar";
import { getOrders, cancelOrder, downloadInvoice } from "../services/orderService";
import Select from "react-select";
import customSelectStyles from "../styles/selectStyles";
import Pagination from "../components/Pagination";
import { CheckCircle2, XCircle, AlertTriangle, RefreshCcw, Banknote } from "lucide-react";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";

function Orders() {

  const [orders, setOrders] =
    useState([]);
  
  const [loading, setLoading] = useState(true);

  const [selectedOrder,
    setSelectedOrder] =
    useState(null);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("ALL");
  
  const [sortOption, setSortOption] =
    useState("newest");
  
  const [currentPage,
  setCurrentPage] =
  useState(1);

  const ordersPerPage = 6;

  const handleDownloadInvoice =
  async (orderId) => {

    try {

      const blob =
        await downloadInvoice(
          orderId
        );

      const url =
        window.URL.createObjectURL(
          new Blob([blob])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `invoice_${orderId}.pdf`
      );

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

    } catch (error) {

      toast.error(
    error.response?.data ||
    "Something went wrong"
);

      toast.error(
        "Failed to download invoice"
      );

    }

  };

  const handleCancelOrder =
    async (orderId) => {

      try {

        await cancelOrder(orderId);

        setOrders(
          orders.map(order =>
            order.id === orderId
              ? {
                  ...order,
                  status: "CANCELLED"
                }
              : order
          )
        );

        if (
          selectedOrder &&
          selectedOrder.id === orderId
        ) {

          setSelectedOrder({
            ...selectedOrder,
            status: "CANCELLED"
          });

        }

      } catch (error) {

        toast.error(
    error.response?.data ||
    "Something went wrong"
);

        toast.error(
          error.response?.data?.message ||
          "Failed to cancel order"
        );

      }

    };

  useEffect(() => {

    const loadOrders = async () => {

    try {

        setLoading(true);

        const data = await getOrders();

        setOrders(
            Array.isArray(data)
                ? data
                : []
        );

    } catch (error) {

        toast.error(
            error.response?.data ||
            "Something went wrong"
        );

    } finally {

        setLoading(false);

    }
};

    loadOrders();

  }, []);

  useEffect(() => {

  setCurrentPage(1);

}, [

  searchTerm,

  statusFilter,

  sortOption

  ]);
  
  const filteredOrders = [...orders]

  .filter(order => {

    const matchesSearch =

      order.id
        .toString()
        .includes(searchTerm);

    const matchesStatus =

      statusFilter === "ALL"

      ||

      order.status === statusFilter;

    return (

      matchesSearch &&

      matchesStatus

    );

  })

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
  
  if (loading) {
    return (
        <PageLoader
            title="Loading Orders"
            message="Fetching your orders..."
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
          My Orders
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginTop: "10px"
          }}
        >
          Orders : {orders.length}
        </p>

        <div className="orders-toolbar">

        <input
            type="text"
            placeholder="Search Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cool-input orders-search"
            style={{
                marginTop: 0
            }}
        />

          <div className="orders-sort">
            
    <Select
        styles={customSelectStyles}
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
        ].find(
            option => option.value === statusFilter
        )}
        onChange={(selected) =>
            setStatusFilter(selected.value)
        }
    />
</div>

        </div>

        <div className="orders-grid">

          {
            currentOrders.map(order => (

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

                  <span
                    style={{
                      marginTop: "10px",
                      padding: "5px 15px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      color: "#fff",
                      display: "inline-block",
                      background:
                        order.status === "PENDING"
                          ? "#f59e0b"
                          : order.status === "SHIPPED"
                          ? "#3b82f6"
                          : order.status === "DELIVERED"
                          ? "#22c55e"
                          : "#ef4444"
                    }}
                  >
                    {order.status}
                </span>
                
<div
    style={{
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap"
    }}
>

    <strong>
        Payment:
    </strong>

    <span
        style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color:
                order.paymentStatus === "SUCCESS"
                    ? "#22c55e"
                    : "#ef4444",

            fontWeight: "bold"
        }}
    >

        {
            order.paymentStatus === "SUCCESS" ? (

                <>
                    <CheckCircle2 size={18} />
                    Success
                </>

            ) : (

                <>
                    <XCircle size={18} />
                    Failed
                </>

            )
        }

    </span>

</div>
                
                {
    order.paymentStatus === "FAILED" && (

        <div
    style={{
        marginTop: "15px",
        padding: "16px",
        borderRadius: "12px",
        background: "rgba(239,68,68,.15)",
        color: "#fca5a5"
    }}
>

    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
            fontWeight: "600"
        }}
    >

        <AlertTriangle size={18} />

        Payment could not be completed.

    </div>

    <p
    style={{
        margin: "12px 0 0 0",
        lineHeight: "1.7",
        color: "#f3c1c1"
    }}
>


    The payment method has automatically been changed to

    <strong> Cash on Delivery</strong>.

    <br />

    You can pay in cash or complete the payment online at the time of delivery.

</p>

<div
    style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "14px"
    }}
>

    <span
        style={{
            padding: "8px 14px",
            borderRadius: "999px",
            background: "rgba(6,182,212,.18)",
            color: "#67e8f9",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px"
        }}
    >
        <Banknote size={16} />

        Cash on Delivery enabled

    </span>

    <span
        style={{
            padding: "8px 14px",
            borderRadius: "999px",
            background: "rgba(239,68,68,.18)",
            color: "#fca5a5",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px"
        }}
    >
        <XCircle size={16} />

        Online payment failed

    </span>

</div>

</div>

    )
}

                  {
                    order.status === "CANCELLED"

                    ? (

                      <div
                        style={{
                          marginTop: "20px",
                          color: "#ef4444",
                          fontWeight: "bold"
                        }}
                      >
                        ❌ Order Cancelled
                      </div>

                    )

                    : (
                      
                        <div className="order-progress">

                        {
                          ["PENDING", "SHIPPED", "DELIVERED"]
                            .map((status, index) => (

                              <div
                                key={status}
                                className="order-progress-step"
                              >

                                <div
                                  style={{
                                    padding: "8px 14px",
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    background:

                                      (
                                        order.status === "PENDING"
                                        &&
                                        status === "PENDING"
                                      )

                                      ||

                                      (
                                        order.status === "SHIPPED"
                                        &&
                                        (
                                          status === "PENDING"
                                          ||
                                          status === "SHIPPED"
                                        )
                                      )

                                      ||

                                      (
                                        order.status === "DELIVERED"
                                      )

                                        ? "linear-gradient(90deg,#ec4899,#06b6d4)"
                                        : "#1e293b",

                                    color: "#fff"
                                  }}
                                >
                                  {status}
                                </div>

                                {
                                  index < 2 &&

                                  <div className="order-progress-line" />

                                }

                              </div>

                            ))
                        }

                      </div>

                    )
                  }

                  <p
                    style={{
                      marginTop: "15px"
                    }}
                  >
                    Date:
                    {" "}
                    {
                      new Date(
                        order.orderDate
                      ).toLocaleString()
                    }
                  </p>

                  <p
                    style={{
                      color: "#cbd5e1"
                    }}
                  >
                    Customer:
                    {" "}
                    {order.user?.name}
                  </p>

                  <p
                    style={{
                      color: "#cbd5e1"
                    }}
                  >
                    Email:
                    {" "}
                    {order.user?.email}
                  </p>

                  <button
                    className="glow-button"
                    style={{
                      marginTop: "20px",
                      padding: "10px"
                    }}
                    onClick={() =>
                      setSelectedOrder(order)
                    }
                  >
                    View Details
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

      </div>



      {
        selectedOrder && (

          <div
            onClick={() =>
              setSelectedOrder(null)
            }
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              overflowY: "auto",
              zIndex: 99999
            }}
          >

            <div
              className="glass-card order-modal"
              onClick={(e) =>
                  e.stopPropagation()
              }
            >

              <h1>
                Order #{selectedOrder.id}
              </h1>

              {
                selectedOrder.orderItems?.map(
                  item => (

                    <div
                      key={item.id}
                      style={{
                        padding: "15px 0"
                      }}
                    >

                      <strong>
                        {item.product?.name}
                      </strong>

                      <p>
                        Qty:
                        {" "}
                        {item.quantity}
                      </p>

                    </div>

                  )
                )
              }

              <div className="order-modal-actions">
              {
                  !["DELIVERED", "CANCELLED"].includes(
                      selectedOrder.status
                  ) && (

                      <button
                          className="glow-button"
                          style={{
                              background: "#ef4444"
                          }}
                          onClick={() =>
                              handleCancelOrder(
                                  selectedOrder.id
                              )
                          }
                      >
                          Cancel Order
                      </button>

                  )
              }

              <button
                className="glow-button"
                onClick={() =>
                  handleDownloadInvoice(
                    selectedOrder.id
                  )
                }
              >
                Download Invoice
              </button>

              <button
                className="glow-button"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                Close
                </button>
                
                </div>

            </div>

          </div>

        )
      }

    </>

  );

}

export default Orders;