import { useEffect } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  // Updated Color Scheme
  const colors = {
    primary: "#2c3e50", // Dark Blue
    secondary: "#34495e", // Slightly Lighter Blue
    accent: "#e67e22", // Orange
    background: "#ecf0f1", // Light Gray
    textLight: "#ffffff",
    textDark: "#2c3e50",
    gradient: "linear-gradient(to bottom, rgb(47, 198, 235), rgb(175, 235, 255), rgb(159, 217, 236))",
  };

  // Predefined book images
  const bookImages = [
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d", // Book stack
    "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6", // Open book
    "https://images.unsplash.com/photo-1512820790803-83ca734da794", // Bookshelf
    "https://images.unsplash.com/photo-1532012197267-da84d127e765", // Library
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc", // Reading
    "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6", // Bookstore
  ];

  return (
    <>
      {/* Fixed Header */}
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, boxSizing: "border-box" }}>
        <Header />
      </div>

      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          height: "450px",
          background: colors.gradient,
          color: colors.textDark,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
          marginTop: "80px", // Add margin to account for the fixed header
          boxSizing: "border-box", // Include padding in width calculation
        }}
      >
        <h1 style={{ fontSize: "42px", fontWeight: "bold", color: colors.textDark }}>Your Digital Library</h1>
        <p style={{ fontSize: "18px", marginTop: "10px", maxWidth: "600px", color: colors.textDark }}>
          Discover and manage your books seamlessly.
        </p>
        <Link to="/register">
          <button
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: colors.accent,
              color: colors.textLight,
              fontWeight: "bold",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
              boxSizing: "border-box", // Include padding in width calculation
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Explore Books
          </button>
        </Link>
      </div>

      {/* Carousel Section */}
      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          backgroundColor: colors.background,
          boxSizing: "border-box", // Include padding in width calculation
        }}
      >
        <h2 style={{ fontSize: "26px", fontWeight: "bold", textAlign: "center", color: colors.textDark }}>
          Latest Arrivals
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={{ marginTop: "20px", width: "100%", boxSizing: "border-box" }} // Ensure Swiper doesn't overflow
        >
          {bookImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt="Book"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                  boxSizing: "border-box", // Include padding in width calculation
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Book Categories Section */}
      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          backgroundColor: colors.background,
          boxSizing: "border-box", // Include padding in width calculation
        }}
      >
        <h2 style={{ fontSize: "26px", fontWeight: "bold", textAlign: "center", color: colors.textDark }}>
          Book Categories
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            marginTop: "20px",
            boxSizing: "border-box", // Include padding in width calculation
          }}
        >
          {["Fiction", "Science", "History", "Technology", "Biography", "Education"].map(
            (category, index) => (
              <div
                key={index}
                style={{
                  padding: "15px",
                  backgroundColor: colors.primary,
                  color: colors.textLight,
                  borderRadius: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxSizing: "border-box", // Include padding in width calculation
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = colors.secondary)}
                onMouseOut={(e) => (e.target.style.backgroundColor = colors.primary)}
              >
                {category}
              </div>
            )
          )}
        </div>
      </div>

      {/* Testimonials Slider */}
      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          backgroundColor: colors.background,
          boxSizing: "border-box", // Include padding in width calculation
        }}
      >
        <h2 style={{ fontSize: "26px", fontWeight: "bold", textAlign: "center", color: colors.textDark }}>
          What Readers Say
        </h2>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          style={{ marginTop: "20px", width: "100%", boxSizing: "border-box" }} // Ensure Swiper doesn't overflow
        >
          <SwiperSlide>
            <div
              style={{
                padding: "20px",
                backgroundColor: colors.background,
                borderRadius: "10px",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                boxSizing: "border-box", // Include padding in width calculation
              }}
            >
              <p style={{ fontStyle: "italic", color: colors.textDark }}>
                "A fantastic platform to explore books!"
              </p>
              <span style={{ fontWeight: "bold", display: "block", marginTop: "10px", color: colors.primary }}>
                - Alex Johnson
              </span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                padding: "20px",
                backgroundColor: colors.background,
                borderRadius: "10px",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                boxSizing: "border-box", // Include padding in width calculation
              }}
            >
              <p style={{ fontStyle: "italic", color: colors.textDark }}>
                "Best library system I've ever used!"
              </p>
              <span style={{ fontWeight: "bold", display: "block", marginTop: "10px", color: colors.primary }}>
                - Sarah Lee
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <Footer />
    </>
  );
};

export default Home;