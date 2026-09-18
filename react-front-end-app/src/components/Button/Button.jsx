import "../common.css";

function Button({
  className = "",
  type = "button",
  children,
  ...rest
}) {
  const classes = `btn ${className}`.trim();

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
