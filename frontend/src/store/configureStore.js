import {combineReducers} from "redux";
import createSagaMiddleware from "redux-saga";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({

});

const persistedState = loadFromLocalStorage();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    sagaMiddleware,
    devTools: true,
    preloadedState: persistedState
});

// sagaMiddleware.run(rootSagas);

store.subscribe(() => {
    saveToLocalStorage({

    })
});