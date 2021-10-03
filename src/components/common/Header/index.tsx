import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import logo from 'assets/images/Header/header-logo.svg';
import chat from 'assets/images/Header/chat-icon.svg';

import { ways } from 'constants/constRouter';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { getChat } from 'redux/reducer/selectors';
import { onOpenChat } from 'redux/reducer/chatReducer';

import styles from './index.module.scss';

const Header: React.FC = (): JSX.Element => {
	const pathName = useLocation().pathname;
	const dispatch = useDispatch();
	const visibleChat = useTypedSelector(getChat).open;

	const onVisibleChat = () => {
		dispatch(onOpenChat(!visibleChat));
	};

	const Chatroom = () => {
		if (pathName.includes(ways.ADMIN) || pathName.includes(ways.USER)) {
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
			<Link to={ways.HOME}>
				<img className={styles.logo} src={logo} alt="logo" />
			</Link>
			<Chatroom />
		</header>
	);
};

export default Header;
