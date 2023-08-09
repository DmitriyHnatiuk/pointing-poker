import { memo, useCallback, useState } from 'react';

import { useTypedSelector } from 'src/hooks/useTypedSelector';

import AddIssueImage from '_assets/images/PlayingCard/add_card.svg?url';

import {
	selectActiveIssueId,
	selectIssues
} from '_redux/reducer/planningReducer/selectors';
import { selectUserData } from '_redux/reducer/userReducer/selectors';

import Modals from 'src/components/Modals';
import IssueModal from 'src/components/Modals/IssueModal';
import Button from 'src/components/common/Button';
import IssueCard from 'src/components/common/IssueCard';

import styles from './index.module.scss';

const AddIssueButton = memo(
	({ openIssueModal }: { openIssueModal: () => void }) => {
		return (
			<div className={styles.new_content}>
				<span className="text">Create new Issue</span>
				<Button onClick={openIssueModal} variant="icon">
					<img src={AddIssueImage} alt="Add issue" width={25} height={25} />
				</Button>
			</div>
		);
	}
);

const AddIssue = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const openIssueModal = useCallback(() => setModalOpen((prev) => !prev), []);

	return (
		<>
			<AddIssueButton openIssueModal={openIssueModal} />
			<Modals isOpen={isModalOpen} onClose={openIssueModal}>
				<IssueModal onClose={openIssueModal} />
			</Modals>
		</>
	);
};

const Issues = ({
	isPlanning,
	className = ''
}: {
	isPlanning?: boolean;
	className?: string;
}) => {
	const issues = useTypedSelector(selectIssues);
	const { isAdmin } = useTypedSelector(selectUserData);
	const activeIssueId = useTypedSelector(selectActiveIssueId);

	return (
		<div className={className}>
			<h3 className="title-3">Issues:</h3>
			<div className={styles.issues}>
				{Object.keys(issues).length || isAdmin ? (
					Object.values(issues).map((issue) => (
						<IssueCard
							{...issue}
							key={issue.id}
							isPlanning={isPlanning}
							isActive={activeIssueId === issue.id}
						/>
					))
				) : (
					<p className="m-auto"> In process...</p>
				)}
				{isAdmin && <AddIssue />}
			</div>
		</div>
	);
};

export default memo(Issues);
