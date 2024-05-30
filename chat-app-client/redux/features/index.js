// features/index.js
import choreFeatureReducer from './chore';
import userFeatureReducer from './user';
import roomFeatureReducer from './room';
import pageFeatureReducer from './page';
import modalFeatureReducer from './modal';

import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    chore: choreFeatureReducer,
    user: userFeatureReducer,
    room: roomFeatureReducer,
    page: pageFeatureReducer,
    modal: modalFeatureReducer,
});

export default rootReducer;
