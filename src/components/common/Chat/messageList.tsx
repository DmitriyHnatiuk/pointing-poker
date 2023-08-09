import { selectChatMessages } from '_redux/reducer/chatReducer/selectors';
import { useLayoutEffect, useRef } from 'react';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import ChatMessage from '../ChatMessage';

import styles from './index.module.scss';

export const MessageList = () => {
	const messageList = useTypedSelector(selectChatMessages);

	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (ref.current) {
			ref.current.scrollTo({
				top: ref.current.scrollHeight,
				behavior: 'smooth'
			});
		}
	}, [messageList]);
	return (
		<div className="flex-1 overflow" ref={ref}>
			<div className={styles.message_list}>
				{Object.values(messageList).map((message) => {
					return <ChatMessage {...message} key={message.id} />;
				})}
			</div>
		</div>
	);
};
