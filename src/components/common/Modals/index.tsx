import React from 'react';
import { createPortal } from 'react-dom';

import FormRegistration from 'components/Forms/RegistrationForm';
import IssueForm from 'components/Forms/IssueForm';
import ModalKick from 'components/ModalKick';

import { Modal, TypeModalsOpen } from 'interfaces/modals';

import styles from './index.module.scss';

const Modals: React.FC<Modal> = ({ type, open }) => {
	const REGISTRATION = type === TypeModalsOpen.registration;
	const ISSUE = type === TypeModalsOpen.issue;
	const KICK = type === TypeModalsOpen.kick;

	return createPortal(
		<div className={styles.modal}>
			{REGISTRATION && <FormRegistration open={open} />}
			{ISSUE && <IssueForm open={open} />}
			{KICK && (
				<ModalKick
					open={open}
					player="player"
					playerKick="kick player"
					vote={false}
				/>
			)}
		</div>,
		document.body
	);
};

export default Modals;
