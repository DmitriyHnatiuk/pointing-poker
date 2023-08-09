import { ModalsType } from 'src/interfaces/modals';
import Button from '../common/Button';
import { Portal } from './Portal';

import { CloseIcon } from '../common/CloseIcon';
import styles from './index.module.scss';

const Modals = ({
	isOpen,
	onClose,
	children,
	style,
	className = ''
}: ModalsType) => {
	if (!isOpen) return null;

	return (
		<Portal>
			<div
				style={style}
				{...(style ? {} : { className: `${styles.overlay} ${className}` })}>
				{onClose ? (
					<div className={styles.modal}>
						<Button
							onClick={onClose}
							variant="outlined"
							style={styles.close_button}>
							<CloseIcon width={20} height={20} />
						</Button>

						{children}
					</div>
				) : (
					children
				)}
			</div>
		</Portal>
	);
};

export default Modals;
