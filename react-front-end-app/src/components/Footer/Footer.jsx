import "../common.css";

function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} My Finance App</div>
    </footer>
  );
}

export default Footer;
