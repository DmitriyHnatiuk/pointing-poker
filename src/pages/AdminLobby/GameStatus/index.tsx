import React from 'react';
import { useDispatch } from 'react-redux';

import socketCreator, { UNSUBSCRIBE, SET_START } from 'redux/thunk';

import { btnValue } from 'constants/commonComponents';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { setChangeTitle } from 'redux/reducer/gameSettingReducer';
import { Game } from 'redux/reducer/gameSettingReducer/types';
import { User } from 'redux/reducer/userReducer/types';
import { getGame, getMembers } from 'redux/reducer/selectors';

import MasterCard from 'components/common/MasterCard';
import MyButton from 'components/common/MyButton';
import styles from './index.module.scss';

const { START_GAME, CANCEL_GAME, COPY } = btnValue;

const GameStatus: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const gameSettings = useTypedSelector(getGame);
	const user = useTypedSelector<User>(getMembers);
	const { roomNumber } = useTypedSelector<User>(getMembers);
	const { planningTitle } = useTypedSelector<Game>(getGame);

	const setExit = () => dispatch(socketCreator({ type: UNSUBSCRIBE }));

	const copyLink = () => navigator.clipboard.writeText(roomNumber);

	const setStart = () =>
		dispatch(socketCreator({ type: SET_START, gameSettings }));

	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setChangeTitle(e.target.value));
	};
	return (
		<>
			<div className={styles.planningTitle}>
				<h1 className={styles.heading}>Poker Planning</h1>
				<input type="text" value={planningTitle} onChange={onChangeTitle} />
			</div>
			<MasterCard admin={user} />
			<div className={styles.gameStatus}>
				<label htmlFor="link" className={styles.titleLink}>
					<p>Link to lobby:</p>
					<input
						className={styles.inputLink}
						type="text"
						name="link"
						value={roomNumber}
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
