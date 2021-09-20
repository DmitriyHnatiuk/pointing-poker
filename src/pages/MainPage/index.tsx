import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';

import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import { User } from 'redux/reducer/userReducer/types';
import { getMembers } from 'redux/reducer/selectors';

import { TypeModalsOpen } from 'interfaces/modals';

import { btnValue } from 'constants/commonComponents';

import Modals from 'components/common/Modals';
import MyButton from 'components/common/MyButton';
import MyInput from 'components/common/MyInput';

import pokerPlanningImage from 'assets/images/MainPage/poker-planning.jpg';

import styles from './index.module.scss';

const MainPage: React.FC = (): JSX.Element => {
	const [openModal, setOpenModal] = useState(false);
	const [form, setForm] = useState(false);
	const dispatch = useDispatch();

	const openModals = () => {
		setOpenModal(true);
	};

	const { roomNumber } = useTypedSelector<User>(getMembers);

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
		if (roomNumber) {
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
						<MyButton onclick={openModals} value={btnValue.START} />
					</div>
					<div className={styles.or}>
						<h3>OR:</h3>
						<span>Connect to lobby:</span>
						<form>
							<MyInput value={roomNumber} onchange={connectToRoom} />
							<MyButton value={btnValue.CONNECT} onclick={setUser} />
						</form>
					</div>
				</section>
				{openModal && (
					<Modals open={setOpenModal} type={TypeModalsOpen.registration} />
				)}
			</div>
		</div>
	);
};

export default MainPage;
