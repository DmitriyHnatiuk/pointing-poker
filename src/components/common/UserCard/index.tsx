import { memo, useCallback, useMemo } from 'react';

import Avatar from 'src/components/Avatar';

import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import { IUsers } from '_redux/reducer/userReducer/types';

import UserDeleteImage from 'src/assets/images/CardPlayer/player-delete.svg?url';

import socketCreator from '_redux/thunk';
import { EVENTS } from 'src/constants/constRouter';
import { getInitialsName } from 'src/utils/initialValuesForms';

import Button from '../Button';

import { addToKickModal } from '_redux/reducer/modalReducer';
import { selectUserData } from '_redux/reducer/userReducer/selectors';
import styles from './index.module.scss';

type PropsType = IUsers & {
	style?: string;
};

const PlayerCard = ({
	firstName,
	lastName,
	position,
	id,
	avatar,
	isAdmin,
	style = ''
}: PropsType) => {
	const dispatch = useAppDispatch();

	const {
		id: userId,
		isObserver,
		isAdmin: memberIsAdmin
	} = useTypedSelector(selectUserData);

	const nameInitials = useMemo(
		() => getInitialsName({ firstName, lastName }),
		[firstName, lastName]
	);

	const isDeleteButtonVisible = (memberIsAdmin || !isObserver) && userId !== id;

	const onDeleteUser = useCallback(() => {
		if (memberIsAdmin) {
			return dispatch(
				addToKickModal({
					id,
					playerKick: `${firstName} ${lastName}`,
					player: 'Admin'
				})
			);
		}

		dispatch(
			socketCreator({
				type: EVENTS.DELETE,
				id
			})
		);
	}, []);

	return (
		<div className={`${styles.card} ${style}`}>
			<div className={styles.member}>
				<Avatar
					title={`${firstName} ${lastName}`}
					nameInitials={nameInitials}
					avatar={avatar}
					style={styles.avatar_block}
				/>
				<div>
					{isAdmin && <div className={styles.admin}>Admin</div>}
					<p className={styles.name}>{`${firstName || ''} ${
						lastName || ''
					}`}</p>
					<p className={styles.position}>{position}</p>
				</div>
			</div>
			<div className={styles.delete}>
				{isDeleteButtonVisible && (
					<Button variant="icon" onClick={onDeleteUser}>
						<img src={UserDeleteImage} alt="del" />
					</Button>
				)}
			</div>
		</div>
	);
};

export default memo(PlayerCard);
