import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from 'hooks/useTypedSelector';

import { getMembers } from 'redux/reducer/selectors';
import { Issue } from 'redux/reducer/gameSettingReducer/types';
import { deleteIssue } from 'redux/reducer/gameSettingReducer';

import deleteImage from 'assets/images/CardPlayer/player-delete.svg';

import styles from './index.module.scss';

const IssueCard: React.FC<{ issue: Issue }> = ({ issue }) => {
	const dispatch = useDispatch();
	const { isAdmin } = useTypedSelector(getMembers);

	const { title, priority } = issue;

	const onDeleteIssue = () => {
		dispatch(deleteIssue(issue));
	};

	return (
		<section className={styles.card}>
			<div className={styles.content}>
				<div className={styles.title}>
					<span className={styles.issue}>{title}</span>
					<span className={styles.priority}>{priority}</span>
				</div>
				<div className={styles.delete}>
					{isAdmin && (
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
