import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import ChatMessage from 'components/common/ChatMessage';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { getChat, getMembers } from 'redux/reducer/selectors';
import socketCreator, { CHAT, SEND_MESSAGE } from 'redux/thunk';

import styles from './index.module.scss';

const Chat: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	const messageList = useTypedSelector(getChat).messages;
	const { firstName, lastName, avatar } = useTypedSelector(getMembers);
	const [textValue, setTextValue] = useState('');
	const time = new Date();

	useEffect(() => {
		dispatch(socketCreator({ type: CHAT }));
	}, []);

	const minutes =
		String(time.getUTCMinutes()).length < 2
			? `0${String(time.getUTCMinutes())}`
			: String(time.getUTCMinutes());

	const hours =
		String(time.getUTCHours()).length < 2
			? `0${String(time.getUTCHours())}`
			: String(time.getUTCHours());

	const getMessage = () => {
		if (!textValue) return;
		setTextValue('');
		dispatch(
			socketCreator({
				type: SEND_MESSAGE,
				message: {
					author: {
						firstName: `${firstName}`,
						lastName: `${lastName}`,
						icon: avatar
					},
					textMessage: textValue,
					date: `${hours}:${minutes}`
				}
			})
		);
	};

	const textareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTextValue(e.target.value);
	};

	const MessageList = useMemo(
		() =>
			messageList.map((item) => {
				const { author, textMessage, date, id } = item;
				return (
					<ChatMessage
						author={author}
						textMessage={textMessage}
						date={date}
						key={`${id}`}
					/>
				);
			}),
		[messageList]
	);

	return (
		<div className={styles.chat}>
			<div className={styles.messageList}>{MessageList}</div>
			<div className={styles.box}>
				<textarea
					className={styles.input}
					value={textValue}
					placeholder="Add message..."
					onChange={textareaChange}
				/>
				<button type="submit" className={styles.submit} onClick={getMessage}>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
