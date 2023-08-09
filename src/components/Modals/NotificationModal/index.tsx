import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'src/hooks/useTypedSelector';

import Button from 'src/components/common/Button';
import { CloseIcon } from 'src/components/common/CloseIcon';

import { removeNotification } from '_redux/reducer/modalReducer';
import { selectNotifications } from '_redux/reducer/modalReducer/selectors';

import Modals from '..';

import styles from './styles.module.scss';

export const Notifications = () => {
	const dispatch = useDispatch();
	const notifications = useTypedSelector(selectNotifications);
	const onClose = (id: string) => dispatch(removeNotification(id));

	return (
		<Modals
			isOpen={Boolean(notifications.length)}
			className={styles.notifications}>
			<div className={styles.container}>
				{notifications.map(({ id, isError, message }) => (
					<div
						className={`${styles.modal} ${
							styles[isError ? 'error_style' : 'notification_style']
						}`}
						key={id}>
						<h5>{message}</h5>
						<Button
							style={styles.close_button}
							variant="text"
							onClick={() => onClose(id)}>
							<CloseIcon />
						</Button>
					</div>
				))}
			</div>
		</Modals>
	);
};
