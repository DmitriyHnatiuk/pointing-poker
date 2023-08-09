import { useCallback, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import Modals from 'src/components/Modals';
import RegistrationModal from 'src/components/Modals/RegistrationModal';
import Button from 'src/components/common/Button';
import Input from 'src/components/common/Form/Input';
import { BUTTON_VALUES } from 'src/constants/commonComponents';
import styles from './index.module.scss';

import pokerPlanningImage from '_assets/images/MainPage/poker-planning.jpg';

export const MainPage = () => {
	const { roomId } = useParams();
	const [isAdmin, setAsAdmin] = useState(false);
	const [isModalOpen, setModal] = useState(false);

	const ref = useRef<HTMLInputElement>(null);

	const connectToRoom = useCallback(
		() =>
			ref.current && (ref.current.value || ref.current.defaultValue)
				? setModal(true)
				: null,
		[]
	);

	const connectAsAdmin = useCallback(
		() => (setAsAdmin(true), setModal(true)),
		[]
	);

	const closeModal = useCallback(
		() => (setModal((prev) => !prev), setAsAdmin(false)),
		[]
	);

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<img src={pokerPlanningImage} alt="Poker-planning" loading="lazy" />
			</div>

			<h3 className={styles.title}>Start your planning:</h3>

			<div className={styles.start_wrapper}>
				<p className={styles.header}>Create session:</p>
				<Button
					onClick={connectAsAdmin}
					children={BUTTON_VALUES.START}
					style="fit-content"
				/>
			</div>

			<h3 className={styles.title}>OR:</h3>

			<div className={styles.connect_wrapper}>
				<Input
					label="Connect to lobby:"
					name="room_number"
					style={styles.input_room_number}
					ref={ref}
					isDefaultLabel
					defaultValue={roomId}
				/>
				<Button
					style={styles.btn_connect}
					onClick={connectToRoom}
					children={BUTTON_VALUES.CONNECT}
				/>
			</div>

			{isModalOpen && (
				<Modals isOpen={isModalOpen} onClose={closeModal}>
					<RegistrationModal
						onClose={closeModal}
						isAdminForm={isAdmin}
						roomId={ref.current?.value || ref.current?.defaultValue}
					/>
				</Modals>
			)}
		</div>
	);
};

export default MainPage;
