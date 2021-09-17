import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/store';
import { ways } from 'constants/constRouter';

import Header from 'components/common/Header/Header';
import Main from 'components/common/Main';
import Footer from 'components/common/Footer/Footer';
import MainPage from 'pages/MainPage';
import Error404 from 'pages/Error404';
import AdminLobby from 'pages/AdminLobby';
import TeamMembers from 'pages/TeamMembers';

const { HOME, ADMIN, USER, ERROR } = ways;

const Routers: React.FC = (): JSX.Element => {
	const isAdmin = useSelector<RootState>((state) => state.userReducer.isAdmin);
	const roomNumber = useSelector<RootState>(
		(state) => state.userReducer.roomNumber
	);

	return (
		<>
			<Header />
			<Main>
				<Switch>
					<Route exact path={HOME} component={MainPage} />
					{isAdmin && <Route path={ADMIN} component={AdminLobby} />}
					{!isAdmin && roomNumber && (
						<Route exact path={USER} component={TeamMembers} />
					)}
					<Route path={ERROR} component={Error404} />
				</Switch>
			</Main>
			<Footer />
		</>
	);
};

export default Routers;
