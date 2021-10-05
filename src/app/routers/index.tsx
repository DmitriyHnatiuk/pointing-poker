import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { getMembers } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';
import { ways } from 'constants/constRouter';

import MainPage from 'pages/MainPage';
import GamePage from 'pages/GamePage';
import Error404 from 'pages/Error404';
import Main from 'components/common/Main';
import AdminLobby from 'pages/AdminLobby';
import TeamMembers from 'pages/TeamMembers';
import ResultPage from 'pages/ResultPage';
import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import Loading from '../../components/Loading';

const { HOME, ADMIN, USER, GAME, ERROR, RESULT } = ways;

const Routers: React.FC = (): JSX.Element => {
	const { login, loading } = useTypedSelector<User>(getMembers);
	const { isAdmin } = useTypedSelector<User>(getMembers);
	const { roomNumber } = useTypedSelector<User>(getMembers);
	return (
		<>
			<Header />
			<Main>
				{loading ? (
					<Loading />
				) : (
					<Switch>
						<Route exact path={HOME} component={MainPage} />
						{isAdmin && <Route path={ADMIN} component={AdminLobby} />}
						{!isAdmin && roomNumber && (
							<Route exact path={USER} component={TeamMembers} />
						)}
						{login && <Route exact path={GAME} component={GamePage} />}
						<Route path={RESULT} component={ResultPage} />
						<Route path={ERROR} component={Error404} />
					</Switch>
				)}
			</Main>
			<Footer />
		</>
	);
};

export default Routers;
