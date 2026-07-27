import "./ReportCard.css";

function ReportCard({
    title,
    value,
    subtitle,
    icon,
    color
}) {
    return (
        <div
            className="report-card"
            style={{
                borderTop: `5px solid ${color}`
            }}
        >
            <div className="report-card-header">

            <div
                className="report-icon"
                style={{
                    background: `${color}20`,
                    color: color
                }}
            >
                {icon}
            </div>

                <h3>{title}</h3>

            </div>

            <h1>{value}</h1>

            <p>{subtitle}</p>

        </div>
    );
}

export default ReportCard;