import React from 'react';
import { useDispatch } from 'react-redux';

import { getModal } from 'redux/reducer/selectors';
import socketCreator, { ADMIN_AGREE, ADMIN_DISAGREE } from 'redux/thunk';
import { useTypedSelector } from 'hooks/useTypedSelector';

import MyButton from 'components/common/MyButton';

import { btnValue } from 'constants/commonComponents';
import { InterfaceModalsKick } from 'interfaces/modals';

import styles from './index.module.scss';

const ModalUserConnect: React.FC<InterfaceModalsKick> = ({ close }) => {
	const dispatch = useDispatch();
	const modal = useTypedSelector(getModal);
	const { player, id } = modal;
	const submitConnect = () => {
		dispatch(socketCreator({ type: ADMIN_AGREE, id }));
		return close();
	};
	const cancelConnect = () => {
		dispatch(socketCreator({ type: ADMIN_DISAGREE, id }));
		return close();
	};

	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<h2 className={styles.title}>Message: User wants connect</h2>
				<p className={styles.text}>
					Connect
					<span className={styles.player}> {player} </span>
					to room?
				</p>
			</div>
			<div className={styles.buttons}>
				<MyButton value={btnValue.YES} onclick={submitConnect} />
				<MyButton
					value={btnValue.NO}
					onclick={cancelConnect}
					style={styles.cancel}
				/>
			</div>
		</div>
	);
};

export default ModalUserConnect;
