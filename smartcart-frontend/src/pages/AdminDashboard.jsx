import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Users, Package, ShoppingCart, IndianRupee, TriangleAlert } from "lucide-react";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";

function AdminDashboard() {

    const [dashboard, setDashboard] =
        useState(null);
    
    const [lowStockProducts, setLowStockProducts] = useState([]);

    const navigate = useNavigate(); 

    const token =
        localStorage.getItem("token");
    
    const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
);

useEffect(() => {

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener(
        "resize",
        handleResize
    );

    return () =>
        window.removeEventListener(
            "resize",
            handleResize
        );

}, []);
    
    const formatCompactCurrency = (value) => {

    if (value >= 10000000) {
        return `${(value / 10000000).toFixed(2)} Cr`;
    }

    if (value >= 100000) {
        return `${(value / 100000).toFixed(2)} L`;
    }

    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)} K`;
    }

    return value;
};

    const loadDashboard = async () => {

    try {

    const response =
        await axios.get(
        "http://localhost:8080/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    setDashboard(response.data);

  } catch (error) {

    toast.error(
    error.response?.data ||
    "Something went wrong"
);

  }

    };
    
        

    const loadLowStockProducts = async () => {
    try {

        const response = await axios.get(
            "http://localhost:8080/api/products/low-stock",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setLowStockProducts(response.data);

    } catch (error) {
        toast.error(
    error.response?.data ||
    "Something went wrong"
);
    }
    };


useEffect(() => {

    loadDashboard();

    loadLowStockProducts();

}, []);

if (!dashboard) {
    return (
        <PageLoader
            title="Loading Dashboard"
            message="Loading dashboard analytics..."
        />
    );
}

    const orderStatusData = [

    {
        name: "Pending",
        value: dashboard.pendingOrders
    },

    {
        name: "Shipped",
        value: dashboard.shippedOrders
    },

    {
        name: "Delivered",
        value: dashboard.deliveredOrders
    },

    {
        name: "Cancelled",
        value: dashboard.cancelledOrders
    }

  ];
  
  const COLORS = [

    "#f59e0b",

    "#3b82f6",

    "#22c55e",

    "#ef4444"

    ];
    

    

  return (

    <>
      <Navbar />

      <div className="dashboard-page">

    <h1 className="gradient-text">
        Admin Dashboard
    </h1>

    {/* KPI Cards */}

    <div className="stats-grid">

        {/* USERS */}

        <div className="dashboard-card">

            <div className="dashboard-icon users">
                <Users size={30}/>
            </div>

            <div>

                <p className="dashboard-title">
                    Total Users
                </p>

                <h1>{dashboard.totalUsers}</h1>

            </div>

        </div>

        {/* PRODUCTS */}

        <div className="dashboard-card">

            <div className="dashboard-icon products">
                <Package size={30}/>
            </div>

            <div>

                <p className="dashboard-title">
                    Products
                </p>

                <h1>{dashboard.totalProducts}</h1>

            </div>

        </div>

        {/* ORDERS */}

        <div className="dashboard-card">

            <div className="dashboard-icon orders">
                <ShoppingCart size={30}/>
            </div>

            <div>

                <p className="dashboard-title">
                    Orders
                </p>

                <h1>{dashboard.totalOrders}</h1>

            </div>

        </div>

        {/* REVENUE */}

        <div className="dashboard-card">

            <div className="dashboard-icon revenue">
                <IndianRupee size={30}/>
            </div>

            <div>

                <p className="dashboard-title">
                    Revenue
                </p>

                <div className="money-value">

                    <h1>
                        ₹ {formatCompactCurrency(
                            dashboard.totalRevenue
                        )}
                    </h1>
                </div>

            </div>

        </div>

                </div>

    {/* low stock alerts */}

    
{
    lowStockProducts.length > 0 && (

        <div
            className="glass-card"
            style={{
                marginTop: "30px",
                padding: "24px",
                border: "1px solid rgba(245, 158, 11, .25)",
                background:
                    "linear-gradient(135deg, rgba(245,158,11,.08), rgba(245,158,11,.03))"
            }}
        >

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "18px"
                }}
            >

                <div
                    style={{
                        width: "58px",
                        height: "58px",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                            "linear-gradient(135deg, #f59e0b, #f97316)",
                        boxShadow:
                            "0 10px 25px rgba(245,158,11,.25)"
                    }}
                >

                    <TriangleAlert
                        size={30}
                        color="white"
                    />

                </div>

                <div>

                    <h2
                        style={{
                            margin: 0,
                            color: "#fbbf24"
                        }}
                    >
                        Low Stock Alert
                    </h2>

                    <p
                        style={{
                            marginTop: "6px",
                            color: "#94a3b8"
                        }}
                    >
                        {lowStockProducts.length} product
                        {lowStockProducts.length > 1 ? "s" : ""}
                        {" "}need restocking.
                    </p>

                </div>

            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}
            >

                {lowStockProducts.map(product => (

                    <div
                        key={product.id}
                        className="low-stock-item"
                        onClick={() => navigate("/admin/products")}
                        style={{
                            padding: "14px 18px",
                            borderRadius: "14px",
                            background: "rgba(255,255,255,.04)",
                            cursor: "pointer",
                            transition: "all .25s ease",
                            border: "1px solid rgba(255,255,255,.05)"
                        }}
                    >

                        <span
                            style={{
                                fontWeight: "600"
                            }}
                        >
                            {product.name}
                        </span>

                        <span
                            style={{
                                background:
                                    "rgba(245,158,11,.15)",
                                color: "#fbbf24",
                                padding: "8px 14px",
                                borderRadius: "999px",
                                fontWeight: "700",
                                border:
                                    "1px solid rgba(245,158,11,.25)"
                            }}
                        >
                            {product.stock} left
                        </span>

                    </div>

                ))}

            </div>

        </div>
    )
}


    {/* Chart Section */}

    <div className="dashboard-grid">

        {/* LEFT */}

        <div className="glass-card chart-card">

            <h2>
                Order Status
            </h2>

            <ResponsiveContainer
                width="100%"
                height={360}
            >

                <PieChart>

                    <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={isMobile ? 60 : 85}
                        outerRadius={isMobile ? 95 : 125}
                        paddingAngle={4}
                        cornerRadius={8}
                        dataKey="value"

                        labelLine={false}

                        label={({cx,cy})=>(

                            <text
                                x={cx}
                                y={cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >

                                <tspan
                                    x={cx}
                                    dy="-5"
                                    fill="#ffffff"
                                    fontSize="32"
                                    fontWeight="700"
                                >
                                    {dashboard.totalOrders}
                                </tspan>

                                <tspan
                                    x={cx}
                                    dy="26"
                                    fill="#94a3b8"
                                    fontSize="14"
                                >
                                    Orders
                                </tspan>

                            </text>

                        )}

                    >

                        {

                            orderStatusData.map(
                                (entry,index)=>(

                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />

                                )
                            )

                        }

                    </Pie>

                    <Tooltip

                        contentStyle={{

                            background:"#1d1636",

                            borderRadius:"12px",

                            border:"none",

                            color:"white"

                        }}

                    />

                </PieChart>

            </ResponsiveContainer>

            <div className="chart-legend">

    {orderStatusData.map((item, index) => (

        <div
            key={index}
            className="legend-item"
        >

            <div
                className="legend-left"
            >

                <span
                    className="legend-dot"
                    style={{
                        background: COLORS[index]
                    }}
                />

                {item.name}

            </div>

            <span className="legend-value">

                {item.value}

            </span>

        </div>

    ))}

</div>

        </div>

        {/* RIGHT */}

        <div className="glass-card insight-card">

            <h2>
                Quick Insights
            </h2>

            <div className="insight-item">

                Pending Orders

                <span>

                    {dashboard.pendingOrders}

                </span>

            </div>

            <div className="insight-item">

                Shipped Orders

                <span>

                    {dashboard.shippedOrders}

                </span>

            </div>

            <div className="insight-item">

                Delivered Orders

                <span>

                    {dashboard.deliveredOrders}

                </span>

            </div>

            <div className="insight-item">

                Cancelled Orders

                <span>

                    {dashboard.cancelledOrders}

                </span>

            </div>

            <div className="insight-item">

                Revenue

                <span>

                    ₹ {Number(
                        dashboard.totalRevenue
                    ).toLocaleString("en-IN")}

                </span>

            </div>

        </div>

    </div>

            <div className="dashboard-section"
                style={{
                    marginTop: "35px"
                }}
            >

    <div
        className="glass-card"
        style={{
            padding: "36px"
        }}
    >

        <div className="revenue-header">

<h2>
Revenue Trend
</h2>

<span
    style={{
        color:"#94a3b8",
        fontSize:"14px"
    }}
>

Last 30 Days

</span>

</div>

        <div className="chart-wrapper">

    <div
        style={{
            width: isMobile ? "600px" : "100%",
            height: "300px"
        }}
    >

        <ResponsiveContainer
            width="100%"
            height="100%"
        >

            <AreaChart
                data={dashboard.dailyRevenue}
                margin={{
                    top: 20,
                    right: 25,
                    left: 5,
                    bottom: 0
                }}
            >

                <defs>

                <linearGradient id="colorRevenue">

                    <stop
                        offset="0%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.7}
                    />

                    <stop
                        offset="70%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.18}
                    />

                    <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                        stopOpacity={0}
                    />

                </linearGradient>

                </defs>

                <CartesianGrid
                    stroke="rgba(255,255,255,.04)"
                    vertical={false}
                />

                <XAxis
                    dataKey="date"
                    interval={2}
                    tick={{
                        fill: "#94a3b8",
                        fontSize: 12
                    }}
                    tickFormatter={(date) =>
                        new Date(date).toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "short"
                            }
                        )
                    }
                />
                <YAxis
                    tick={{
                        fill: "#94a3b8"
                    }}
                    tickFormatter={(value)=>{

                        if(value===0) return "₹ 0";

                        return `₹ ${Math.round(value/100000)}L`;

                    }}
                />

                <Tooltip
                    contentStyle={{
                        background:"rgba(20,20,35,.95)",
                        border:"1px solid rgba(255,255,255,.08)",
                        borderRadius:"16px",
                        backdropFilter: "blur(18px)",
                        color:"#fff",
                        boxShadow:"0 18px 45px rgba(0,0,0,.45)"
                    }}
                    formatter={(value) => [
                        `₹ ${Number(value).toLocaleString("en-IN")}`,
                        "Revenue"
                    ]}
                    labelFormatter={(label) =>
                        new Date(label)
                            .toLocaleDateString(
                                "en-IN",
                                {
                                    day: "numeric",
                                    month: "long"
                                }
                            )
                    }
                />

                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    animationDuration={1500}
                    animationEasing="ease-out"
                    dot={false}
                    activeDot={{
                        r: 8,
                        fill: "#8b5cf6",
                        stroke: "#ffffff",
                        strokeWidth: 3
                    }}
                    />


            </AreaChart>

                    </ResponsiveContainer>
        </div>
    </div>
                
<div className="revenue-summary">

    <div className="summary-card">
        <p>Total Revenue</p>

        <h3>
            ₹ {formatCompactCurrency(dashboard.totalRevenue)}
        </h3>
    </div>

    <div className="summary-card">
        <p>Total Orders</p>

        <h3>{dashboard.totalOrders}</h3>
    </div>

    <div className="summary-card">
        <p>Average Order</p>

        <h3>
            ₹{" "}
            {(
                dashboard.totalRevenue /
                dashboard.totalOrders
            ).toLocaleString("en-IN", {
                maximumFractionDigits: 0
            })}
        </h3>
    </div>

    <div className="summary-card success">
        <p>Growth</p>

        <h3>▲ 18%</h3>
    </div>

</div>

</div>
                  
                  <div className="glass-card recent-orders">

    <div className="table-header">

        <h2>Recent Orders</h2>

            <button className="glow-button"
                                onClick={() => navigate("/admin/orders")}
                                style={{
                                    padding: "12px"
                                }}
        >
            View All
        </button>

    </div>


    
                    <div className="table-wrapper">
                    
                        <table className="orders-table">

        <thead>

            <tr>

                <th>ID</th>

                <th>Customer</th>

                <th>Amount</th>

                <th>Status</th>

                <th>Date</th>

            </tr>

        </thead>

        <tbody>

        {
            dashboard.recentOrders.map(order => (

                <tr key={order.id}>

                    <td>#{order.id}</td>

                    <td>{order.user.name}</td>

                    <td>
                        ₹ {Number(order.totalAmount).toLocaleString("en-IN")}
                    </td>

                    <td>

                        <span
                            className={`status ${order.status.toLowerCase()}`}
                        >
                            {order.status}
                        </span>

                    </td>

                    <td>

                        {new Date(order.orderDate).toLocaleDateString()}

                    </td>

                </tr>

            ))
        }

        </tbody>

                        </table>
                        </div>

</div>
    </div>

</div>

    </>
    );

}

export default AdminDashboard;