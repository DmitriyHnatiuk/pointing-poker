import React from 'react';
import { useDispatch } from 'react-redux';

import socketCreator, { GET_RESULT, UNSUBSCRIBE } from 'redux/thunk';

import { useTypedSelector } from 'hooks/useTypedSelector';

import ActiveTimer from 'components/common/Timer/ActiveTimer';
import MasterCard from 'components/common/MasterCard';
import MyButton from 'components/common/MyButton';
import UsersScore from 'pages/GamePage/UsersScore';
import Statistics from 'pages/GamePage/Statistics';
import RenderCards from 'pages/GamePage/RenderCards';
import Issues from 'pages/AdminLobby/Issues';

import Modals from 'components/common/Modals';

import { Game } from 'redux/reducer/gameSettingReducer/types';
import { Modal } from 'redux/reducer/modalReducer/types';
import { btnValue } from 'constants/commonComponents';

import { getMembers, getModal, getGame } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';

import styles from './index.module.scss';

const { STOP_GAME, EXIT } = btnValue;

const GamePage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const { openModal } = useTypedSelector<Modal>(getModal);
	const { isAdmin, admin } = useTypedSelector<User>(getMembers);
	const { planningTitle, cards } = useTypedSelector<Game>(getGame);
	const result = cards.filter((card) => card.count > 0).length;

	const setExit = () => dispatch(socketCreator({ type: UNSUBSCRIBE }));
	const finishGame = () => {
		dispatch(socketCreator({ type: GET_RESULT }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.menuField}>
				<h1>{planningTitle}</h1>
				<div className={styles.menu}>
					<MasterCard admin={admin} style={styles.masterCard} />
					{isAdmin && (
						<MyButton
							style={styles.btnMaster}
							value={STOP_GAME}
							onclick={finishGame}
						/>
					)}
					{!isAdmin && (
						<>
							<ActiveTimer />
							<MyButton
								style={styles.btnMaster}
								value={EXIT}
								onclick={setExit}
							/>
						</>
					)}
				</div>
				<div className={styles.settings}>
					<div className={styles.issues}>
						<Issues />
					</div>
					<div>
						{isAdmin && (
							<div className={styles.settingsControl}>
								<ActiveTimer />
							</div>
						)}
						{!!result && <Statistics />}
					</div>
				</div>

				<div className={styles.cardContainer}>
					<RenderCards />
				</div>
			</div>
			<UsersScore />
			{openModal && <Modals />}
		</div>
	);
};

export default GamePage;
