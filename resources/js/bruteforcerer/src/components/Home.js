import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPassword,
  setTimer,
  setEnteredPas,
  setToggleReveal,
  setIsMobile,
} from "../redux/slicer";
import { chars } from "../shared/chars";
import Content from "./HomeContent";

const bruteforce = require("bruteforcejs");

function Home() {
  //dispatcher
  const dispatch = useDispatch();
  //state variables
  const password = useSelector((state) => state.slicer.password);
  const timer = useSelector((state) => state.slicer.timer);
  const enteredPass = useSelector((state) => state.slicer.enteredPass);
  const toggleReveal = useSelector((state) => state.slicer.toggleReveal);
  const isMobile = useSelector((state) => state.slicer.isMobile);
  
  //handles change on the form
  const handleChange = (value) => {
    dispatch(setPassword(value.target.value));
  };

  //handles screen resizing behavior
  const handleIsMobile = () => {
    dispatch(setIsMobile(window.innerWidth < 500))
  };

  //Adding listener for window resizing by user
  useEffect(
    () => { window.addEventListener("resize", handleIsMobile()) }
  )

  //bruteforcing on the backend
  const phpBruteforcing = async password => {
    try {
      const endpoint = '/api/brute';
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      const body = {
        password: password,
      };
      const requestInit = {
        method: 'POST',
        cache: 'no-cache',
        headers: headers,
        body: body,
      }
      const response = await fetch(endpoint, requestInit);
      const timer = await response.json();
      
      return timer;
    } catch (error) {
      console.error(error)
    }
  }

  //Keeping it all together for better perfomance bruteforcing algorithm on submit
  const handleSubmit = () => {
    //Controling toggle for reveal text
    dispatch(setToggleReveal(true));
    //Setting timer
    const bfInit = performance.now();
    bruteforce(
      chars,
      (result) => {
        if (result === password) {
          const bfEnd = performance.now();
          dispatch(setEnteredPas(result));
          dispatch(setTimer((bfEnd - bfInit).toFixed(2)));
          return true;
        }
      },
      4
    );
    dispatch(setPassword(""));
  };

  return (
    <Content
      handleChange={handleChange}
      password={password}
      handleSubmit={handleSubmit}
      timer={timer}
      enteredPass={enteredPass}
      toggleReveal={toggleReveal}
      submitToggle={false}
      isMobile={isMobile}
    />
  );
}

export default Home;