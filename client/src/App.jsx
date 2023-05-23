/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
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
import Sidebar from './components/Sidebar';
import Prepare from './pages/Prepare';
import NotFound from './pages/NotFound';
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
} from './routesURL';
import useMediaQuery from './hooks/useMediaQuery';
import { store, persistor } from './store/UserSlice';
import Recycle from './pages/Recycle';
import About from './pages/AboutPage';

function App() {
	const isMobile = useMediaQuery();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSidebarOpeFirst, setIsSidebarOpeFirst] = useState(true);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GlobalStyles />
				<Header
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
					setIsSidebarOpeFirst={setIsSidebarOpeFirst}
				/>
				{!isSidebarOpeFirst && (
					<Sidebar
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
					/>
				)}
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
					<Route path={URL_PLOGGING} element={<Prepare />} />
					<Route path={URL_RECYCLE} element={<Recycle />} />
					<Route path={URL_INTRODUCTION} element={<Prepare />} />
					<Route path={URL_INTRODUCTION} element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				{!isMobile && <Footer />}
			</PersistGate>
		</Provider>
	);
}

export default App;
