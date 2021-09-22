import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { getMembers } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';
import { ways } from 'constants/constRouter';

import Header from 'components/common/Header';
import Main from 'components/common/Main';
import Footer from 'components/common/Footer';
import MainPage from 'pages/MainPage';
import Error404 from 'pages/Error404';
import AdminLobby from 'pages/AdminLobby';
import TeamMembers from 'pages/TeamMembers';
import Chat from 'components/common/Chat';

const { HOME, ADMIN, USER, ERROR, CHAT } = ways;

const Routers: React.FC = (): JSX.Element => {
	const { isAdmin } = useTypedSelector<User>(getMembers);
	const { roomNumber } = useTypedSelector<User>(getMembers);

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
					<Route path={CHAT} component={Chat} />
					<Route path={ERROR} component={Error404} />
				</Switch>
			</Main>
			<Footer />
		</>
	);
};

export default Routers;
