import { FormEvent, useCallback } from 'react';

import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import { setCloseChat } from '_redux/reducer/chatReducer';
import { selectChatStatus } from '_redux/reducer/chatReducer/selectors';
import socketCreator from '_redux/thunk';

import { BUTTON_VALUES } from 'src/constants/commonComponents';
import { EVENTS } from 'src/constants/constRouter';

import Button from '../Button';
import { CloseIcon } from '../CloseIcon';
import Input from '../Form/Input';
import { MessageList } from './messageList';

import styles from './index.module.scss';

const Chat = () => {
	const dispatch = useAppDispatch();
	const isOpenChat = useTypedSelector(selectChatStatus);

	const closeChat = useCallback(() => dispatch(setCloseChat()), []);
	const sendMessage = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const textMessage = event.currentTarget['add_message'].value;

		if (!textMessage) return;

		dispatch(
			socketCreator({
				type: EVENTS.SEND_MESSAGE,
				message: textMessage
			})
		);

		event.currentTarget['add_message'].value = '';
	}, []);

	return isOpenChat ? (
		<div className={styles.chat}>
			<Button variant="icon" onClick={closeChat} style={styles.close_button}>
				<CloseIcon />
			</Button>
			<MessageList />
			<form className={styles.send_form} onSubmit={sendMessage}>
				<Input
					name="add_message"
					style={styles.input}
					placeholder="Add message..."
				/>
				<Button
					type="submit"
					style={styles.submit}
					children={BUTTON_VALUES.SEND}
				/>
			</form>
		</div>
	) : null;
};

export default Chat;
