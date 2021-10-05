import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';
import socketCreator, { DELETE_ISSUE, SELECT_ISSUE } from 'redux/thunk';

import { getGame, getMembers } from 'redux/reducer/selectors';
import { Issue } from 'redux/reducer/gameSettingReducer/types';
import { activeIssue } from 'redux/reducer/gameSettingReducer';

import deleteImage from 'assets/images/CardPlayer/player-delete.svg';

import styles from './index.module.scss';

const IssueCard: React.FC<{ issue: Issue; isActive?: boolean }> = ({
	issue,
	isActive
}) => {
	const { title, priority, active } = issue;

	const dispatch = useDispatch();
	const { isAdmin } = useTypedSelector(getMembers);
	const gameData = useTypedSelector(getGame);
	const onDeleteIssue = (event: MouseEvent) => {
		event.stopPropagation();
		dispatch(socketCreator({ type: DELETE_ISSUE, issue: { ...issue } }));
	};

	const onActiveIssue = () => {
		if (isAdmin) {
			if (isActive) {
				dispatch(activeIssue(issue));
				dispatch(
					socketCreator({
						type: SELECT_ISSUE,
						gameSettings: gameData
					})
				);
			}
		}
	};

	return (
		<section aria-hidden="true" className={styles.card} onClick={onActiveIssue}>
			{isActive && active && <div className={styles.active} />}
			<div className={styles.content}>
				<div className={styles.title}>
					<span className={styles.issue}>{title}</span>
					<span className={styles.priority}>{priority}</span>
				</div>
				<div className={styles.delete}>
					{!active && isAdmin && (
						<img
							src={deleteImage}
							alt="delete"
							title="Delete issue"
							onClick={onDeleteIssue}
							aria-hidden="true"
						/>
					)}
				</div>
			</div>
		</section>
	);
};

export default IssueCard;
