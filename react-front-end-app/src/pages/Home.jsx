import "./marketing.css";
import pfimage1 from "../images/pfimage1.jpg";

function HomePage() {
  return (
    <div className="container">
      <div className="hero-card">
        <h2> Welcome to Your Personal Finance Dashboard</h2>
        <h3>Take control of your money</h3>
        <div className="hero-card1">
          <h3>
            Take control of your finances with an all-in-one platform designed
            to help you manage your money smarter. Track your income and
            expenses, create personalized budgets, monitor savings goals, and
            gain valuable insights into your spending habits—all in one place.
            Whether you're planning for the future or managing everyday
            expenses, our app gives you the tools and clarity you need to make
            confident financial decisions and achieve your goals.
          </h3>
        </div>
        <ul className="hero-highlights">
          <li>Budget smart</li>
          <li>See spending clearly</li>
          <li>Stay on track</li>
        </ul>

        <img
          src={pfimage1}
          className="image-size"
          alt="This is an image for control the finances"
        />
      </div>
    </div>
  );
}
export default HomePage;
