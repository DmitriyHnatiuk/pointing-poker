import React from 'react';
import { useDispatch } from 'react-redux';

import { getGame, getMembers } from 'redux/reducer/selectors';
import { Game } from 'redux/reducer/gameSettingReducer/types';
import { User } from 'redux/reducer/userReducer/types';
import { setModalDataActionCreation } from 'redux/reducer/modalReducer';

import { useTypedSelector } from 'hooks/useTypedSelector';

import { TypeModalsOpen } from 'interfaces/modals';

import IssueCard from 'components/common/IssueCard';

import addIssueImage from 'assets/images/PlayingCard/add_card.svg';

import styles from './index.module.scss';

interface IssueList {
	admin?: boolean;
}

const Issues: React.FC<IssueList> = ({ admin }) => {
	const { isAdmin } = useTypedSelector<User>(getMembers);
	const { issues } = useTypedSelector<Game>(getGame);

	const dispatch = useDispatch();

	const onAddIssue = () => {
		return dispatch(
			setModalDataActionCreation({
				openModal: true,
				type: TypeModalsOpen.issue
			})
		);
	};

	return (
		<div id="issues" className={styles.container}>
			<h3 className={styles.title}>Issues:</h3>
			<div className={styles.issues}>
				{issues.map((issue) => (
					<IssueCard issue={issue} key={issue.id} isActive={!admin} />
				))}
				{isAdmin && (
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
				)}
			</div>
		</div>
	);
};

export default Issues;
