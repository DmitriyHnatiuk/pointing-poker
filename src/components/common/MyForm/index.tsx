import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { setUserDataActionCreation } from 'redux/reducer/userReducer';
import { btn } from 'constants/commonComponents';
import { ways } from 'constants/constRouter';
import MyButton from '../MyButton/MyButton';

import styles from './index.module.scss';

import Switch from '../Switch';

const { ADMIN, USER, HOME } = ways;
const { CONFIRM, CANCEL, OBSERVER } = btn;

const MyForm: React.FC = (): JSX.Element => {
	const route = useHistory();
	const dispatch = useDispatch();

	const firstName = useSelector(
		(state: RootState) => state.userReducer.firstName
	);

	const lastName = useSelector(
		(state: RootState) => state.userReducer.lastName
	);

	const observer = useSelector(
		(state: RootState) => state.userReducer.observer
	);
	const isAdmin = useSelector((state: RootState) => state.userReducer.isAdmin);

	const setCurrentFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const obj = { firstName: event.target.value };
		return dispatch(setUserDataActionCreation(obj));
	};
	const setCurrentLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const obj = { lastName: event.target.value };
		return dispatch(setUserDataActionCreation(obj));
	};
	const setCurrentObserver = () => {
		const obj = { observer: !observer };
		return dispatch(setUserDataActionCreation(obj));
	};

	const toAdmin = () => {
		const path = isAdmin ? ADMIN : USER;

		return route.push(path);
	};

	const exit = () => route.push(HOME);

	// const initials =
	// 	firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase() ||
	// 	null;

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<h2> Connect to lobby</h2>
				<label htmlFor="firstName">
					<p> Your first name:</p>
					<input
						name="firstName"
						value={firstName}
						onChange={setCurrentFirstName}
						type="text"
					/>
				</label>
				<label htmlFor="lastName">
					<p> your last name:</p>
					<input
						name="lastName"
						onChange={setCurrentLastName}
						value={lastName}
						type="text"
					/>
				</label>
				<label htmlFor="position">
					<p>Your job position:</p>
					<input type="text" />
				</label>
				<label htmlFor="img">
					<p>Image:</p>
					<input type="img" />
					{/* <Avatar item={initials} /> */}
				</label>
			</div>
			<div className={styles.observer}>
				<span className={styles.titleObserver}>connect as observer</span>
				<Switch value={observer} setValue={setCurrentObserver} id={OBSERVER} />
			</div>
			<div className={styles.Button}>
				<MyButton value={CONFIRM} onclick={toAdmin} />
				<MyButton value={CANCEL} onclick={exit} />
			</div>
		</div>
	);
};
export default MyForm;
