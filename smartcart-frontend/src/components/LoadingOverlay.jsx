import LoadingSpinner from "./LoadingSpinner";
import "../styles/LoadingOverlay.css";

function LoadingOverlay({ message = "Loading..." }) {
    return (
        <div className="loading-overlay">
            <div className="loading-overlay-box glass-card">
                <LoadingSpinner size={70} />

                <p>{message}</p>
            </div>
        </div>
    );
}

export default LoadingOverlay;