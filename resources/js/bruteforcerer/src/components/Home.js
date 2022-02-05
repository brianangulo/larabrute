import React, { useEffect } from "react";
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

function Home(props) {
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
    console.log("handle mobile called!");
  };

  //Adding listener for window resizing by user
  useEffect(
   () => {window.addEventListener("resize", handleIsMobile())}
  )

  //Keeping it all together for better perfomance bruteforcing algorithm on submit
  const handleSubmit = () => {
    console.log(password);
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
          console.log(
            `The last result is: ${result} and time is ${(
              bfEnd - bfInit
            ).toFixed(2)}ms`
          );
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