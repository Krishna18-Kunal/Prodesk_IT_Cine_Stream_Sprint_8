function Loading({
  text = "Loading movies...",
}) {
  return (
    <div
      className="loading"
      role="status"
      aria-live="polite"
    >

      <div className="loading-spinner">
        <div className="spinner" />
      </div>

      <p>{text}</p>

    </div>
  );
}

export default Loading;
