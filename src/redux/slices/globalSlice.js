import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "global",
  initialState: {
    isLoading: true,
    isLoggedIn: false,
  },
  reducers: {
    setGlobal: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setGlobal } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const getGlobal = (state) => state.global;

export default slice.reducer;
