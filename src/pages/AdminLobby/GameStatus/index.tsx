import React from 'react';
import { useDispatch } from 'react-redux';

import socketCreator, { UNSUBSCRIBE, SET_START } from 'redux/thunk';

import history from 'utils/history';

import { ways } from 'constants/constRouter';
import { btnValue } from 'constants/commonComponents';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { Game } from 'redux/reducer/gameSettingReducer/types';
import { User } from 'redux/reducer/userReducer/types';
import { getGame, getMembers } from 'redux/reducer/selectors';

import MasterCard from 'components/common/MasterCard';
import MyButton from 'components/common/MyButton';
import styles from './index.module.scss';

const { HOME } = ways;
const { START_GAME, CANCEL_GAME, COPY } = btnValue;

const GameStatus: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const gameSettings = useTypedSelector(getGame);
	const user = useTypedSelector<User>(getMembers);
	const { roomNumber } = useTypedSelector<User>(getMembers);
	const { planningTitle } = useTypedSelector<Game>(getGame);

	const setExit = () => {
		dispatch(socketCreator({ type: UNSUBSCRIBE }));
		history.push(HOME);
	};

	const copyLink = () => navigator.clipboard.writeText(roomNumber);

	const setStart = () =>
		dispatch(socketCreator({ type: SET_START, gameSettings }));

	const changeLink = (event: React.ChangeEvent<HTMLInputElement>) =>
		console.log(event.target.value); // #

	return (
		<>
			<h1 className={styles.planningTitle}>{planningTitle}</h1>
			<MasterCard user={user} />
			<div className={styles.gameStatus}>
				<label htmlFor="link" className={styles.titleLink}>
					<p>Link to lobby:</p>
					<input
						className={styles.inputLink}
						type="text"
						name="link"
						value={roomNumber}
						onChange={changeLink}
					/>
					<MyButton
						style={styles.buttonCopy}
						type="button"
						value={COPY}
						onclick={copyLink}
					/>
				</label>
				<div className={styles.buttons}>
					<MyButton onclick={setStart} value={START_GAME} />
					<MyButton
						onclick={setExit}
						value={CANCEL_GAME}
						style={styles.cancel}
					/>
				</div>
			</div>
		</>
	);
};

export default GameStatus;
