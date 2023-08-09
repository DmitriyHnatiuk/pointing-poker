import { useCallback } from 'react';

import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import socketCreator from '_redux/thunk';

import { selectPlanningSettings } from '_redux/reducer/planningReducer/selectors';

import Button from 'src/components/common/Button';
import { Divider } from 'src/components/common/Divider';
import MasterCard from 'src/components/common/MasterCard';

import { BUTTON_VALUES } from 'src/constants/commonComponents';
import { EVENTS } from 'src/constants/constRouter';

import Members from '../AdminLobbyPage/Members';

import styles from './index.module.scss';

const TeamMembersPage = () => {
	const dispatch = useAppDispatch();

	const { planningTitle } = useTypedSelector(selectPlanningSettings);

	const setExit = useCallback(
		() => dispatch(socketCreator({ type: EVENTS.UNSUBSCRIBE })),
		[]
	);

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{planningTitle}</h3>
			<MasterCard />
			<div className="text-align-end">
				<Button
					style={styles.button_exit}
					onClick={setExit}
					children={BUTTON_VALUES.EXIT}
				/>
			</div>
			<Divider height="50px" />
			<Members />
		</div>
	);
};

export default TeamMembersPage;
