import React from 'react';
import { useDispatch } from 'react-redux';

import { getGame } from 'redux/reducer/selectors';
import { Game } from 'redux/reducer/gameSettingReducer/types';
import { addIssue } from 'redux/reducer/gameSettingReducer';

import { useTypedSelector } from 'hooks/useTypedSelector';

import IssueCard from 'components/common/IssueCard';

import addIssueImage from 'assets/images/PlayingCard/add_card.svg';

import styles from './index.module.scss';

const Issues: React.FC = (): JSX.Element => {
	const { issues } = useTypedSelector<Game>(getGame);

	const dispatch = useDispatch();

	const onAddIssue = () => {
		dispatch(addIssue());
	};

	return (
		<div id="issues" className={styles.container}>
			<h3 className={styles.title}>Issues:</h3>
			<div className={styles.issues}>
				{issues.map((issue) => (
					<IssueCard issue={issue} key={issue.id} />
				))}
				<div className={styles.new}>
					<div className={styles.newContent}>
						<span>Crete new Issue</span>
						<img
							src={addIssueImage}
							alt="add"
							title="Add issue"
							onClick={onAddIssue}
							aria-hidden="true"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Issues;
