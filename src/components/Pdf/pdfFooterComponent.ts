import GitLogoIcon from '_assets/images/Footer/github.svg?source';
import RSIcon from '_assets/images/Footer/rss.svg?source';
import { GitHubRefs, RSS_HREF } from 'src/constants/commonComponents';

export const pdfFooterComponent = {
	footer: {
		fillColor: '#2b3a67',
		layout: 'noBorders',
		table: {
			widths: ['*'],
			body: [
				[
					{
						margin: [0, 2, 0, 0],
						layout: 'noBorders',
						table: {
							widths: ['50%', '50%'],
							body: [
								[
									{
										layout: 'noBorders',
										margin: [0, 0, 0, 0],
										table: {
											widths: ['30%', '*'],
											body: [
												[
													{
														margin: [40, 4, 0, 0],
														svg: GitLogoIcon,
														fit: [40, 30]
													},
													{
														alignment: 'left',
														margin: [-22, 0, 0, 0],
														layout: 'noBorders',
														fontSize: 11,
														color: '#fff',
														table: {
															widths: ['*'],
															body: [
																...GitHubRefs.map(({ name, href }) => [
																	{
																		text: name,
																		link: href,
																		bold: true,
																		lineHeight: 0.5
																	}
																])
															]
														}
													}
												]
											]
										}
									},
									{
										layout: 'noBorders',
										table: {
											widths: ['*', '20%'],
											body: [
												[
													{
														fit: [86, 30],
														alignment: 'right',
														margin: [0, 6, 0, 0],
														svg: RSIcon
													},
													{
														alignment: 'left',
														bold: true,
														color: '#fff',
														text: "'21",
														link: `${RSS_HREF}`,
														margin: [-10, 18, 0, 0],
														fontSize: 20,
														lineHeight: 0
													}
												]
											]
										}
									}
								]
							]
						}
					}
				]
			]
		}
	}
};
