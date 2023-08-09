import { useCallback } from 'react';

import { selectPlanningSettings } from '_redux/reducer/planningReducer/selectors';
import socketCreator from '_redux/thunk';

import { selectUserData } from '_redux/reducer/userReducer/selectors';
import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import Button from 'src/components/common/Button';
import MasterCard from 'src/components/common/MasterCard';
import ActiveTimer from 'src/components/common/Timer/ActiveTimer';

import { BUTTON_VALUES } from 'src/constants/commonComponents';
import { EVENTS } from 'src/constants/constRouter';

import Issues from 'src/pages/AdminLobbyPage/Issues';
import RenderCards from 'src/pages/PlanningPage/RenderCards';
import Statistics from 'src/pages/PlanningPage/Statistics';

import styles from './index.module.scss';

const { STOP_GAME, EXIT } = BUTTON_VALUES;

export const PlanningBoard = () => {
	const dispatch = useAppDispatch();

	const { isAdmin } = useTypedSelector(selectUserData);
	const { planningTitle } = useTypedSelector(selectPlanningSettings);

	const setExit = useCallback(
		() => dispatch(socketCreator({ type: EVENTS.UNSUBSCRIBE })),
		[]
	);

	const finishPlanning = useCallback(() => {
		dispatch(socketCreator({ type: EVENTS.GET_RESULT }));
	}, []);

	return (
		<div className={styles.container}>
			<h3 className="title-3 text-align-center">{planningTitle}</h3>
			<div className={styles.menu}>
				{isAdmin ? (
					<>
						<MasterCard style={styles.master_card} />

						<Button
							style={styles.master_button}
							children={STOP_GAME}
							onClick={finishPlanning}
						/>
					</>
				) : (
					<>
						<ActiveTimer />
						<Button
							style={`${styles.master_button} m-l-auto`}
							children={EXIT}
							onClick={setExit}
						/>
					</>
				)}
			</div>

			<div className={styles.settings}>
				<Issues isPlanning className={styles.issues_container} />

				<div className={styles.button_container}>
					{isAdmin && <ActiveTimer />}
					<Statistics />
				</div>
			</div>

			<RenderCards />
		</div>
	);
};
