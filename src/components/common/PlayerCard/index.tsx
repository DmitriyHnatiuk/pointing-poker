import React from 'react';
import { useDispatch } from 'react-redux';

import { Users } from 'redux/reducer/userReducer/types';

import { deleteUserActionCreation } from 'redux/reducer/userReducer';

import unknownAvatar from 'assets/images/CardPlayer/unknown-avatar.svg';
import userDeleteImage from 'assets/images/CardPlayer/player-delete.svg';

import styles from './index.module.scss';

const PlayerCard: React.FC<{ user: Users }> = ({ user }) => {
	const { firstName, lastName, position, isAdmin, avatar } = user;
	const ava = avatar || unknownAvatar;

	const dispatch = useDispatch();

	const onDeleteUser = () => {
		dispatch(deleteUserActionCreation(user));
	};

	return (
		<div className={styles.card}>
			<div className={styles.content}>
				<div className={styles.member}>
					<div className={styles.avatar}>
						<img src={ava} alt="avatar" />
					</div>
					<div className={styles.player}>
						{isAdmin && <div className={styles.admin}>Admin</div>}
						<div className={styles.name}>{`${firstName} ${lastName}`}</div>
						<div className={styles.position}>{position}</div>
					</div>
				</div>
				<div className={styles.delete}>
					{!isAdmin && (
						<div>
							<img
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
