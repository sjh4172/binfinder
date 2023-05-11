import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import GlobalStyles from './styles/index';
import MapPage from './pages/mapPage';
import Login from './pages/login';
import Signup from './pages/signup';
import Mypage from './pages/mypage';
import EditMyPage from './pages/editmypage';
import Community from './pages/Community';
import CommunityDetail from './pages/CommunityDetail';
import CommunityEdit from './pages/CommunityEdit';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Prepare from './pages/Prepare';
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
	const isMobile = useMediaQuery('(max-width: 768px)');
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	return (
		<>
			<GlobalStyles />
			<Header
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Routes>
				<Route path={URL_MAP} element={<MapPage />} />
				<Route path={URL_LOGIN} element={<Login />} />
				<Route path={URL_SIGNUP} element={<Signup />} />
				<Route path={URL_MYPAGE} element={<Mypage />} />
				<Route path={URL_EDITMYPAGE} element={<EditMyPage />} />
				<Route path={URL_POST} element={<Community />} />
				<Route path={URL_POSTDETAIL} element={<CommunityDetail />} />
				<Route path={URL_WRITEPOST} element={<CommunityEdit />} />
				<Route path={URL_PLOGGING} element={<Prepare />} />
				<Route path={URL_NOTICE} element={<Prepare />} />
				<Route path={URL_INTRODUCTION} element={<Prepare />} />
			</Routes>
			{!isMobile && <Footer />}
		</>
	);
}
// 지금 깃상황
// add, commmit-> push 안됨. Everything up-to-date 계속

export default App;
