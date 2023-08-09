import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'src/hooks/useTypedSelector';

import { resetKickModal } from '_redux/reducer/modalReducer';
import { selectKickModalData } from '_redux/reducer/modalReducer/selectors';
import socketCreator from '_redux/thunk';

import Button from 'src/components/common/Button';
import { BUTTON_VALUES } from 'src/constants/commonComponents';
import { EVENTS } from 'src/constants/constRouter';

import Modals from '..';

import styles from './index.module.scss';

const ModalKick = () => {
	const dispatch = useDispatch();

	const kickList = useTypedSelector(selectKickModalData);

	const omSubmitBtn = useCallback(
		(id: string, vote?: boolean) => () => (
			vote
				? dispatch(socketCreator({ type: EVENTS.AGREE, id }))
				: dispatch(socketCreator({ type: EVENTS.DELETE, id })),
			dispatch(resetKickModal())
		),
		[]
	);

	const closeModal = useCallback(() => dispatch(resetKickModal()), []);

	return (
		Boolean(kickList.length) &&
		kickList.map(({ vote, player, playerKick, id }) => (
			<Modals isOpen={true} onClose={closeModal} key={id}>
				<div className={styles.content}>
					{vote ? (
						<>
							<h3 className="title-2 text-align-center">Kick</h3>
							<p className={styles.text}>
								<span className={styles.player}>{player} </span>
								want to kick member
								<span className={styles.player}> {playerKick} </span>
								Do you agree with it?
							</p>
						</>
					) : (
						<>
							<h2 className="title-2 text-align-center">Kick player? </h2>
							<p className={styles.text}>
								Are you really want to remove player
								<span className={styles.player}> {playerKick} </span>
								from planning session?
							</p>
						</>
					)}
				</div>
				<div className={styles.buttons}>
					<Button
						children={BUTTON_VALUES.YES}
						onClick={omSubmitBtn(id, vote)}
					/>
					<Button
						children={BUTTON_VALUES.NO}
						onClick={closeModal}
						style={styles.cancel}
					/>
				</div>
			</Modals>
		))
	);
};

export default ModalKick;
