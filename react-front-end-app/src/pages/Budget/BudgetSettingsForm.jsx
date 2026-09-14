import { useState } from "react";
import Button from "../../components/Button/Button";

function BudgetSettingsForm({ budgetPeriod, onSave, onClose }) {
  const [period, setPeriod] = useState(budgetPeriod);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(period);
  };

  return (
    <div className="budget-settings">
      <h2>Edit Budget Settings</h2>
      <p>Update your budget tracking period.</p>

      <form className="budget-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label className="field-label">Period</label>
          <div className="radio-buttons">
            <label
              className={`radio-button ${period === "Monthly" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="budgetPeriod"
                value="Monthly"
                checked={period === "Monthly"}
                onChange={() => setPeriod("Monthly")}
              />
              <span>Monthly</span>
            </label>
            <label
              className={`radio-button ${period === "Weekly" ? "active" : ""}`}
            >
              <input
                type="radio"
                name="budgetPeriod"
                value="Weekly"
                checked={period === "Weekly"}
                onChange={() => setPeriod("Weekly")}
              />
              <span>Weekly</span>
            </label>
          </div>
        </div>

        <div className="form-action">
          <Button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="save-button">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
export default BudgetSettingsForm;
