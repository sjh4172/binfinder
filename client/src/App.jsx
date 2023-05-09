import { Route, Routes } from 'react-router-dom';
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
import {
	URL_MAP,
	URL_LOGIN,
	URL_SIGNUP,
	URL_MYPAGE,
	URL_EDITMYPAGE,
	URL_POST,
	URL_POSTDETAIL,
	URL_WRITEPOST,
} from './routesURL';

function App() {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Routes>
				<Route path={URL_MAP} element={<MapPage />} />
				<Route path={URL_LOGIN} element={<Login />} />
				<Route path={URL_SIGNUP} element={<Signup />} />
				<Route path={URL_MYPAGE} element={<Mypage />} />
				<Route path={URL_EDITMYPAGE} element={<EditMyPage />} />
				<Route path={URL_POST} element={<Community />} />
				<Route path={URL_POSTDETAIL} element={<CommunityDetail />} />
				<Route path={URL_WRITEPOST} element={<CommunityEdit />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
