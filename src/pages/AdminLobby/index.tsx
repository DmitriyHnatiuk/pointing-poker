import React from 'react';
import { Redirect } from 'react-router-dom';

import { getModal, getPath } from 'redux/reducer/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Rout } from 'redux/reducer/routerReducer/types';
import { Modal } from 'redux/reducer/modalReducer/types';

import Modals from 'components/common/Modals';
import { ways } from 'constants/constRouter';
import { URL } from 'constants/API';

import InstallTimer from 'components/common/Timer/InstallTimer';
import Members from './Members';
import GameStatus from './GameStatus';
import Issues from './Issues';
import AdminMenu from './AdminMenu';

import styles from './index.module.scss';

const AdminLobby: React.FC = (): JSX.Element => {
	const { path } = useTypedSelector<Rout>(getPath);
	const { openModal } = useTypedSelector<Modal>(getModal);

	return (
		<div className={styles.adminLobby}>
			{path && <Redirect to={path} />}
			<GameStatus />
			<Members />
			<Issues />
			<InstallTimer />
			<AdminMenu />
			{openModal && <Modals />}
		</div>
	);
};

export default AdminLobby;
