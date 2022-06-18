import "../Styles/AppList.css";
import React from "react";

function AppList({ data }) {
  return (
    <div className="appList">
      {data &&
        data.length > 0 &&
        data.map((app, index) => {
          let Star = () => {
            let star = [];
            for (let i = 0; i < parseInt(app.averageUserRating); i++) {
              star.push(<React.Fragment key={"star" + i}>★</React.Fragment>);
            }
            for (let j = 0; j < 5 - parseInt(app.averageUserRating); j++) {
              star.push(
                <React.Fragment key={"emptyStar" + j}>☆</React.Fragment>
              );
            }
            return <span>{star}</span>;
          };
          return (
            <div key={app.id} className="app">
              <div className="rating">
                <h2>{index + 1}</h2>
              </div>
              <div className="icon">
                <img src={app.artworkUrl100} alt={app.name} />
              </div>
              <div className="description">
                <h4>{app.name} </h4>
                {app.genres &&
                  app.genres.length > 0 &&
                  app.genres.map((genere, i) => <h5 key={i}>{genere}</h5>)}

                <h5>
                  <Star />
                  {`(${app.userRatingCountForCurrentVersion})`}
                </h5>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AppList;
