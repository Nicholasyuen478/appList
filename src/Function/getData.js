import axios from "axios";

export default async function getData(url, data) {
  // console.log("url", url);
  let err, res;
  [err, res] = await axios.get(url, { params: { limit: data } }).then((res) => {
    console.log("res", res);
    if (res.data.result === "failed") {
      return ["failed", null];
    } else {
      return [null, res.data];
    }
  });

  return [err, res];
}
