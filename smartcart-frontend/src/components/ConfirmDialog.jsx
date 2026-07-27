import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function ConfirmDialog({

    open,
    title,
    message,
    onConfirm,
    onCancel

}) {

    if (!open) return null;

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(10,10,20,.78)",
                backdropFilter: "blur(12px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10000
            }}
            onClick={onCancel}
        >

            <div
                className="glass-card"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "460px",
                    padding: "30px",
                    borderRadius: "22px",
                    textAlign: "center",
                    background: "rgba(18,18,28,.92)",
                    border: "1px solid rgba(255,255,255,.08)",
                    boxShadow: "0 30px 80px rgba(0,0,0,.45)"
                }}
            >

                <div
                    style={{
                        width: "78px",
                        height: "78px",
                        margin: "0 auto 22px",
                        borderRadius: "50%",
                        background:
                            "linear-gradient(135deg,#ef4444,#dc2626)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow:
                            "0 0 35px rgba(239,68,68,.45)"
                    }}
                >
                    <HiOutlineExclamationTriangle
                        size={42}
                        color="white"
                    />
                </div>

                <h2>{title}</h2>

                <p
                    style={{
                        color: "#94a3b8",
                        marginBottom: "35px"
                    }}
                >
                    {message}
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: "12px"
                    }}
                >

                    <button
                        className="glow-button"
                        style={{
                            flex: 1,
                            padding: "10px",
                            background:
                                "rgba(255,255,255,.06)"
                        }}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="glow-button"
                        style={{
                            flex: 1,
                            padding: "10px",
                            background:
                                "linear-gradient(90deg,#ef4444,#dc2626)"
                        }}
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmDialog;