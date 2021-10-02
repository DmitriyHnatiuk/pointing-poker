import React from 'react';
import { useDispatch } from 'react-redux';

import socketCreator, { UNSUBSCRIBE } from 'redux/thunk';

import { useTypedSelector } from 'hooks/useTypedSelector';

import ActiveTimer from 'components/common/Timer/ActiveTimer';
import MasterCard from 'components/common/MasterCard';
import MyButton from 'components/common/MyButton';
import Issues from 'pages/AdminLobby/Issues';

import Modals from 'components/common/Modals';

import { Modal } from 'redux/reducer/modalReducer/types';
import { btnValue } from 'constants/commonComponents';

import { getMembers, getModal } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';

import styles from './index.module.scss';

import UsersScore from './UsersScore';
import Statistics from './Statistics';
import ActiveTimer from '../../components/common/Timer/ActiveTimer';

const { STOP_GAME, EXIT } = btnValue;

const GamePage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const { openModal } = useTypedSelector<Modal>(getModal);
	const { isAdmin } = useTypedSelector<User>(getMembers);
	const { admin } = useTypedSelector<User>(getMembers);
	const setExit = () => dispatch(socketCreator({ type: UNSUBSCRIBE }));

	return (
		<div className={styles.container}>
			<div className={styles.menuField}>
				<h1>Issues string</h1>
				<div className={styles.menu}>
					<MasterCard admin={admin} style={styles.masterCard} />
					{isAdmin && <MyButton value={STOP_GAME} />}
					{!isAdmin && <MyButton value={EXIT} onclick={setExit} />}
				</div>
				<div className={styles.settings}>
					<ul className={styles.issues}>
						<li>
							<Issues />
						</li>
					</ul>
					{isAdmin && (
						<div className={styles.settingsControl}>
							<ActiveTimer />
						</div>
					)}
				</div>
				{isAdmin && <Statistics />}
			</div>
			<UsersScore />
			{openModal && <Modals />}
		</div>
	);
};

export default GamePage;
