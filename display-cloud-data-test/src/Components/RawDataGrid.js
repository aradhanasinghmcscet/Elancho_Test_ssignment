// import clsx from "clsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "../App.css";
import { LoadingCard } from "./loadingElancho";
import { indexOf } from "lodash";

export const RawDataGrid = () => {
  const apiUrl = "https://engineering-task.elancoapps.com";
  const [loadData, setLoadData] = useState([]);
  const[page, setPage]=useState(1);
  const[hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const getElanchoData = async (url) => {
    try {
      const res = await axios.get(url);
      // setLoadData(res.data);
      // setTimeout(() => {
      // console.warn("concat data",res.data.concat(Array.from({length:100})))
      // setLoadData(res.data);
      // .concat(Array.from({length:20}))
      // }, 1000);
      const newDataSet = await res.data;
      setLoadData((loadData) => [...loadData, ...newDataSet]);  
      setPage(page + 1);

      if (loadData.length >= 50) {
        setHasMore(false);
        return;
      }
    
      // a fake async api call
      // setTimeout(() => {
      //   setLoadData(loadData.concat(Array.from({ length: 20 }))        );
      // }, 500);
    } catch (err) {
      setError(err.message);
    }
  };
  // const fethchMoreData = () =>{
  //   setTimeout(() => {
  //     setDataSource(loadData.concat(Array.from({length:20})))
  //   }, 1000);
  // }
  useEffect(() => {
    getElanchoData(`${apiUrl}/api/raw`);
  }, []);

  return (
    <div>
      <h1>Elancho Raw Data Display</h1>
      {error !== "" && <h2 className="error">{error}</h2>}

      <InfiniteScroll
        dataLength={loadData.length}
        next={getElanchoData}
        hasMore={hasMore}
        loader={<h3>Loding...</h3>}
        endMessage={<p>You are all set!</p>}
        pullDownToRefreshThreshold={20}
        className="wrapper"
      >
        {/* <div className="wrapper"> */}
          {loadData
            // .slice(0, 50)
            .map((item, index) => {
              let taglink = Object.keys(item.Tags);
              return (
                <div className="gridBox" id={index + 1}>
                  <strong>
                    {index + 1} - {item.InstanceId}
                  </strong>
                  <h1>Service - {item.ServiceName}</h1>
                  <div>
                    <span className="">
                      Resource Group - {item.ResourceGroup}
                    </span>
                  </div>
                  <h3 className="">Cost: {item.Cost}</h3>
                  <h4>Date: {item.Date}</h4>
                  <h5>Measureing Unit: {item.UnitOfMeasure}</h5>
                  <h6>Location : {item.Location}</h6>
                  <p className="">
                    Resource Location : {item.ResourceLocation}
                  </p>
                  <ul>
                    {/* <li>
                      Tags: <a href="#">{taglink}</a>
                    </li> */}
                    Tags: {taglink.map((tags)=><li><span>{tags}</span></li>)}
                    {/* {console.log(item.Tags.map((tags) => <li>{tags}</li>))} */}
                  </ul>
                </div>
              );
            })}
        {/* </div> */}
      </InfiniteScroll>
    </div>
  );
};
