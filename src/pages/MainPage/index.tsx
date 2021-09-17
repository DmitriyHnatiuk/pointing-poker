import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';

import { RootState } from 'redux/store';

import { btn } from 'constants/commonComponents';
import MyButton from 'components/common/MyButton/MyButton';
import MyInput from 'components/common/MyInput/MyInput';
import MyForm from 'components/common/MyForm';

import pokerPlanningImage from 'assets/images/MainPage/poker-planning.jpg';

import styles from './index.module.scss';

const { START, CONNECT } = btn;

const MainPage: React.FC = (): JSX.Element => {
	const [form, setForm] = useState(false);
	const dispatch = useDispatch();

	const room = useSelector((state: RootState) => state.userReducer.roomNumber);

	const connectToRoom = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const obj = { roomNumber: event.target.value };
		dispatch(setUserDataActionCreation(obj));
	};

	const setAdmin = () => {
		const obj = { isAdmin: true };
		dispatch(setUserDataActionCreation(obj));
		return setForm(true);
	};

	const setUser = () => {
		if (room) {
			setForm(true);
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
						<h3>Start your planning:</h3>
						<span>Create session:</span>
						<MyButton onclick={setAdmin} value={START} />
					</div>
					<div className={styles.or}>
						<h3>OR:</h3>
						<span>Connect to lobby:</span>
						<form>
							<MyInput value={room} onchange={connectToRoom} />
							<MyButton value={CONNECT} onclick={setUser} />
						</form>
					</div>
				</section>
			</div>
			{form && <MyForm />}
		</div>
	);
};

export default MainPage;
