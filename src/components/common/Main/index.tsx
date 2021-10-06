import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Chat from 'components/common/Chat';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { getChat, getMembers } from 'redux/reducer/selectors';
import { onOpenChat } from 'redux/reducer/chatReducer';

import { ways } from 'constants/constRouter';

import styles from './index.module.scss';

const Main: React.FC = ({ children }): JSX.Element => {
	const dispatch = useDispatch();

	const visibleChat = useTypedSelector(getChat).open;
	const pathName = useLocation().pathname;

	useEffect(() => {
		if (
			!pathName.includes(ways.ADMIN) ||
			!pathName.includes(ways.USER) ||
			!pathName.includes(ways.GAME)
		) {
			dispatch(onOpenChat(false));
		}
	}, [pathName]);

	const defaultStyle = visibleChat ? styles.chatOn : styles.chatOff;

	return (
		<>
			<main className={defaultStyle}>
				{children}
				{visibleChat && <Chat />}
			</main>
		</>
	);
};

export default Main;
