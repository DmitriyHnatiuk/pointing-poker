import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import socketCreator, { UNSUBSCRIBE } from 'redux/thunk';
import logo from 'assets/images/Header/header-logo.svg';
import chat from 'assets/images/Header/chat-icon.svg';

import { ways } from 'constants/constRouter';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { getChat } from 'redux/reducer/selectors';
import { onOpenChat } from 'redux/reducer/chatReducer';

import styles from './index.module.scss';

const Header: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const pathName = useLocation().pathname;
	const visibleChat = useTypedSelector(getChat).open;

	const onVisibleChat = () => dispatch(onOpenChat(!visibleChat));

	const logotype = document.getElementById('logo');
	if (logotype) {
		logotype.onclick = () => dispatch(socketCreator({ type: UNSUBSCRIBE }));
	}

	const Chatroom = () => {
		if (
			pathName.includes(ways.ADMIN) ||
			pathName.includes(ways.USER) ||
			pathName.includes(ways.GAME)
		) {
			return (
				<button className={styles.chat} type="button" onClick={onVisibleChat}>
					<img src={chat} alt="chat" />
				</button>
			);
		}
		return null;
	};

	return (
		<header className={styles.header}>
			<div className={styles.line_one}>Line</div>
			<div className={styles.line_two}>Line</div>
			<img id="logo" className={styles.logo} src={logo} alt="logo" />
			<Chatroom />
		</header>
	);
};

export default Header;
