const axios = require("axios");

//get the app Details function
const getInformation = async (apps) => {
  let newAppList = [];

  //get the genres for each app
  for (let app of apps) {
    let callBack = await axios.get(
      `https://itunes.apple.com/hk/lookup?id=${app.id}`
    );
    let appDetail = callBack.data.results[0];
    console.log("appDetail",appDetail)
    if (appDetail) {
      let { averageUserRating, genres, userRatingCountForCurrentVersion } =
        appDetail;
      newAppList.push({
        ...app,
        genres: genres,
        averageUserRating: averageUserRating,
        userRatingCountForCurrentVersion: userRatingCountForCurrentVersion,
      });
    } else {
      newAppList.push({
        ...app,
      });
    }
  }

  return newAppList;
};

module.exports = { getInformation };
