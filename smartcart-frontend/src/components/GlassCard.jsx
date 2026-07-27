function GlassCard({ children }) {

  return (

    <div
      className="glass-card"
      style={{
        padding: "20px"
      }}
    >
      {children}
    </div>

  );

}

export default GlassCard;