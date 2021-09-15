import React from 'react';

import GameStatus from './GameStatus';
import Issues from './Issues';
import Members from './Members';
import AdminMenu from './AdminMenu';

import styles from './styles.module.scss';

const AdminLobby: React.FC = (): JSX.Element => {
	return (
		<div className={styles.adminLobby}>
			<GameStatus />
			<Members />
			<Issues />
			<AdminMenu />
		</div>
	);
};

export default AdminLobby;
