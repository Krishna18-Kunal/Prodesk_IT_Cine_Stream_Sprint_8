function Loading({ text = "Loading movies..." }) {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

export default Loading;