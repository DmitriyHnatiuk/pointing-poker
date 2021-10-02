import React from 'react';

import { getModal } from 'redux/reducer/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Modal } from 'redux/reducer/modalReducer/types';

import Modals from 'components/common/Modals';

// import InstallTimer from 'components/common/Timer/InstallTimer';
import Members from './Members';
import GameStatus from './GameStatus';
import Issues from './Issues';
import AdminMenu from './AdminMenu';

import styles from './index.module.scss';

const AdminLobby: React.FC = (): JSX.Element => {
	const { openModal } = useTypedSelector<Modal>(getModal);

	return (
		<div className={styles.adminLobby}>
			<GameStatus />
			<Members />
			<Issues />
			{/* <InstallTimer /> */}
			<AdminMenu />
			{openModal && <Modals />}
		</div>
	);
};

export default AdminLobby;
