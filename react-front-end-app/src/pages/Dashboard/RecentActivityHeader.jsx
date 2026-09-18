import { Link } from "react-router-dom";

function RecentActivityHeader() {
  return (
    <div className="transaction-card-header">
      <h2>Recent activity</h2>
      <Link className="view-all-link" to="/transactions">
        View all
      </Link>
    </div>
  );
}

export default RecentActivityHeader;
