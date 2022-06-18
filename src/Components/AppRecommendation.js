import "../Styles/AppRecommendation.css";
function AppRecommendation({ data }) {
  return (
    <div className="appRecommendation">
      <h2>推介</h2>
      <div className="apps">
        {data &&
          data.length > 0 &&
          data.map((app) => {
            return (
              <div key={app.id}>
                <img src={app.artworkUrl100} alt={app.name} />
                <h4>{app.name} </h4>
                {app.genres &&
                  app.genres.length > 0 &&
                  app.genres.map((genere, i) => <h5 key={i}>{genere}</h5>)}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AppRecommendation;
