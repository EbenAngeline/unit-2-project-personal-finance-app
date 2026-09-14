import "./marketing.css";
import contactusimg from "../images/contactus-img.jpg";
function Contact() {
  return (
    <div className="container">
      <div className="info-card">
        <h2>Contact us</h2>
        <h3>
          We're here to help you on your financial journey. Whether you have
          questions about the app, need technical support, or want to share
          feedback, our team is ready to assist.
        </h3>
        <ul className="feature-list">
          <li>Email: support@yourfinanceapp.com</li>
          <li>Phone: +1 (123) 456-7890</li>
          <li>Hours: Monday - Friday, 9:00 AM - 6:00 PM</li>
          <li>Address: 123 Finance Street, New York, NY 10001</li>
        </ul>
      </div>
      <img
        src={contactusimg}
        className="image-size"
        alt="This is  an image for contact"
      />
    </div>
  );
}
export default Contact;
