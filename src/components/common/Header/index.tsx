import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/images/Header/header-logo.svg';
import chat from 'assets/images/Header/chat-icon.svg';
import { ways } from 'constants/constRouter';

import styles from './index.module.scss';

const Header: React.FC = (): JSX.Element => {
	return (
		<header className={styles.header}>
			<div className={styles.line_one}>Line</div>
			<div className={styles.line_two}>Line</div>
			<Link to={ways.HOME}>
				<img className={styles.logo} src={logo} alt="logo" />
			</Link>
			<img className={styles.chat} src={chat} alt="chat" />
		</header>
	);
};

export default Header;
