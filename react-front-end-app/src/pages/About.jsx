import "./marketing.css";
import pfimage2 from "../images/pfimage2.jpg";

function About() {
  return (
    <div className="container">
      <div className="info-card">
        <h2>About the app</h2>
        <h3>
          About My Personal Finance, a simple and user-friendly platform
          designed to help individuals manage their finances effectively. The
          application enables users to track their income and expenses, create
          and manage budgets, monitor savings, and gain a clear understanding of
          their financial situation.
        </h3>
        <h3>
          With an easy-to-use interface, users can organize their daily
          financial activities, view summaries of their spending, and make
          informed financial decisions.
        </h3>
        <h3>
          The goal of this application is to promote better money management,
          encourage saving habits, and support users in achieving their
          short-term and long-term financial goals.
        </h3>
        <h3>
          Whether you want to monitor your monthly expenses, plan a budget, or
          improve your financial health, My Personal Finance provides the
          tools you need to stay organized and in control of your money.
        </h3>
        <ul className="feature-list">
          <li>Track income and expenses in one place</li>
          <li>Create and review monthly budgets</li>
          <li>Monitor savings goals with ease</li>
          <li>See spending patterns clearly</li>
        </ul>
        <img
          src={pfimage2}
          className="image-size"
          alt="This is an image for Tracking"
        />
      </div>
    </div>
  );
}
export default About;
