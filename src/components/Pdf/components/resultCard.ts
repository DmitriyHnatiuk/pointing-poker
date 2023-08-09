import { CardsDataType } from '_redux/reducer/usersVote/selectors';
import { getInterest } from 'src/utils/getPlayingCards';

type ResultCardPropsType = {
	score: string;
	scoreType: string;
	count: number;
};

const resultCard = ({ score, scoreType, count }: ResultCardPropsType) => ({
	width: 100,
	unbreakable: true,
	table: {
		widths: [100],
		body: [
			[
				{
					text: score,
					bold: true,
					alignment: 'left',
					fontSize: 14,
					border: [true, true, true, false]
				}
			],
			[
				{
					text: scoreType,
					alignment: 'center',
					margin: [0, 20, 0, 0],
					bold: true,
					fontSize: 22,
					border: [true, false, true, false]
				}
			],
			[
				{
					text: `${count}%`,
					alignment: 'center',
					margin: [0, 0, 0, 26],
					bold: true,
					fontSize: 22,
					border: [true, false, true, false]
				}
			],
			[
				{
					text: score,
					bold: true,
					alignment: 'right',
					border: [true, false, true, true]
				}
			]
		]
	}
});

type PropsType = {
	cards: { data: CardsDataType; list: string[] };
	scoreType: string;
};

type RowType = {
	columnGap: number;
	margin: number[];
	columns: { [key: string]: any }[];
};

type PrevType = {
	arr: RowType[];
	row: RowType;
};

export const renderCards = ({ cards, scoreType }: PropsType) => {
	const data = cards.list.reduce(
		(prev: PrevType, cardId) => {
			const card = cards.data[cardId];
			const count = getInterest({
				count: card.count,
				length: cards.list.length
			});
			const vote = resultCard({ score: card.score, count, scoreType });
			return prev.row.columns.length === 4
				? {
						arr: [...prev.arr, prev.row],
						row: { ...prev.row, columns: [vote] }
				  }
				: {
						...prev,
						row: { ...prev.row, columns: [...prev.row.columns, vote] }
				  };
		},

		{
			arr: [],
			row: { columnGap: 20, margin: [15, 10, 0, 0], columns: [] }
		}
	);

	return [...data.arr, data.row];
};
