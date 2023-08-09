import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { generateUrl } from 'src/utils';

import { line } from './components/line';
import { renderCards } from './components/resultCard';

import { ParamsType } from '.';

export const pdfContent = ({
	planningTitle,
	result,
	issues,
	scoreType,
	resultCards
}: ParamsType): TDocumentDefinitions => {
	return {
		content: [
			{
				margin: [0, 30, 0, 0],
				alignment: 'center',
				bold: true,
				link: process.env.DOMAIN,
				text: planningTitle,
				fontSize: 16
			},
			line,
			{
				layout: 'noBorders',
				table: {
					widths: ['*'],
					body: [
						[
							result
								? Object.keys(result).map((issueId) => ({
										border: [false],
										layout: 'noBorders',
										widths: ['*'],
										table: {
											widths: ['*'],
											heights: [10],
											body: [
												[
													{
														text: issues[issueId].title,
														margin: [10, 0, 10, 0],
														bold: true
													}
												],
												[
													{
														columnGap: 10,
														columns: [
															{
																width: 'auto',
																text: `${issues[issueId].priority} priority`,
																fontSize: 8
															},
															{
																width: 'auto',
																text: 'Link',
																color: 'blue',
																link: generateUrl(issues[issueId].link),
																fontSize: 8
															}
														]
													}
												],
												[
													renderCards({
														scoreType,
														cards: resultCards[issueId]
													})
												],
												[line]
											]
										}
								  }))
								: ''
						]
					]
				}
			}
		]
	};
};
