const BookCard = ({ title, author, description, image }) => {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
    }}>
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#2c3e50' }}>{title}</h3>
        <p style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '10px' }}><strong>Author:</strong> {author}</p>
        <p style={{ fontSize: '14px', color: '#666' }}>{description}</p>
      </div>
    </div>
  );
};

export default BookCard;