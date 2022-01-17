import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers';

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2,
	whitelist: [
		'updateCharacter',
		'authenticateUser'
	]
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	pReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
export default store;