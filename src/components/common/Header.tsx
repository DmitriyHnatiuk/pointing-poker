import React from 'react';

import logo from 'assets/images/header-logo.svg';
import chat from 'assets/images/chat-icon.svg';

import s from 'assets/styles/common/Header.module.scss';

const Header: React.FC = (): JSX.Element => {
	return (
		<header className={s.header}>
			<div className={s.line_one}>Line</div>
			<div className={s.line_two}>Line</div>
			<img className={s.logo} src={logo} alt="logo" />
			<img className={s.chat} src={chat} alt="chat" />
		</header>
	);
};

export default Header;
