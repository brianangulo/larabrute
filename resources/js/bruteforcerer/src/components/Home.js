import React, { useEffect, useCallback } from "react";
import { useFetch } from "../hooks";
import { ENDPOINTS } from "../api/endpoints";
import { FETCH_METHODS } from "../hooks";
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

  const handleSubmitScore = useCallback(async (word, time, attempts = 0) => {
    // if attempted 3 times stop
    const MAX_ATTEMPTS = 3;
    if (attempts > MAX_ATTEMPTS) return console.error('Unable to submit score');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response = await useFetch(FETCH_METHODS.POST, ENDPOINTS.addScore, {
      word: word,
      time: time,
    }).catch(err => {
      console.error('Error at handleSubmit', err);
      return null;
    });
    // retrying if failed
    if (!response.ok) {
      console.log('retrying', attempts);
      handleSubmitScore(word, time, attempts + 1)
    }
  }, []);

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
    () => { window.addEventListener("resize", handleIsMobile) }
  )

  //Keeping it all together for better performance bruteforcing algorithm on submit
  const handleSubmit = () => {
    //Controlling toggle for reveal text
    dispatch(setToggleReveal(true));
    //Setting timer
    const bfInit = performance.now();
    bruteforce(
      chars,
      (result) => {
        if (result === password) {
          const bfEnd = performance.now();
          dispatch(setEnteredPas(result));
          const timeTaken = (bfEnd - bfInit).toFixed(2);
          dispatch(setTimer(timeTaken));
          handleSubmitScore(result, timeTaken);
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
