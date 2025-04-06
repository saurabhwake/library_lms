import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [borrowingRequests, setBorrowingRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', available: true });
  const [editedUser, setEditedUser] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch books and borrowing requests
  useEffect(() => {
    const mockBooks = [
      { id: 1, title: 'Introduction to React', author: 'John Doe', available: true },
      { id: 2, title: 'Advanced JavaScript', author: 'Jane Smith', available: false },
      { id: 3, title: 'Python Programming', author: 'Alice Johnson', available: true },
    ];
    setBooks(mockBooks);

    // Fetch borrowing requests from localStorage
    const requests = JSON.parse(localStorage.getItem('borrowingRequests')) || [];
    setBorrowingRequests(requests);
  }, []);

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle user deletion (block)
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Open view modal
  const openViewModal = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  // Open edit profile modal
  const openEditProfileModal = (user) => {
    setEditedUser(user);
    setShowEditProfileModal(true);
  };

  // Handle profile photo upload
  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  // Handle updating user profile
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editedUser.name);
      formData.append('email', editedUser.email);
      formData.append('age', editedUser.age);
      formData.append('language', editedUser.language);
      formData.append('gender', editedUser.gender);
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }

      const response = await fetch(`http://localhost:5000/users/${editedUser._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
      setShowEditProfileModal(false);
      setProfilePhoto(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle adding a new book
  const handleAddBook = async () => {
    try {
      const response = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      const data = await response.json();
      setBooks([...books, data]);
      setShowAddBookModal(false);
      setNewBook({ title: '', author: '', available: true });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Handle approving a borrowing request
  const handleApproveRequest = (requestId) => {
    const updatedRequests = borrowingRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'Approved' } : request
    );
    setBorrowingRequests(updatedRequests);
    localStorage.setItem('borrowingRequests', JSON.stringify(updatedRequests));

    // Update book availability
    const request = borrowingRequests.find((req) => req.id === requestId);
    const updatedBooks = books.map((book) =>
      book.id === request.bookId ? { ...book, available: false } : book
    );
    setBooks(updatedBooks);
  };

  // Handle rejecting a borrowing request
  const handleRejectRequest = (requestId) => {
    const updatedRequests = borrowingRequests.filter((request) => request.id !== requestId);
    setBorrowingRequests(updatedRequests);
    localStorage.setItem('borrowingRequests', JSON.stringify(updatedRequests));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#f0f0f0', height: '100vh', overflowY: 'auto' }}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Header />
        <h1>Admin Dashboard</h1>

        {/* Statistics Overview */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: 1, background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>Total Books</h3>
            <p>{books.length}</p>
          </div>
          <div style={{ flex: 1, background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div style={{ flex: 1, background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>Borrowed Books</h3>
            <p>{books.filter((book) => !book.available).length}</p>
          </div>
        </div>

        {/* Book Management */}
        <div style={{ marginBottom: '20px' }}>
          <h2>Book Management</h2>
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button
            style={{
              padding: '10px 20px',
              background: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
            onClick={() => setShowAddBookModal(true)}
          >
            Add New Book
          </button>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Title</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Author</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Availability</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} style={{ border: '1px solid #ccc' }}>
                  <td style={{ padding: '10px' }}>{book.title}</td>
                  <td style={{ padding: '10px' }}>{book.author}</td>
                  <td style={{ padding: '10px' }}>{book.available ? 'Available' : 'Borrowed'}</td>
                  <td style={{ padding: '10px' }}>
                    <button
                      style={{
                        padding: '5px 10px',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '5px',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        padding: '5px 10px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Management */}
        <div style={{ marginBottom: '20px' }}>
          <h2>User Management</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Borrowed Books</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={{ border: '1px solid #ccc' }}>
                  <td style={{ padding: '10px' }}>{user.name}</td>
                  <td style={{ padding: '10px' }}>{user.email}</td>
                  <td style={{ padding: '10px' }}>{user.borrowedBooks || 0}</td>
                  <td style={{ padding: '10px' }}>
                    <button
                      style={{
                        padding: '5px 10px',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '5px',
                      }}
                      onClick={() => openViewModal(user)}
                    >
                      View
                    </button>
                    <button
                      style={{
                        padding: '5px 10px',
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '5px',
                      }}
                      onClick={() => openEditProfileModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        padding: '5px 10px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Borrowing Requests */}
        <div style={{ marginBottom: '20px' }}>
          <h2>Borrowing Requests</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>User</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Book</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {borrowingRequests.map((request) => (
                <tr key={request.id} style={{ border: '1px solid #ccc' }}>
                  <td style={{ padding: '10px' }}>{request.userName}</td>
                  <td style={{ padding: '10px' }}>{request.bookTitle}</td>
                  <td style={{ padding: '10px' }}>{request.status}</td>
                  <td style={{ padding: '10px' }}>
                    <button
                      style={{
                        padding: '5px 10px',
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '5px',
                      }}
                      onClick={() => handleApproveRequest(request.id)}
                    >
                      Approve
                    </button>
                    <button
                      style={{
                        padding: '5px 10px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View User Modal */}
        {showViewModal && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}>
            <h2>User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Borrowed Books:</strong> {selectedUser.borrowedBooks || 0}</p>
            <button
              style={{
                padding: '10px 20px',
                background: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => setShowViewModal(false)}
            >
              Close
            </button>
          </div>
        )}

        {/* Add New Book Modal */}
        {showAddBookModal && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            width: '400px',
          }}>
            <h2>Add New Book</h2>
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <label style={{ display: 'block', marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={newBook.available}
                onChange={(e) => setNewBook({ ...newBook, available: e.target.checked })}
              />
              Available
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  background: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onClick={handleAddBook}
              >
                Add Book
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => setShowAddBookModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfileModal && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            width: '400px',
          }}>
            <h2>Edit Profile</h2>
            <input
              type="text"
              placeholder="Name"
              value={editedUser.name || ''}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={editedUser.email || ''}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              placeholder="Age"
              value={editedUser.age || ''}
              onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              placeholder="Language"
              value={editedUser.language || ''}
              onChange={(e) => setEditedUser({ ...editedUser, language: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <select
              value={editedUser.gender || ''}
              onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="file"
              onChange={handleProfilePhotoUpload}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                style={{
                  padding: '10px 20px',
                  background: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onClick={handleUpdateProfile}
              >
                Save
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
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

export default AdminDashboard;