import ModalKick from '../ModalKick';
import ModalUserConnect from '../ModalUserConnect';
import { Notifications } from '../NotificationModal';

const GlobalModal = () => (
	<>
		<Notifications />
		<ModalKick />
		<ModalUserConnect />
	</>
);

export default GlobalModal;
