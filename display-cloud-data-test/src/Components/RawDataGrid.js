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
const[dataSource, setDataSource] = useState([]);
const [hasMore, setHasMore] = useState(true);
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
    console.log(
      "data",
      loadData.map((item) => item)
    );
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
    
    {/* <InfiniteScroll 
    dataLength={loadData.length}
    next={getElanchoData}
    hasMore={hasMore}
    loader={<LoadingCard />}
    endMessage={<p>You are all set!</p>}
    pullDownToRefreshThreshold={50}
    > */}
      <div className="wrapper">
    {loadData.slice(0, 50).map((item, index) => {       
      return (
        
          <div className="gridBox">
            <strong>{index+1}</strong>
          <h1>Service - {item.ServiceName}</h1>
          <div>
            <span className="">
              Resource Group - {item.ResourceGroup}
            </span>
          </div>
          <h3 className="">
            Cost: {item.Cost}
          </h3>
          <h4>Date: {item.Date}</h4>
          <h5>Measureing Unit: {item.UnitOfMeasure}</h5>
          <h6>{item.Location}</h6>
          <p className="">
            Location : {item.ResourceLocation}
          </p>
        </div>       
    
      );
    })}
    </div>
    {/* </InfiniteScroll> */}
    
  </div>
);
}



