import LogoIcon from '_assets/images/Header/header-logo.svg?source';

export const pdfHeaderComponent = {
	header: (currentPage: number, maxPage: number) => [
		{
			layout: 'noBorders',
			table: {
				widths: ['*'],
				heights: [25, 10],
				body: [
					[
						{
							text: '',
							border: [false],
							fillColor: '#2b3a67'
						}
					],
					[
						{
							text: '',
							border: [false],
							fillColor: '#65999b'
						}
					],
					[
						{
							svg: LogoIcon,
							border: [false],
							fit: [86, 56],
							absolutePosition: { x: 40, y: 5 }
						}
					],
					[
						{
							text: currentPage + ' of ' + maxPage,
							border: [false],
							alignment: 'right',
							absolutePosition: { x: 0, y: 20 },
							color: '#fff',
							fontSize: 10,
							bold: true
						}
					]
				]
			}
		}
	]
};
