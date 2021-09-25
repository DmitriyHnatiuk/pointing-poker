import React from 'react';
import { useDispatch } from 'react-redux';

import { getModal } from 'redux/reducer/selectors';
import socketCreator, { AGREE, DELETE } from 'redux/thunk';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { deleteModalActionCreation } from 'redux/reducer/modalReducer';

import MyButton from 'components/common/MyButton';

import { btnValue } from 'constants/commonComponents';
import { InterfaceModalsKick } from 'interfaces/modals';

import styles from './index.module.scss';

const ModalKick: React.FC<InterfaceModalsKick> = ({ close }) => {
	const dispatch = useDispatch();
	const modal = useTypedSelector(getModal);
	const { player, playerKick, id, vote } = modal;
	const omSubmitBtn = () => {
		if (vote) {
			dispatch(socketCreator({ type: AGREE, id }));
		} else {
			dispatch(socketCreator({ type: DELETE, id }));
		}
		return dispatch(deleteModalActionCreation());
	};

	return (
		<div className={styles.kickModal}>
			<div className={styles.content}>
				{vote ? (
					<>
						<h2 className={styles.title}>Kick </h2>
						<p className={styles.text}>
							<span className={styles.player}>{player} </span>
							want to kick member
							<span className={styles.player}> {playerKick} </span>
							Do you agree with it?
						</p>
					</>
				) : (
					<>
						<h2 className={styles.title}>Kick player? </h2>
						<p className={styles.text}>
							Are you really want to remove player
							<span className={styles.player}> {playerKick} </span>
							from game session?
						</p>
					</>
				)}
			</div>
			<div className={styles.buttons}>
				<MyButton value={btnValue.YES} onclick={omSubmitBtn} />
				<MyButton value={btnValue.NO} onclick={close} style={styles.cancel} />
			</div>
		</div>
	);
};

export default ModalKick;
