import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
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
	URL_NOTICE,
	URL_INTRODUCTION,
} from './routesURL';
import useMediaQuery from './hooks/useMediaQuery';

function App() {
	const isMobile = useMediaQuery();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSidebarOpeFirst, setIsSidebarOpeFirst] = useState(true);

	return (
		<>
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
				<Route path={URL_WRITEPOST} element={<CommunityEdit />} />
				<Route path={URL_PLOGGING} element={<Prepare />} />
				<Route path={URL_NOTICE} element={<Prepare />} />
				<Route path={URL_INTRODUCTION} element={<Prepare />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			{!isMobile && <Footer />}
		</>
	);
}

export default App;
