import React from 'react';
import { useHistory } from 'react-router-dom';

import { ways } from 'constants/constRouter';
import { btn } from 'constants/commonComponents';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { Game } from 'redux/reducer/gameSettingReducer/types';
import { User } from 'redux/reducer/userReducer/types';
import { getGame, getMembers } from 'redux/reducer/selectors';

import PlayerCard from 'components/common/PlayerCard';
import MyButton from 'components/common/MyButton';
import styles from './index.module.scss';

const { HOME } = ways;
const { START_GAME, CANCEL_GAME } = btn;

const set = () => console.log('set-set'); // #

const GameStatus: React.FC = (): JSX.Element => {
	const user = useTypedSelector<User>(getMembers);
	const { roomNumber } = useTypedSelector<User>(getMembers);
	const { planningTitle } = useTypedSelector<Game>(getGame);

	const history = useHistory();
	const toHome = () => history.push(HOME);

	const copyLink = () => navigator.clipboard.writeText(roomNumber);
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
					<MyButton
						style={styles.buttonCopy}
						type="button"
						value="Copy"
						onclick={copyLink}
					/>
				</label>
				<div className={styles.buttons}>
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
