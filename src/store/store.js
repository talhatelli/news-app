import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    filters: filterReducer,
  },
});

export default store;
