import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ways } from 'constants/constRouter';
import { RootState } from 'redux/store';
import { btn } from 'constants/commonComponents';

import PlayerCard from 'components/common/PlayerCard/PlayerCard';
import MyButton from 'components/common/MyButton/MyButton';
import styles from './index.module.scss';

const { HOME } = ways;
const { START_GAME, CANCEL_GAME } = btn;

const set = () => console.log('set-set'); // #

const GameStatus: React.FC = (): JSX.Element => {
	const user = useSelector((state: RootState) => state.userReducer);
	const planningTitle = useSelector(
		(state: RootState) => state.gameSettings.planningTitle
	);
	const roomNumber = useSelector(
		(state: RootState) => state.userReducer.roomNumber
	);
	const history = useHistory();
	const toHome = () => history.push(HOME);

	const changeLink = (event: React.ChangeEvent<HTMLInputElement>) =>
		console.log(event.target.value); // #

	return (
		<>
			<h1 className={styles.planningTitle}>{planningTitle}</h1>
			<div className={styles.status}>
				<span className={styles.titleStatus}>Scram master:</span>
				<PlayerCard user={user} />
			</div>
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
					<input className={styles.buttonCopy} type="submit" value="Copy" />
				</label>
				<div className={styles.buttonGame}>
					<MyButton onclick={set} value={START_GAME} />
					<MyButton
						onclick={toHome}
						value={CANCEL_GAME}
						style={styles.cancel}
					/>
				</div>
			</div>
		</>
	);
};

export default GameStatus;
