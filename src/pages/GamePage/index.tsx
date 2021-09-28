import React from 'react';

import { useTypedSelector } from 'hooks/useTypedSelector';

import InstallTimer from 'components/common/Timer/InstallTimer';
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

const { STOP_GAME, RUN_ROUND, RESTART_ROUND, NEXT_ISSUE, EXIT } = btnValue;

const GamePage: React.FC = (): JSX.Element => {
	const { openModal } = useTypedSelector<Modal>(getModal);
	const { isAdmin } = useTypedSelector<User>(getMembers);
	const user = useTypedSelector<User>(getMembers);

	const timer = true;

	return (
		<div className={styles.container}>
			<div className={styles.menuField}>
				<h1>Issues string</h1>
				<div className={styles.menu}>
					<MasterCard user={user} style={styles.masterCard} />
					{isAdmin && <MyButton value={STOP_GAME} />}
					{!isAdmin && <MyButton value={EXIT} />}
				</div>
				<div className={styles.settings}>
					<ul className={styles.issues}>
						<li>
							<Issues />
						</li>
					</ul>
					{isAdmin && (
						<div className={styles.settingsControl}>
							<div className={styles.timer}>
								<InstallTimer />
							</div>
							<div className={styles.buttons}>
								{timer && <MyButton value={RUN_ROUND} />}
								{!timer && <MyButton value={RESTART_ROUND} />}
								{!timer && <MyButton value={NEXT_ISSUE} />}
							</div>
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
