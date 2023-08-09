import { ResultType } from '_redux/reducer/ResultReducer/types';
import { IssueType } from '_redux/reducer/planningReducer/types';
import { CardsDataType } from '_redux/reducer/usersVote/selectors';
import pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { fonts } from 'src/components/Pdf/fonts';

import { pdfFooterComponent } from 'src/components/Pdf/pdfFooterComponent';
import { pdfHeaderComponent } from 'src/components/Pdf/pdfHeaderComponent';
import { infoData } from 'src/components/Pdf/pdfInfo';
import { pdfContent } from 'src/components/Pdf/resultContent';

pdfMake.fonts = fonts;

export type ParamsType = {
	issues: Record<string, IssueType>;
	result: ResultType;
	resultCards: Record<string, { data: CardsDataType; list: string[] }>;
	planningTitle: string;
	author: string;
	scoreType: string;
};

const generatePdf = (params: ParamsType): TDocumentDefinitions => ({
	pageSize: 'A4',
	pageMargins: [40, 60, 40, 50],
	...pdfHeaderComponent,
	...pdfFooterComponent,
	...infoData({
		title: 'Planning',
		subject: params.planningTitle,
		author: params.author
	}),
	...pdfContent(params)
});

export const downloadPdf = (data: ParamsType) => {
	const pdf = pdfMake.createPdf(generatePdf(data));
	pdf.download();
};
