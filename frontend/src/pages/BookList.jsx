import Header from '../components/Header';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const BookList = () => {
  const books = [
    { id: 1, title: 'Introduction to React', author: 'John Doe', description: 'Learn the basics of React and build modern web applications.', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Advanced JavaScript', author: 'Jane Smith', description: 'Master advanced JavaScript concepts and techniques.', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Python Programming', author: 'Alice Johnson', description: 'A comprehensive guide to Python programming for beginners.', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Data Structures and Algorithms', author: 'Bob Brown', description: 'Understand the fundamentals of data structures and algorithms.', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f6' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '20px' }}>Book List</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {books.map(book => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                image={book.image}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BookList;