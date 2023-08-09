import { useCallback } from 'react';

import socketCreator from '_redux/thunk';

import { useDebounce } from 'src/hooks/useDebounce';
import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import { setChangeTitle } from '_redux/reducer/planningReducer';
import { selectPlanningSettings } from '_redux/reducer/planningReducer/selectors';
import { selectUserData } from '_redux/reducer/userReducer/selectors';

import Button from 'src/components/common/Button';
import Input from 'src/components/common/Form/Input';
import MasterCard from 'src/components/common/MasterCard';

import { BUTTON_VALUES } from 'src/constants/commonComponents';
import { EVENTS } from 'src/constants/constRouter';

import styles from './index.module.scss';

const { START_GAME, CANCEL_GAME, COPY } = BUTTON_VALUES;

const PlanningStatus = () => {
	const dispatch = useAppDispatch();

	const { roomId } = useTypedSelector(selectUserData);
	const { planningTitle } = useTypedSelector(selectPlanningSettings);

	const setExit = useCallback(
		() => dispatch(socketCreator({ type: EVENTS.UNSUBSCRIBE })),
		[]
	);

	const setStart = useCallback(
		() => dispatch(socketCreator({ type: EVENTS.SET_START })),
		[]
	);

	const copyLink = useCallback(
		() => navigator.clipboard.writeText(`${window.location.host}/${roomId}`),
		[]
	);

	const debouncedChangeHandler = useDebounce((value: string) => {
		dispatch(setChangeTitle(value));
	});

	const onChangeTitle = useCallback(
		(value: string) => {
			debouncedChangeHandler(value);
		},
		[debouncedChangeHandler]
	);

	return (
		<>
			<Input
				style={styles.planning_title}
				name="planning title"
				type="text"
				maxLength={40}
				placeholder={planningTitle}
				onChange={onChangeTitle}
			/>

			<MasterCard />
			<div className={styles.game_status}>
				<div className={styles.link_input_block}>
					<Input
						label="Link to lobby:"
						style={styles.input_link}
						type="text"
						name="link"
						readOnly
						value={`${window.location.host}/${roomId}`}
					/>
					<Button
						style={styles.button_copy}
						type="button"
						children={COPY}
						onClick={copyLink}
					/>
				</div>

				<div className={styles.buttons_block}>
					<Button style={styles.btn} onClick={setStart} children={START_GAME} />
					<Button
						onClick={setExit}
						children={CANCEL_GAME}
						style={`${styles.cancel} ${styles.btn}`}
					/>
				</div>
			</div>
		</>
	);
};

export default PlanningStatus;
