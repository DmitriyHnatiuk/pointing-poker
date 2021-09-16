import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useMemo } from 'react';
import {
	IUser,
	IUsersState,
	RolesUsersEnum
} from 'redux/reducer/membersReducer/types';
import { getMembers } from 'redux/reducer/selectors';
import PlayerCard from '../PlayerCard/PlayerCard';

const Members: React.FC = (): JSX.Element => {
	const { members } = useTypedSelector<IUsersState>(getMembers);

	const users = useMemo<IUser[]>(() => {
		return members.filter((member) => member.role === RolesUsersEnum.REGULAR);
	}, [members]);

	return (
		<>
			{users.length !== 0 ? (
				users.map((user) => {
					return <PlayerCard user={user} key={user.id} />;
				})
			) : (
				<h4>Waiting for team members...</h4>
			)}
		</>
	);
};

export default Members;
