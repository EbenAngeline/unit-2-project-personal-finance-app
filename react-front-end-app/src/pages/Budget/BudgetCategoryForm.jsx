import { useState } from "react";
import Button from "../../components/Button/Button";

function BudgetCategoryForm({ categoryName, limit, onSave, onClose }) {
  const [amount, setAmount] = useState(String(limit));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(Number(amount));
  };

  return (
    <div className="budget-settings">
      <h2>Edit {categoryName} Limit</h2>
      <p>Update the monthly limit for this category.</p>

      <form className="budget-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="categoryLimit" className="field-label">
            Limit
          </label>
          <div className="input-with-icon">
            <span className="symbol">$</span>
            <input
              type="number"
              id="categoryLimit"
              min="0.01"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
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
export default BudgetCategoryForm;
