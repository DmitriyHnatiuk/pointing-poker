import React from 'react';
import { Users } from 'redux/reducer/userReducer/types';
import PlayerCard from '../UserCard';

import styles from './index.module.scss';

const MasterCard: React.FC<{ user: Users; style?: string }> = ({
	user,
	style = ''
}) => {
	return (
		<div className={styles.status}>
			<span className={styles.titleStatus}>Scram master:</span>
			<PlayerCard user={user} style={style} />
		</div>
	);
};

export default MasterCard;
