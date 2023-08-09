import { memo, useMemo } from 'react';

import { useTypedSelector } from 'src/hooks/useTypedSelector';

import { selectUserData } from '_redux/reducer/userReducer/selectors';

import Avatar from 'src/components/Avatar';

import { IChatMessage } from 'src/interfaces/thunkTypes';
import { getInitialsName } from 'src/utils/initialValuesForms';

import styles from './index.module.scss';

const ChatMessage = ({ author, message, date }: IChatMessage) => {
	const { icon, firstName, lastName, authorId } = author;
	const { id: userId } = useTypedSelector(selectUserData);

	const nameInitials = useMemo(
		() => getInitialsName({ firstName, lastName }),
		[firstName, lastName]
	);

	return (
		<div
			className={`${styles.message} ${
				userId === authorId ? styles.message_user : styles.message_other
			}`}>
			<Avatar
				title={`${firstName} ${lastName}`}
				nameInitials={nameInitials}
				avatar={icon}
				style={styles.avatar_style}
			/>
			<div className={styles.author}>
				<span className={styles.user_name}>
					{firstName} {lastName}
				</span>
			</div>
			<p className={styles.text}>{message}</p>
			<span className={styles.date}>{date}</span>
		</div>
	);
};

export default memo(ChatMessage);
