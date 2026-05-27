import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import topicReducer from "./slices/topicSlice";
import progressReducer from "./slices/progressSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicReducer,
    progress: progressReducer,
  },
});

export default store;
