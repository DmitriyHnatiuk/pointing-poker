import React from 'react';

import logo from 'assets/images/Header/header-logo.svg';
import chat from 'assets/images/Header/chat-icon.svg';

import styles from './Header.module.scss';

const Header: React.FC = (): JSX.Element => {
	return (
		<header className={styles.header}>
			<div className={styles.line_one}>Line</div>
			<div className={styles.line_two}>Line</div>
			<img className={styles.logo} src={logo} alt="logo" />
			<img className={styles.chat} src={chat} alt="chat" />
		</header>
	);
};

export default Header;
