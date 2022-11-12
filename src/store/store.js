import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";

//middle ware is kind of like little library helper that runs  before
//an action hits the reducer

//currying a function that returns back you another function

// It's really just a function generator
//  and it allows us to create reusable function.

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
].filter(Boolean);
// Composes single-argument functions from right to left. The rightmost function can take multiple arguments as it provides the
// signature for the resulting composite function.
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

//passing this store to the provider which we get from react-redux
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
