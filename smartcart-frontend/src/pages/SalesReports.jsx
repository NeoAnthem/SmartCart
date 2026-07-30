import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ReportCard from "../components/admin/ReportCard";
import RevenueChart from "../components/admin/RevenueChart";
import Select from "react-select";
import customSelectStyles from "../styles/selectStyles";
import { HiOutlineBanknotes, HiOutlineCube, HiOutlineChartBar, HiOutlineTrophy, HiOutlinePresentationChartLine } from "react-icons/hi2";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";
import API_BASE_URL from "../services/api";

function SalesReports() {

    const [report, setReport] = useState(null);

    const token = localStorage.getItem("token");

    const [revenueData, setRevenueData] = useState([]);

    const [productPerformance, setProductPerformance] = useState([]);

    const [search, setSearch] = useState("");

    const [categoryFilter, setCategoryFilter] = useState("All");

    const [sortBy, setSortBy] = useState("unitsSold");

    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 6;


    const loadReport = async () => {

        try {

            const response = await axios.get(
                `${API_BASE_URL}/api/reports/sales`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReport(response.data);

        } catch (error) {

            toast.error(
    error.response?.data ||
    "Something went wrong"
);

        }

};

    const loadMonthlyRevenue = async () => {

    try {

        const response = await axios.get(

            `${API_BASE_URL}/api/reports/monthly-revenue`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        setRevenueData(response.data);

    }

    catch (error) {

        toast.error(
    error.response?.data ||
    "Something went wrong"
);

    }

    };

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

    const loadProductPerformance = async () => {

    try {

        const response = await axios.get(

            `${API_BASE_URL}/api/reports/product-performance`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        setProductPerformance(response.data);


    }

    catch (error) {

        toast.error(
    error.response?.data ||
    "Something went wrong"
);

    }

};
    

useEffect(() => {

    loadReport();

    loadMonthlyRevenue();

    loadProductPerformance();

}, []);
    

    
    useEffect(() => {

    setCurrentPage(1);

}, [

    search,

    categoryFilter,

    sortBy

]);
    
    const filteredProducts = [...productPerformance]

.filter(product =>

    product.productName

        .toLowerCase()

        .includes(search.toLowerCase())

)

.filter(product =>

    categoryFilter === "All"

    ||

    product.category === categoryFilter

)

.sort((a,b)=>{

    switch(sortBy){

        case "revenue":

            return b.revenue-a.revenue;

        case "stock":

            return b.stockRemaining-a.stockRemaining;

        case "name":

            return a.productName.localeCompare(b.productName);

        default:

            return b.unitsSold-a.unitsSold;

    }

});
    
    const totalPages = Math.ceil(

        filteredProducts.length /

        productsPerPage

    );

    const currentProducts = filteredProducts.slice(

        (currentPage - 1) * productsPerPage,

        currentPage * productsPerPage

    );
    
    const categories = [

    "All",

    ...new Set(

        productPerformance.map(

            p=>p.category

        )

    )

];

    if (!report) {
    return (
        <PageLoader
            title="Loading Reports"
            message="Generating sales reports..."
        />
    );
}

const formatCompactCurrency = (value) => {

    if (value >= 10000000) {

        return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    }

    if (value >= 100000) {

        return `₹ ${(value / 100000).toFixed(2)} L`;
    }

    if (value >= 1000) {

        return `₹ ${(value / 1000).toFixed(1)} K`;
    }

    return `₹ ${value}`;
};


    return (

        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "1450px",
                    margin: "0 auto",
                    padding: "40px 30px"
                }}
            >

                <h1 className="gradient-text">
                    Sales Reports
                </h1>

                {/* ===================== STAT CARDS ===================== */}

                <div className="stats-grid">

                    <ReportCard
                        title="Total Revenue"
                        value={formatCompactCurrency(report.totalRevenue)}
                        subtitle="Total earnings"
                        icon={<HiOutlineBanknotes />}
                        color="#22c55e"
                    />

                    <ReportCard
                        title="Total Orders"
                        value={report.totalOrders}
                        subtitle="Orders placed"
                        icon={<HiOutlineCube />}
                        color="#3b82f6"
                    />

                    <ReportCard
                        title="Average Order"
                        value={formatCompactCurrency(report.averageOrderValue)}
                        subtitle="Per order"
                        icon={<HiOutlineChartBar />}
                        color="#f59e0b"
                    />

                    <ReportCard
                        title="Highest Order"
                        value={formatCompactCurrency(report.highestOrder)}
                        subtitle="Highest purchase"
                        icon={<HiOutlineTrophy />}
                        color="#a855f7"
                    />

                </div>

                {/* ===================== CHART SECTION ===================== */}

                <div className="reports-grid">

                    {/* Revenue Trend */}

                    <div
                        className="report-section report-chart-card"
                        style={{
                            padding: "30px"
                        }}
                    >

                        <h2 style={{ marginBottom: "20px" }}>
                            Revenue Trend
                        </h2>
                        
                    <div className="chart-wrapper">

                        <div className="chart-inner">

                            <RevenueChart data={revenueData} />

                        </div>

                    </div>

                    </div>

                    {/* Revenue Summary */}

                    <div
                        className="report-section"
                        style={{
                            padding: "30px",
                            borderRadius: "18px",
                            minHeight: "unset"
                        }}
                    >

                        <h2 style={{ marginBottom: "30px" }}>
                            Revenue Summary
                        </h2>

                        <div className="revenue-summary-grid">

                            <div className="revenue-summary-item">

                                <small>Total Revenue</small>

                                <h2>
                                    ₹ {Number(report.totalRevenue).toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </h2>

                            </div>

                            <div className="revenue-summary-item">

                                <small>Total Orders</small>

                                <h2>{report.totalOrders}</h2>

                            </div>

                            <div className="revenue-summary-item">

                                <small>Average Order</small>

                                <h2>
                                    ₹ {Number(report.averageOrderValue).toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </h2>

                            </div>

                            <div className="revenue-summary-item">

                                <small>Highest Order</small>

                                <h2>
                                    ₹ {Number(report.highestOrder).toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </h2>

                            </div>

                        </div>

                    </div>
</div>
                    <div
    className="report-section"
    style={{
        marginTop: "35px",
        padding: "30px"
    }}
>
    

    <div className="performance-header">

        <div>

            <div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "12px"
    }}
>

    <HiOutlinePresentationChartLine
        size={30}
        color="#8b5cf6"
    />

    <h2 style={{ margin: 0 }}>
        Product Performance
    </h2>

</div>

            <p
                style={{
                    color: "#94a3b8",
                    marginTop: "8px"
                }}
            >
                Analyze sales performance of every product.
            </p>

        </div>

<div className="products-badge">

<HiOutlineCube />

    <div>

        <div className="products-badge-label">
            Products
        </div>

            <div className="products-badge-value">
                                                            
                {filteredProducts.length}
            </div>

    </div>

</div>

    </div>

<div className="performance-toolbar">

    <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="cool-input"
        style={{
            flex: 1,
            maxWidth: "850px"
        }}
    />

    <div style={{ width: "220px", flexShrink: 0 }}>

        <Select
            styles={customSelectStyles}
            options={categories.map(category => ({
                value: category,
                label: category
            }))}
            value={{
                value: categoryFilter,
                label: categoryFilter
            }}
            onChange={(selected) =>
                setCategoryFilter(selected.value)
            }
        />

    </div>

    <div style={{ width: "250px" }}>

        <Select
            styles={customSelectStyles}
            options={[
                {
                    value: "unitsSold",
                    label: "Units Sold"
                },
                {
                    value: "revenue",
                    label: "Revenue"
                },
                {
                    value: "stock",
                    label: "Stock Remaining"
                },
                {
                    value: "name",
                    label: "Product Name"
                }
            ]}
            value={[
                {
                    value: "unitsSold",
                    label: "Units Sold"
                },
                {
                    value: "revenue",
                    label: "Revenue"
                },
                {
                    value: "stock",
                    label: "Stock Remaining"
                },
                {
                    value: "name",
                    label: "Product Name"
                }
            ].find(option => option.value === sortBy)}
            onChange={(selected) =>
                setSortBy(selected.value)
            }
        />

    </div>

</div>
                        
                        <div className="performance-table-container">

    <table className="performance-table">

        <thead>

            <tr>

                <th>#</th>

                <th>Product</th>

                <th>Category</th>

                <th>Units Sold</th>

                <th>Sales Frequency</th>

                <th>Revenue</th>

                <th>Avg Price</th>

                <th>Stock</th>

                <th>Status</th>

            </tr>

        </thead>

        <tbody>

            {

                currentProducts.map((product, index) => {

                    const maxSold =
                        filteredProducts[0]?.unitsSold || 1;

                    const percentage =
                        (product.unitsSold / maxSold) * 100;

                    let status = "Poor";

                    let statusClass = "poor";

                    if(product.unitsSold >= 50){

                        status = "Excellent";

                        statusClass = "excellent";

                    }

                    else if(product.unitsSold >= 30){

                        status = "Good";

                        statusClass = "good";

                    }

                    else if(product.unitsSold >= 15){

                        status = "Average";

                        statusClass = "average";

                    }

                    return(

                        <tr key={product.productName}>

                            <td>
                                {
                                    (currentPage - 1) *

                                    productsPerPage +

                                    index +

                                    1
                                }
                            </td>

                            <td>

                                <strong>

                                    {product.productName}

                                </strong>

                            </td>

                            <td>{product.category}</td>

                            <td>{product.unitsSold}</td>

                            <td>

                                <div className="sales-progress">

                                    <div

                                        className="sales-progress-fill"

                                        style={{

                                            width:`${percentage}%`

                                        }}

                                    />

                                </div>

                            </td>

                            <td>

                                ₹ {Number(product.revenue).toLocaleString("en-IN")}

                            </td>

                            <td>

                                ₹ {Number(product.averagePrice).toLocaleString("en-IN")}

                            </td>

                            <td>{product.stockRemaining}</td>

                            <td>

                                <span className={`performance-badge ${statusClass}`}>

                                    {status}

                                </span>

                            </td>

                        </tr>

                    );

                })

            }

        </tbody>

    </table>

</div>
                    
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages || 1}
                        setCurrentPage={setCurrentPage}
                    />

                    </div>
                    

            </div>



        </>

    );

}

export default SalesReports;