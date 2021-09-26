import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

import { getModal } from 'redux/reducer/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { deleteModalActionCreation } from 'redux/reducer/modalReducer';

import FormRegistration from 'components/Forms/RegistrationForm';
import IssueForm from 'components/Forms/IssueForm';
import ModalKick from 'components/ModalKick';

import { TypeModalsOpen } from 'interfaces/modals';

import styles from './index.module.scss';

const Modals: React.FC = () => {
	const dispatch = useDispatch();
	const { type } = useTypedSelector(getModal);
	const REGISTRATION = type === TypeModalsOpen.registration;
	const ISSUE = type === TypeModalsOpen.issue;
	const KICK = type === TypeModalsOpen.kick;

	const onCloseModal = () => {
		dispatch(deleteModalActionCreation());
	};

	return createPortal(
		<div className={styles.modal}>
			{REGISTRATION && <FormRegistration close={onCloseModal} />}
			{ISSUE && <IssueForm close={onCloseModal} />}
			{KICK && <ModalKick close={onCloseModal} />}
		</div>,
		document.body
	);
};

export default Modals;
