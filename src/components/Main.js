import React from 'react'
import {PortfolioContext} from '../context/PortfolioContext'
import {useContext, useState,useEffect} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import Spinner from './Spinner';
import Portfolio from './Portfolio';
const Main = () => {
    const { portfolioData,setPortfolioData,setLoading, loading, error,setError,setdsa_stats,dsa_stats } = useContext(PortfolioContext);
    const location = useLocation();
  console.log("location is ",location);
  const params = location.pathname.split("/");
  const username = params[params.length - 1];
  useEffect(() => {
    const fetchPortfolio = async () => {
        setLoading(true);
      try {
        console.log("username is ",username);
        const url=`${process.env.REACT_APP_BASE_URL}/${username}`;
        const dsa_url=`${process.env.REACT_APP_DSA_STATS}/${username}`;
        console.log("url is ",url);
        const dsa=await axios.get(dsa_url);
        const response = await axios.get(url);
        setdsa_stats(dsa.data.stats);
        setPortfolioData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);
  console.log("portfolioData is ",portfolioData,"dsa_stats is ",dsa_stats);
  return (
    <div>
      {
        loading ? (
          <Spinner />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <div>
            <Portfolio />
          </div>
        )
      }
    </div>
  )
}

export default Main
