import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';

import { setModalDataActionCreation } from 'redux/reducer/modalReducer';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import { getMembers, getModal } from 'redux/reducer/selectors';
import { User } from 'redux/reducer/userReducer/types';

import { btnValue } from 'constants/commonComponents';

import Modals from 'components/common/Modals';
import MyButton from 'components/common/MyButton';
import MyInput from 'components/common/MyInput';

import pokerPlanningImage from 'assets/images/MainPage/poker-planning.jpg';

import styles from './index.module.scss';

const MainPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const { openModal } = useTypedSelector(getModal);
	const { roomNumber } = useTypedSelector<User>(getMembers);

	const connectToRoom = (event: React.ChangeEvent<HTMLInputElement>): void => {
		dispatch(setUserDataActionCreation({ roomNumber: event.target.value }));
	};

	const setAdmin = () => {
		dispatch(setModalDataActionCreation({ openModal: true }));
		dispatch(setUserDataActionCreation({ isAdmin: true }));
	};

	const setUser = () => {
		if (roomNumber) {
			dispatch(setModalDataActionCreation({ openModal: true }));
			dispatch(setUserDataActionCreation({ isAdmin: false }));
		}
		return null;
	};

	return (
		<div className={styles.main_page}>
			<div className={styles.container}>
				<section className={styles.section}>
					<div className={styles.logo}>
						<img src={pokerPlanningImage} alt="Poker-planning" />
					</div>
					<div className={styles.start}>
						<h3 className={styles.title}>Start your planning:</h3>
						<span className={styles.text}>Create session:</span>
						<MyButton onclick={setAdmin} value={btnValue.START} />
					</div>
					<div className={styles.or}>
						<h3 className={styles.title}>OR:</h3>
						<span className={styles.text}>Connect to lobby:</span>
						<form className={styles.formLink}>
							<MyInput
								style={styles.linkInput}
								value={roomNumber}
								onchange={connectToRoom}
							/>
							<MyButton value={btnValue.CONNECT} onclick={setUser} />
						</form>
					</div>
				</section>
				{openModal && <Modals />}
			</div>
		</div>
	);
};

export default MainPage;
