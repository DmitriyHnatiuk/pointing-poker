import React, { useMemo } from 'react';

import PlayerCard from 'components/common/PlayerCard/PlayerCard';
import MyButton from 'components/common/MyButton/MyButton';
import Members from 'components/Members';

import {
	IUser,
	IUsersState,
	RolesUsersEnum
} from 'redux/reducer/membersReducer/types';
import { getMembers } from 'redux/reducer/selectors';

import { useTypedSelector } from 'hooks/useTypedSelector';

import styles from './index.module.scss';

const TeamMembers: React.FC = () => {
	const { members } = useTypedSelector<IUsersState>(getMembers);

	const admin = useMemo<IUser | undefined>(() => {
		return members.find((member) => member.role === RolesUsersEnum.ADMIN);
	}, [members]);

	return (
		<section className={styles.section}>
			<h3>Spring planning:</h3>
			<div className={styles.scram}>
				<span>Scram master:</span>
				<PlayerCard user={admin!} />
			</div>
			<div className={styles.exit}>
				<MyButton value="Exit" />
			</div>
			<div className={styles.team}>
				<h3>Members:</h3>
				<Members />
			</div>
		</section>
	);
};

export default TeamMembers;
