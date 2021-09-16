import React from 'react';

import Members from 'components/common/Members';
import GameStatus from './GameStatus';
import Issues from './Issues';
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
