import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/account";

export default configureStore({
  reducer: {
    account: accountReducer,
  },
});
