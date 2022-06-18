import "../Styles/Loading.css";

function Loading({ onLoading }) {
  return (
    <>
      {onLoading && (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default Loading;
