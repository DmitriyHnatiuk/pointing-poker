import React from 'react';
import { useDispatch } from 'react-redux';

import Avatar from 'components/Avatar';

import { setModalDataActionCreation } from 'redux/reducer/modalReducer';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { getMembers } from 'redux/reducer/selectors';

import { Admin, Users } from 'redux/reducer/userReducer/types';
import socketCreator, { DELETE, KICK } from 'redux/thunk';

import userDeleteImage from 'assets/images/CardPlayer/player-delete.svg';

import styles from './index.module.scss';

const PlayerCard: React.FC<{ user: Users | Admin; style?: string }> = ({
	user,
	style = ''
}) => {
	const dispatch = useDispatch();

	const { firstName, lastName, position, isAdmin, id, avatar } = user;
	const member = useTypedSelector(getMembers);
	const self = member.id === id;
	const { observer } = member;
	const buttonDelete = !isAdmin && !self;
	const playerObserver = observer && !member.isAdmin;

	const onDeleteUser = (event: React.MouseEvent<HTMLElement>) => {
		const button = event.target as HTMLElement;

		if (member.isAdmin) {
			const playerKick = `${firstName} ${lastName}`;
			return dispatch(
				setModalDataActionCreation({
					openModal: true,
					type: KICK,
					vote: false,
					id: button.id,
					playerKick
				})
			);
		}
		return dispatch(socketCreator({ type: DELETE, id: button.id }));
	};

	return (
		<div className={`${styles.card} ${style}`}>
			<div className={styles.content}>
				<div className={styles.member}>
					<Avatar
						firstName={firstName}
						lastName={lastName}
						avatar={avatar}
						blockStyle={styles.avatarBlock}
						textStyle={styles.avatarText}
					/>
					<div className={styles.player}>
						{isAdmin && <div className={styles.admin}>Admin</div>}
						<div className={styles.name}>{`${firstName} ${lastName}`}</div>
						<div className={styles.position}>{position}</div>
					</div>
				</div>
				<div className={styles.delete}>
					{buttonDelete && !playerObserver && (
						<div>
							<img
								id={id}
								src={userDeleteImage}
								alt="del"
								onClick={onDeleteUser}
								aria-hidden="true"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PlayerCard;
