import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './global.css';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import SelectCharacter from './pages/SelectCharacter';
import CreateCharacter from './pages/CreateCharacter';
import MainStory from './pages/MainStory';
import PageNotFound from './pages/PageNotFound';

const App = () => {
	return (
		<Suspense fallback={Login}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/account" element={<CreateAccount/>} />
					<Route path="/select" element={<SelectCharacter/>} />
					<Route path="/create" element={<CreateCharacter/>} />
					<Route path="/play" element={<MainStory/>} />
					<Route path="*" element={<PageNotFound/>} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	);
};

export default App;
