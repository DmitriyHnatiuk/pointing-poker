import React from 'react';
import { useDispatch } from 'react-redux';

import { Issue } from 'redux/reducer/gameSettingReducer/types';
import { deleteIssue } from 'redux/reducer/gameSettingReducer';

import deleteImage from 'assets/images/CardPlayer/player-delete.svg';

import styles from './index.module.scss';

const IssueCard: React.FC<{ issue: Issue }> = ({ issue }) => {
	const { title, priority } = issue;

	const dispatch = useDispatch();

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
					<img
						src={deleteImage}
						alt="delete"
						title="Delete issue"
						onClick={onDeleteIssue}
						aria-hidden="true"
					/>
				</div>
			</div>
		</section>
	);
};

export default IssueCard;
