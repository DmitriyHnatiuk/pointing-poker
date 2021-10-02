import React from 'react';

import Avatar from 'components/Avatar';

import { interfaceChatMessage } from 'interfaces/commonChat';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { getMembers } from 'redux/reducer/selectors';

import styles from './index.module.scss';

const ChatMessage: React.FC<interfaceChatMessage> = (props) => {
	const { author, textMessage, date } = props;
	const { icon, firstName, lastName } = author;
	const nameUser = useTypedSelector(getMembers).firstName;
	const isUser = nameUser === firstName;

	return (
		<>
			<div
				className={`${styles.message} ${
					isUser ? styles.messageUser : styles.messageOther
				}`}>
				<Avatar
					firstName={firstName}
					lastName={lastName}
					avatar={icon}
					style={styles.avatar}
				/>
				<div className={styles.author}>
					<span className={styles.userName}>
						{firstName} {lastName}
					</span>
				</div>
				<p className={styles.text}>{textMessage}</p>
				<span className={styles.date}>{date}</span>
			</div>
		</>
	);
};

export default ChatMessage;
