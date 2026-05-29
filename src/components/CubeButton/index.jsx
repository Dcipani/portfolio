import "./CubeButton.scss";

export default function CubeButton({
  children,
  onClick,
  size = 120,
}) {
  return (
    <button
      className="cube-button"
      onClick={onClick}
      style={{
        "--size": `${size}px`,
      }}
    >
      <span className="cube-face">
        {children}
      </span>
    </button>
  );
}