import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Chat from 'components/common/Chat';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { getChat } from 'redux/reducer/selectors';
import { onOpenChat } from 'redux/reducer/chatReducer';

import { ways } from 'constants/constRouter';

import styles from './index.module.scss';

const Main: React.FC = ({ children }): JSX.Element => {
	const visibleChat = useTypedSelector(getChat).open;
	const pathName = useLocation().pathname;
	const dispatch = useDispatch();

	useEffect(() => {
		if (!pathName.includes(ways.ADMIN) || !pathName.includes(ways.USER)) {
			dispatch(onOpenChat(false));
		}
	}, [pathName]);

	return (
		<>
			<main className={visibleChat ? styles.chatOn : styles.chatOff}>
				<div className={styles.page}>{children}</div>
				{visibleChat && <Chat />}
			</main>
		</>
	);
};

export default Main;
