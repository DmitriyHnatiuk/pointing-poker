import React from 'react';
import { Redirect } from 'react-router-dom';

import { getPath } from 'redux/reducer/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Rout } from 'redux/reducer/routerReducer/types';

import Members from './Members';
import GameStatus from './GameStatus';
import Issues from './Issues';
import AdminMenu from './AdminMenu';

import styles from './index.module.scss';

const AdminLobby: React.FC = (): JSX.Element => {
	const { path } = useTypedSelector<Rout>(getPath);

	return (
		<div className={styles.adminLobby}>
			{path && <Redirect to={path} />}
			<GameStatus />
			<Members />
			<Issues />
			<AdminMenu />
		</div>
	);
};

export default AdminLobby;
