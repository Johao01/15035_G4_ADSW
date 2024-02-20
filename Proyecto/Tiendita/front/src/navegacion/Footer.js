import React from 'react';
import './footer.css'; // Importamos el archivo de estilos CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Tiendita &copy; {new Date().getFullYear()}</p>
        <p>Contacto:  webGroup@espe.edu.ec</p>
      </div>
    </footer>
  );
};

export default Footer;
