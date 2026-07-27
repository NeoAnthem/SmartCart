import "../styles/LoadingSpinner.css";

function LoadingSpinner({ size = 70 }) {
    return (
        <div
            className="loading-spinner"
            style={{
                width: size,
                height: size,
                borderWidth: size / 10,
            }}
        />
    );
}

export default LoadingSpinner;