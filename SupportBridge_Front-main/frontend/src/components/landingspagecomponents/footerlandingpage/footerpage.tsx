import "./footerpage.css";

const FooterPage = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h2>Support Ticket</h2>
          <p>
           Een professionele oplossing voor al jouw ICT- en SD-vragen. Eenvoudig. Efficiënt. Betrouwbaar.
          </p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: support@supportticket.nl</p>
          <p>Tel: +31 6 12345678</p>
          <p>Ma - Vr: 09:00 - 17:00</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Support Ticket. Alle rechten voorbehouden.
      </div>
    </footer>
  );
};

export default FooterPage;
