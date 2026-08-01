import LoadingSpinner from "./LoadingSpinner";

function PageLoader({
    title = "Loading...",
    message = "Please wait..."
}) {
    return (
        <>

            <div className="page-loader">
                <div className="glass-card page-loader-card">

                    <div className="page-loader-spinner">
                        <LoadingSpinner size={56} />
                    </div>

                    <h2 className="gradient-text">
                        {title}
                    </h2>

                    <p>{message}</p>

                </div>
            </div>
        </>
    );
}

export default PageLoader;