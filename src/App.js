import React, { useState, useEffect, useRef } from "react";
//Css
import "./Styles/SearchBar.css";
//Components
import SearchBar from "./Components/SearchBar";
import AppList from "./Components/AppList";
import AppRecommendation from "./Components/AppRecommendation";
import Loading from "./Components/Loading";
//function
import getData from "./Function/getData";

function App() {
  const [onLoading, setOnloading] = useState(true);
  const [searchText, setSearchText] = useState(null);
  const [appList, setAppList] = useState(null);
  const [appListNoFiltered, setAppListNoFiltered] = useState(null);
  const [appRecommendation, setAppRecommendation] = useState(null);
  const [limit, setLimit] = useState(10);
  const listInnerRef = useRef(null);

  //initialize App
  useEffect(() => {
    if (appList === null) {
      initialAppList();
    }
  }, []);

  //loadMore
  useEffect(() => {
    if (limit > 10) {
      console.log("limit", limit);
      if (!searchText || searchText === "") {
        getMoreApp(limit);
      }
    }
  }, [limit]);

  //Search
  useEffect(() => {
    if (appList && appRecommendation && searchText) {
      //Start search, keep the appList NoFiltered Version
      if (appListNoFiltered === null) {
        setAppListNoFiltered({
          appList: appList,
          appRecommendation: appRecommendation,
        });
      }
      // console.log("searchText", searchText);
      handleSearch(searchText);
    } else if (searchText === "") {
      //end Search
      setAppList(appListNoFiltered.appList);
      setAppRecommendation(appListNoFiltered.appRecommendation);
      setAppListNoFiltered(null);
    }
  }, [searchText]);

  const handleSearch = (value) => {
    let res;
    res = filter(value, appList);
    setAppList(res);
    res = filter(value, appRecommendation);
    setAppRecommendation(res);
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // console.log("reached bottom");
        if (limit !== 50) {
          setLimit((pre) => pre + 10);
        }
      }
    }
  };

  const initialAppList = async () => {
    let data = await callAPI("http://localhost:3001/getAppList", limit);
    // console.log("data", data);
    setAppList(data);
    data = await callAPI("http://localhost:3001/getAppRecommendation");
    setAppRecommendation(data);
    setOnloading(false);
  };

  const getMoreApp = async (limit) => {
    setOnloading(true);
    let data = await callAPI("http://localhost:3001/getAppList", limit);
    console.log("data", data);
    setAppList((pre) => [...pre, ...data]);
    setOnloading(false);
  };

  return (
    <div
      ref={listInnerRef}
      onScroll={onScroll}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <SearchBar searchText={searchText} handleSearch={setSearchText} />
      <AppRecommendation data={appRecommendation} />
      <AppList data={appList} />
      <Loading onLoading={onLoading} />
    </div>
  );
}

export default App;

const callAPI = async (url, limit = null) => {
  let res, err;
  [err, res] = await getData(url, limit);
  if (err) {
    console.log(err);
  }
  // console.log("data", res.data);
  if (res.data) {
    return res.data;
  }
};

const filter = (value, apps = []) => {
  let filteredAppList = [];
  filteredAppList = apps.filter((app) => {
    let name = app.name.toLowerCase();
    let target = value.toLowerCase();
    if (name.includes(target)) {
      return true;
    } else {
      return false;
    }
  });
  return filteredAppList;
};
