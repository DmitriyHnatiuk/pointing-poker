import { useCallback } from 'react';

import { removeUserConnectModal } from '_redux/reducer/modalReducer';
import { selectConnectModalData } from '_redux/reducer/modalReducer/selectors';
import socketCreator from '_redux/thunk';

import { BUTTON_VALUES } from 'src/constants/commonComponents';
import { EVENTS } from 'src/constants/constRouter';

import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import Modals from '..';
import Button from '../../common/Button';

import styles from './index.module.scss';

const ModalUserConnect = () => {
	const dispatch = useAppDispatch();

	const players = useTypedSelector(selectConnectModalData);

	const submitConnect = useCallback(
		(id: string) => () => (
			dispatch(socketCreator({ type: EVENTS.ADMIN_AGREE, id })),
			dispatch(removeUserConnectModal(id))
		),
		[]
	);

	const cancelConnect = useCallback(
		(id: string) => () => (
			dispatch(socketCreator({ type: EVENTS.ADMIN_DISAGREE, id })),
			dispatch(removeUserConnectModal(id))
		),
		[]
	);

	return players.map(({ player, id }) => (
		<Modals key={id} isOpen={Boolean(players.length)}>
			<div className={styles.modal}>
				<div className={styles.content}>
					<h2 className={styles.title}>
						Message: <span>User wants connect</span>
					</h2>
					<p className={styles.text}>
						Connect
						<span> {player} </span>
						to room?
					</p>
				</div>
				<div className={styles.buttons}>
					<Button onClick={submitConnect(id)} children={BUTTON_VALUES.YES} />
					<Button
						onClick={cancelConnect(id)}
						children={BUTTON_VALUES.NO}
						style={styles.cancel}
					/>
				</div>
			</div>
		</Modals>
	));
};

export default ModalUserConnect;
