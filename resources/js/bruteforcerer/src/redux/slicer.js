import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "slicer",
    initialState: {
        password: "",
        timer: "",
        enteredPass: "",
        toggleReveal: false,
        isMobile: false,
    },
    reducers: {
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setTimer: (state, action) => {
            state.timer = action.payload
        },
        setEnteredPas: (state, action) => {
            state.enteredPass = action.payload
        },
        setToggleReveal: (state, action) => {
            state.toggleReveal = action.payload
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload
        }
    }
})

export const { setPassword, setTimer, setEnteredPas, setToggleReveal, setIsMobile } =
  slice.actions;

export default slice.reducer