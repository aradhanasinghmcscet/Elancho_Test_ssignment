// import clsx from "clsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Draggable from 'react-draggable';

import "../App.css";

export const RawDataGrid = () => {
  const apiUrl = "https://engineering-task.elancoapps.com";
  const [loadData, setLoadData] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(null);
  const [postsPerPage, setPostPerPage] = useState(351);

  const getElanchoData = async (url) => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      const newDataSet = await res.data;
      setLoadData((loadData) => [...loadData, ...newDataSet]);
      setLoading(false)
    } catch (err) {
      setError(err.message);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(loadData.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = loadData.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    getElanchoData(`${apiUrl}/api/raw`);
  }, []);

  const setPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div>
      <h1>Elancho Raw Data Display</h1>
      {error !== "" && <h2 className="error">{error}</h2>}
       <div className="w-full flex justify-around pagination-container">
          {pageNumbers.map((pageNum, index) => (
            <span
              key={index}
              className={
                pageNum === currentPage
                  ? "pagintion-item"
                  : "pagintion-item"
              }
              onClick={() => {
                setPage(pageNum);
              }}
            >
              {pageNum}
            </span>
          ))}
        </div>
      <div className="wrapper auto-fill">
        {loading && <h4 className="load">Loading...</h4>}
        {currentPosts
          // .slice(0, 50)
          .map((item, index) => {
            let taglink = Object.keys(item.Tags);
            return (
              <Draggable>
              <div className="gridBox" id={index + 1}>
                <strong>
                  {/* {index + 1}*/}
                  ID - {item.InstanceId} 
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
                <p className="">Resource Location : {item.ResourceLocation}</p>
                <ul>
                  {/* <li>
                      Tags: <a href="#">{taglink}</a>
                    </li> */}
                  Tags:{" "}
                  {taglink.map((tags) => (
                    <li>
                      <span>{tags}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </Draggable>
            );
          })}
      </div>
    </div>
  );
};
