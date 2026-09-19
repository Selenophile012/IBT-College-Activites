function Field({ id, label, error, touched, children }) {
  const showError = touched && !!error;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>

      {children(showError)}

      {showError && (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;
