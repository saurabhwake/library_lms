import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaEdit } from 'react-icons/fa'; // Import icons

const UserDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    name: '',
    email: '',
    profilePhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [borrowRequest, setBorrowRequest] = useState({
    bookTitle: '',
    author: '',
    borrowDate: '',
    returnDate: '',
    period: '',
  });
  const [borrowingRequests, setBorrowingRequests] = useState([]); // State for storing borrowing requests

  // Fetch logged-in user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedInUser({
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePicture || 'https://randomuser.me/api/portraits/men/75.jpg',
      });
    } else {
      alert('You are not logged in. Redirecting to login page...');
      window.location.href = '/login';
    }
  }, []);

  // Mock data for books
  useEffect(() => {
    const mockBooks = [
      { id: 1, title: 'Introduction to React', author: 'John Doe', available: true },
      { id: 2, title: 'Advanced JavaScript', author: 'Jane Smith', available: false },
      { id: 3, title: 'Python Programming', author: 'Alice Johnson', available: true },
    ];
    setBooks(mockBooks);
    setLoading(false);
  }, []);

  // Fetch borrowing requests from localStorage
  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('borrowingRequests')) || [];
    setBorrowingRequests(requests);
  }, []);

  // Handle profile photo upload
  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLoggedInUser({ ...loggedInUser, profilePhoto: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle updating user profile
  const handleUpdateProfile = async () => {
    try {
      const updatedUser = { ...loggedInUser, ...editedUser };
      setLoggedInUser(updatedUser);
      setShowEditProfileModal(false);
      setProfilePhoto(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle borrowing request form submission
  const handleBorrowRequestSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now(), // Unique ID for the request
      userName: loggedInUser.name, // Logged-in user's name
      bookTitle: borrowRequest.bookTitle, // Book title from the form
      status: 'Pending', // Default status
      borrowDate: borrowRequest.borrowDate,
      returnDate: borrowRequest.returnDate,
      period: borrowRequest.period,
    };

    // Save the request to localStorage (or send it to the backend)
    const requests = JSON.parse(localStorage.getItem('borrowingRequests')) || [];
    requests.push(newRequest);
    localStorage.setItem('borrowingRequests', JSON.stringify(requests));

    // Update the state to reflect the new request
    setBorrowingRequests(requests);

    // Reset the form and close the modal
    setShowBorrowForm(false);
    setBorrowRequest({
      bookTitle: '',
      author: '',
      borrowDate: '',
      returnDate: '',
      period: '',
    });

    alert('Borrowing request submitted successfully!');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: 'rgba(255, 255, 255, 0.8)', height: '100vh', overflowY: 'auto', boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Header />
        <h1 style={{ color: '#333', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>User Dashboard</h1>

        {/* User Profile Section */}
        <div style={{ marginBottom: '20px', background: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>My Profile</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src={loggedInUser.profilePhoto}
              alt="Profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #3498db', boxShadow: '0 4px 10px rgba(52, 152, 219, 0.5)' }}
            />
            <div>
              <p><strong>Name:</strong> {loggedInUser.name}</p>
              <p><strong>Email:</strong> {loggedInUser.email}</p>
            </div>
          </div>
          <button
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #3498db, #2980b9)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '10px',
              boxShadow: '0 4px 6px rgba(52, 152, 219, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            onClick={() => setShowEditProfileModal(true)}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Borrowing Requests Section */}
        <div style={{ marginBottom: '20px', background: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <h2>Borrowing Requests</h2>
          <button
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '10px',
              boxShadow: '0 4px 6px rgba(39, 174, 96, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            onClick={() => setShowBorrowForm(true)}
          >
            Make Request
          </button>

          {/* Table to display borrowing requests */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ background: '#3498db', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Book Title</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Borrow Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Return Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Period</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {borrowingRequests.map((request) => (
                <tr key={request.id} style={{ background: '#f9f9f9' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.bookTitle}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.borrowDate}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.returnDate}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.period}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', color: request.status === 'Approved' ? 'green' : request.status === 'Rejected' ? 'red' : 'orange' }}>
                    {request.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Borrow Request Form Modal */}
        {showBorrowForm && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '400px',
          }}>
            <h2>Make Borrowing Request</h2>
            <form onSubmit={handleBorrowRequestSubmit}>
              <input
                type="text"
                placeholder="Book Title"
                value={borrowRequest.bookTitle}
                onChange={(e) => setBorrowRequest({ ...borrowRequest, bookTitle: e.target.value })}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={borrowRequest.author}
                onChange={(e) => setBorrowRequest({ ...borrowRequest, author: e.target.value })}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                required
              />
              <input
                type="date"
                placeholder="Borrow Date"
                value={borrowRequest.borrowDate}
                onChange={(e) => setBorrowRequest({ ...borrowRequest, borrowDate: e.target.value })}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                required
              />
              <input
                type="date"
                placeholder="Return Date"
                value={borrowRequest.returnDate}
                onChange={(e) => setBorrowRequest({ ...borrowRequest, returnDate: e.target.value })}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                required
              />
              <input
                type="text"
                placeholder="Period (e.g., 2 weeks)"
                value={borrowRequest.period}
                onChange={(e) => setBorrowRequest({ ...borrowRequest, period: e.target.value })}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(39, 174, 96, 0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Submit
                </button>
                <button
                  type="button"
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(231, 76, 60, 0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                  onClick={() => setShowBorrowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfileModal && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '400px',
          }}>
            <h2>Edit Profile</h2>
            <input
              type="text"
              placeholder="Name"
              value={editedUser.name || loggedInUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={editedUser.email || loggedInUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="file"
              onChange={handleProfilePhotoUpload}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(39, 174, 96, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                onClick={handleUpdateProfile}
              >
                Save
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(231, 76, 60, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                onClick={() => setShowEditProfileModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;