import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormEvent, useCallback, useMemo, useReducer } from 'react';

import socketCreator from '_redux/thunk';

import { EVENTS } from 'src/constants/constRouter';
import { useResizeImg } from 'src/hooks/useResizeImg';
import { useAppDispatch } from 'src/hooks/useTypedSelector';

import { RegistryType } from 'src/interfaces/commonForm';
import { getInitialsName } from 'src/utils/initialValuesForms';

import { BUTTON_VALUES } from 'src/constants/commonComponents';

import Avatar from '../../Avatar';
import Button from '../../common/Button';
import ImageInput from '../../common/Form/ImageInput';
import Input from '../../common/Form/Input';
import Switch from '../../common/Form/Switch';

import styles from './index.module.scss';

const initialState = {
	firstName: '',
	lastName: '',
	position: '',
	isObserver: false
};

const {
	actions: { setFirstName, setLastName, setObserver, setPosition },
	reducer
} = createSlice({
	name: 'register_form',
	initialState,
	reducers: {
		setFirstName: (state: RegistryType, action: PayloadAction<string>) => {
			state.firstName = action.payload;
		},
		setLastName: (state: RegistryType, action: PayloadAction<string>) => {
			state.lastName = action.payload;
		},
		setObserver: (state: RegistryType) => {
			state.isObserver = !state.isObserver;
		},
		setPosition: (state: RegistryType, action: PayloadAction<string>) => {
			state.position = action.payload;
		}
	}
});

type PropsType = {
	isAdminForm: boolean;
	onClose: () => void;
	roomId?: string;
};

const RegistrationModal = ({
	isAdminForm = false,
	onClose,
	roomId
}: PropsType) => {
	const dispatch = useAppDispatch();
	const { imgData, setResizeImg } = useResizeImg({ width: 200, quality: 0.9 });

	const [data, setData] = useReducer(reducer, initialState);

	const nameInitials = useMemo(
		() =>
			getInitialsName({ firstName: data.firstName, lastName: data.lastName }),
		[data.firstName, data.lastName]
	);

	const addFirstName = useCallback(
		(value: string) => setData(setFirstName(value)),
		[]
	);

	const addLastName = useCallback(
		(value: string) => setData(setLastName(value)),
		[]
	);

	const setAsObserver = useCallback(() => setData(setObserver()), []);

	const addPosition = useCallback(
		(value: string) => setData(setPosition(value)),
		[]
	);

	const addAvatar = useCallback((file: File) => {
		setResizeImg(file);
	}, []);

	const submitForm = (event: FormEvent) => {
		event.preventDefault();
		dispatch(
			socketCreator({
				usersData: {
					...data,
					...(imgData.file
						? { avatar: { file: imgData.file, fileName: imgData.file.name } }
						: {}),
					isAdmin: isAdminForm,
					roomId
				},
				type: EVENTS.SUBSCRIBE
			})
		);

		onClose();
	};
	return (
		<form className={styles.form} onSubmit={submitForm}>
			<div className={styles.form_header}>
				<h3 className={styles.title}>Connect to lobby</h3>

				<Switch
					label="Connect as observer"
					name="observer"
					style={styles.flex_1}
					value={data.isObserver}
					onChange={setAsObserver}
				/>
			</div>
			<div className={styles.container}>
				<Input
					label="First name"
					name="firstName"
					minLength={2}
					maxLength={15}
					style={styles.input}
					value={data.firstName}
					onChange={addFirstName}
					isDefaultLabel
					isRequired
				/>
				<Input
					label="Last name"
					name="lastName"
					minLength={2}
					maxLength={15}
					style={styles.input}
					value={data.lastName}
					onChange={addLastName}
					isDefaultLabel
				/>
				<Input
					label="Job name"
					name="position"
					minLength={2}
					maxLength={15}
					style={styles.input}
					value={data.position}
					onChange={addPosition}
					isDefaultLabel
				/>
			</div>

			<ImageInput
				label="Avatar"
				id="avatar"
				name="avatar"
				style={styles.input}
				setAvatar={addAvatar}
			/>
			<Avatar
				title={`${data.firstName} ${data.lastName}`}
				nameInitials={nameInitials}
				avatar={imgData.url ?? ''}
			/>

			<div className={styles.buttons_wrapper}>
				<Button
					type="submit"
					style={styles.button}
					children={BUTTON_VALUES.CONFIRM}
				/>

				<Button
					onClick={onClose}
					style={`${styles.button} ${styles.cancel}`}
					children={BUTTON_VALUES.CANCEL}
				/>
			</div>
		</form>
	);
};

export default RegistrationModal;
