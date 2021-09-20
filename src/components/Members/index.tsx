import React, { useMemo } from 'react';

import {
	IUser,
	IUsersState,
	RolesUsersEnum
} from 'redux/reducer/membersReducer/types';
import { getMembers } from 'redux/reducer/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';

import PlayerCard from '../common/PlayerCard/PlayerCard';

import styles from './index.module.scss';

const Members: React.FC = (): JSX.Element => {
	const { members } = useTypedSelector<IUsersState>(getMembers);

	const users = useMemo<IUser[]>(() => {
		return members.filter((member) => member.role === RolesUsersEnum.REGULAR);
	}, [members]);

	return (
		<div className={styles.members}>
			{users.length !== 0 ? (
				users.map((user) => {
					return <PlayerCard user={user} key={user.id} />;
				})
			) : (
				<h4>Waiting for team members...</h4>
			)}
		</div>
	);
};

export default Members;
