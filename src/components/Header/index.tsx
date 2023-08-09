import { matchPath, useLocation, useParams } from 'react-router-dom';

import LogoIcon from '_assets/images/Header/header-logo.svg?url';
import ChatLogoIcon from 'src/assets/images/Header/chat-icon.svg?url';

import socketCreator from '_redux/thunk';
import { EVENTS, URLS } from 'src/constants/constRouter';

import Button from '../common/Button';
import { Divider } from '../common/Divider';

import { setSwitchChat } from '_redux/reducer/chatReducer';
import { useCallback } from 'react';
import { useAppDispatch } from 'src/hooks/useTypedSelector';
import styles from './index.module.scss';

const Header = () => {
	const dispatch = useAppDispatch();
	const { roomId } = useParams();

	const { pathname } = useLocation();

	const onClickChat = useCallback(() => dispatch(setSwitchChat()), []);

	const returnToHome = useCallback(
		() =>
			matchPath(URLS.HOME, pathname)
				? null
				: dispatch(socketCreator({ type: EVENTS.UNSUBSCRIBE })),
		[pathname]
	);

	return (
		<header className={styles.header}>
			<Divider className={styles.bg_Koamaru} height="50px" />
			<Divider className={styles.bg_Cyan} height="20px" />
			<Button style={styles.logo} variant="icon" onClick={returnToHome}>
				<img src={LogoIcon} alt="logo" loading="lazy" width={80} height={80} />
			</Button>

			{Boolean(roomId) && !matchPath(URLS.MAIN, pathname) && (
				<Button variant="icon" style={styles.chat_button} onClick={onClickChat}>
					<img
						src={ChatLogoIcon}
						alt="chat"
						loading="lazy"
						height={20}
						width={20}
					/>
				</Button>
			)}
		</header>
	);
};

export default Header;
