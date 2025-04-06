const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed", // Make the header fixed
        top: 0, // Stick to the top
        width: "100%", // Full width
        zIndex: 1000, // Ensure the header stays above other content
        boxSizing: "border-box", // Include padding in the width calculation
      }}
    >
      <h1 style={{ margin: 0 }}>Library LMS</h1>
      <nav>
        <a href="/" style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}>
          Home
        </a>
        <a href="/login" style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}>
          Login
        </a>
        <a href="/register" style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}>
          Register
        </a>
        <a href="/profile" style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}>
          Profile
        </a>
      </nav>
    </header>
  );
};

export default Header;