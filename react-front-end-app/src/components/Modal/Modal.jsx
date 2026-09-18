function Modal({ onClose, className = "", children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation keeps clicks inside the box from closing it */}
      <div
        className={`modal-content ${className}`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
