import { selectResult } from '_redux/reducer/ResultReducer/selectors';
import {
	selectIssues,
	selectPlanningSettings
} from '_redux/reducer/planningReducer/selectors';
import { selectSortedUsers } from '_redux/reducer/userReducer/selectors';
import { selectResultCards } from '_redux/reducer/usersVote/selectors';

import { downloadPdf } from 'src/components/Pdf';

import Button from 'src/components/common/Button';
import { Divider } from 'src/components/common/Divider';
import IssueCard from 'src/components/common/IssueCard';
import PlayingCard from 'src/components/common/PlayingCard';

import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { getInterest } from 'src/utils/getPlayingCards';

import styles from './import.module.scss';

const ResultPage = () => {
	const result = useTypedSelector(selectResult);
	const issues = useTypedSelector(selectIssues);
	const { planningTitle, scoreType } = useTypedSelector(selectPlanningSettings);
	const resultCards = useTypedSelector(selectResultCards);
	const { admin } = useTypedSelector(selectSortedUsers);

	const generatePDF = () => {
		downloadPdf({
			author: `${admin?.firstName || ''} ${admin?.lastName || ''}`,
			issues,
			result,
			resultCards,
			planningTitle,
			scoreType
		});
	};

	return (
		<>
			<div className={styles.result_container}>
				<h1 className="title-2 m-0-5">{planningTitle}</h1>

				{Object.keys(result).map((issueId) => (
					<div className={styles.result} key={issueId}>
						<IssueCard {...issues[issueId]} isActive />
						<ul className={styles.cards}>
							{Object.keys(result[issueId]).map((voterId) => (
								<li key={voterId}>
									<PlayingCard
										{...resultCards[issueId].data[
											result[issueId][voterId].cardId
										]}
										inStatistics
									/>
									<span>
										{getInterest({
											count:
												resultCards[issueId].data[
													result[issueId][voterId].cardId
												].count,
											length: resultCards[issueId].list.length
										})}
										%
									</span>
								</li>
							))}
						</ul>
						<Divider height="20px" />
					</div>
				))}
			</div>

			<Button
				style={styles.result_save}
				onClick={generatePDF}
				children="Save statistic"
			/>
		</>
	);
};

export default ResultPage;
