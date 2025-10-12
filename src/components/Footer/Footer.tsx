export const Footer = () => {
  return (
    <footer style={{
      background: '#12181e',
      color: '#ffffff',
      padding: '2rem',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <p style={{ margin: 0, fontSize: '0.875rem' }}>
        © {new Date().getFullYear()} Educational CRM. All rights reserved.
      </p>
    </footer>
  );
};
