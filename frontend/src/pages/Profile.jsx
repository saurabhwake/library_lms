import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaEdit, FaSignOutAlt, FaSave, FaTimes } from 'react-icons/fa'; // Import icons

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://randomuser.me/api/portraits/men/75.jpg');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfilePicture(user.profilePicture || 'https://randomuser.me/api/portraits/men/75.jpg');
    } else {
      alert('You are not logged in. Redirecting to login page...');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <>
      <Header />
      <div 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundImage: 'url("https://www.travelandleisure.com/thmb/9F77hDCz6uj3cJIBW4f4kGdfbn8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/admont-abbey-library-admont-austria-LIBRARY0319-2aa89cccb89d4f44b71181e64b54fbfb.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
        }}
      >
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '450px',
            textAlign: 'center',
          }}
        >
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <img
              src={profilePicture}
              alt="Profile"
              style={{ 
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #27ae60',
              }}
            />
          </div>
          <h1 style={{ color: '#d35400', marginBottom: '20px' }}>Profile</h1>
          <p style={{ fontSize: '18px', margin: '10px 0' }}><strong>Name:</strong> {name}</p>
          <p style={{ fontSize: '18px', margin: '10px 0' }}><strong>Email:</strong> {email}</p>
          <button 
            onClick={handleLogout} 
            style={{ 
              width: '100%',
              padding: '12px',
              marginTop: '10px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '17px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.3s ease',
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;