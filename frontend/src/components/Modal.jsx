export default function Modal({ title, onCancel, children }) {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>{title}</h3>
                {children}
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
