import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getModal } from 'redux/reducer/selectors';
import { deleteModalActionCreation } from 'redux/reducer/modalReducer';

import { useTypedSelector } from 'hooks/useTypedSelector';

import { InterfaceModalsKick } from 'interfaces/modals';
import { typeMessage } from 'constants/commonComponents';

import styles from './index.module.scss';

const { ERROR, MESSAGE } = typeMessage;

const ModalMessage: React.FC<InterfaceModalsKick> = ({ close }) => {
	const dispatch = useDispatch();
	const modal = useTypedSelector(getModal);
	const { message, error } = modal;
	const titles = error ? ERROR : MESSAGE;
	const style = error
		? `${styles.title}  ${styles.error}`
		: `${styles.title}  ${styles.message}`;

	useEffect(() => {
		const modalWindow = document.getElementById('modals');
		modalWindow?.addEventListener('click', close);
		return () => {
			modalWindow?.removeEventListener('click', close);
			dispatch(deleteModalActionCreation());
		};
	}, []);

	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<h1 className={style}>{titles}</h1>
				<h2 className={styles.text}>{message}</h2>
			</div>
		</div>
	);
};

export default ModalMessage;
