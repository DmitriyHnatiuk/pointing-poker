import { MouseEvent, memo, useCallback } from 'react';

import { EVENTS } from 'src/constants/constRouter';
import { useAppDispatch, useTypedSelector } from 'src/hooks/useTypedSelector';

import DeleteImage from '_assets/images/CardPlayer/player-delete.svg?url';

import { IssueType } from '_redux/reducer/planningReducer/types';
import { selectUserData } from '_redux/reducer/userReducer/selectors';
import socketCreator from '_redux/thunk';

import Button from '../Button';

import { Link } from 'react-router-dom';
import styles from './index.module.scss';

type propsType = IssueType & { isPlanning?: boolean; isActive: boolean };

const IssueCard = ({ isPlanning, isActive, ...issue }: propsType) => {
	const dispatch = useAppDispatch();

	const { isAdmin } = useTypedSelector(selectUserData);

	const onDeleteIssue = useCallback((event: MouseEvent) => {
		event.stopPropagation();
		dispatch(socketCreator({ type: EVENTS.DELETE_ISSUE, id: issue.id }));
	}, []);

	const onActiveIssue = useCallback(() => {
		if (isAdmin && isPlanning) {
			dispatch(
				socketCreator({
					type: EVENTS.SELECT_ISSUE,
					id: issue.id
				})
			);
		}
	}, []);

	return (
		<div
			className={`${styles.card} ${
				isPlanning && isActive ? styles.active : ''
			} `}
			onClick={onActiveIssue}>
			<div className={styles.content}>
				<div>
					<span className={styles.issue} title={issue.title}>
						{issue.title}
					</span>

					<p className={styles.card_footer}>
						<span className={styles.priority}>{issue.priority} priority</span>
						<Link
							to={`//${issue.link}`}
							target="_blank"
							rel="noopener noreferrer">
							Link
						</Link>
					</p>
				</div>
				<div className={styles.delete}>
					{!isActive && isAdmin && (
						<Button variant="icon" onClick={onDeleteIssue}>
							<img src={DeleteImage} alt="delete" onClick={onDeleteIssue} />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(IssueCard);
