import React from 'react';
import { Admin } from 'redux/reducer/userReducer/types';
import PlayerCard from '../UserCard';

import styles from './index.module.scss';

const MasterCard: React.FC<{ admin: Admin; style?: string }> = ({
	admin,
	style = ''
}) => {
	return (
		<div className={styles.status}>
			<span className={styles.titleStatus}>Scram master:</span>
			<PlayerCard user={admin} style={style} />
		</div>
	);
};

export default MasterCard;
