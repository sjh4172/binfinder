/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalStyles from './styles/index';
import MapPage from './pages/mapPage';
import Login from './pages/login';
import Signup from './pages/signup';
import UserInfo from './pages/UserInfo';
import EditUserInfo from './pages/EditUserInfo';
import Community from './pages/Community';
import CommunityDetail from './pages/CommunityDetail';
import CommunityEdit from './pages/CommunityEdit';
import Header from './components/Header';
import Footer from './components/Footer';
import Prepare from './pages/Prepare';
import NotFound from './pages/NotFound';
import MainPage from './pages/MianPage';
import PloggingCommunity from './pages/Plogging';
import PloggingEdit from './pages/PlogginfEdit';
import PloggingDetail from './pages/PloggingDetail';
import {
	URL_MAP,
	URL_LOGIN,
	URL_SIGNUP,
	URL_MYPAGE,
	URL_EDITMYPAGE,
	URL_POST,
	URL_POSTDETAIL,
	URL_WRITEPOST,
	URL_PLOGGING,
	URL_INTRODUCTION,
	URL_RECYCLE,
	URL_MAIN,
	URL_PLOGGINGDETAIL,
	URL_WRITEPLOGGING,
} from './routesURL';
import { store, persistor } from './store/UserSlice';
import Recycle from './pages/Recycle';
import About from './pages/AboutPage';

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GlobalStyles />
				<Header />
				<Routes>
					<Route path={URL_MAP} element={<MapPage />} />
					<Route path={URL_LOGIN} element={<Login />} />
					<Route path={URL_SIGNUP} element={<Signup />} />
					<Route path={URL_MYPAGE} element={<UserInfo />} />
					<Route path={URL_EDITMYPAGE} element={<EditUserInfo />} />
					<Route path={URL_POST} element={<Community />} />
					<Route path={URL_POSTDETAIL} element={<CommunityDetail />} />
					<Route path="/comments/:commentId" element={<CommunityDetail />} />
					<Route path={URL_WRITEPOST} element={<CommunityEdit />} />
					<Route path={URL_PLOGGING} element={<PloggingCommunity />} />
					<Route path={URL_PLOGGINGDETAIL} element={<PloggingDetail />} />
					<Route path={URL_WRITEPLOGGING} element={<PloggingEdit />} />
					<Route path={URL_RECYCLE} element={<Recycle />} />
					<Route path={URL_INTRODUCTION} element={<About />} />
					<Route path={URL_MAIN} element={<MainPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</PersistGate>
		</Provider>
	);
}

export default App;
