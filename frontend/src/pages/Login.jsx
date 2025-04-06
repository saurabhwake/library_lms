import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        alert(data.message); // "Login successful"

        // Redirect based on role
        if (data.user.role === 'user') {
          navigate('/user-dashboard'); // Redirect to User Dashboard
        } else if (data.user.role === 'admin') {
          navigate('/admin-dashboard'); // Redirect to Admin Dashboard
        }
      } else {
        setError(data.message); // Set error message from the backend
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <>
      <Header />
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        backgroundImage: "url('https://thumbs.dreamstime.com/b/open-book-table-library-background-open-book-table-library-background-symbolizing-concept-331170058.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        fontFamily: 'Arial', 
        color: '#333' 
      }}>
        <div style={{ 
          display: 'flex', 
          background: 'white', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
          width: '800px', 
          height: '400px' 
        }}>
          <img 
            src="https://www.travelandleisure.com/thmb/9F77hDCz6uj3cJIBW4f4kGdfbn8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/admont-abbey-library-admont-austria-LIBRARY0319-2aa89cccb89d4f44b71181e64b54fbfb.jpg" 
            alt="Form Illustration" 
            style={{ width: '350px', height: 'auto', marginRight: '20px', borderRadius: '8px' }} 
          />
          
          <div style={{ textAlign: 'center', flex: 1 }}>
            <h1 style={{ color: '#d35400' }}>Login</h1>
            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '17px' }}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '17px' }}
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '17px' }}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                style={{ width: '100%', padding: '12px', marginTop: '10px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '17px' }}
              >
                Login
              </button>
            </form>
            <p style={{ marginTop: '10px', fontSize: '16px' }}>
              Don't have an account?{' '}
              <span 
                onClick={() => navigate('/register')} 
                style={{ color: '#27ae60', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;