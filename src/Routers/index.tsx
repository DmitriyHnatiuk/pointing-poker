import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from 'components/common/Header/Header';
import Main from 'components/common/Main';
import Footer from 'components/common/Footer/Footer';
import Chat from 'components/common/Chat';

import MainPage from 'pages/MainPage';
import Error404 from 'pages/Error404';
import AdminLobby from 'pages/AdminLobby';
import TeamMembers from 'pages/TeamMembers';

const Routers: React.FC = (): JSX.Element => {
	const name = useSelector<{ userName: string }>((state) => state.userName);
	const room = useSelector<{ room: string }>((state) => state.room);
	// const isAdmin = useSelector<{ isAdmin: string }>((state) => state.isAdmin);
	const isLogin = name && room;
	const isAdmin = true;

	return (
		<>
			<Header />
			<Main>
				<Switch>
					<Route exact path="/" component={MainPage} />
					{/* {isLogin && <Route exact path="/lobby" component={UserLobby} />} */}
					{isAdmin && <Route path="/admin" component={AdminLobby} />}
					<Route exact path="/chat" component={Chat} />
					<Route exact path="/members" component={TeamMembers} />
					<Route path="*" component={Error404} />
				</Switch>
			</Main>
			<Footer />
		</>
	);
};

export default Routers;
