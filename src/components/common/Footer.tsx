import React from 'react';

import { RSS_HREF, GitHubItems } from 'constants/commonComponents';

import s from 'assets/styles/common/Footer.module.scss';

const Footer: React.FC = (): JSX.Element => {
	return (
		<footer className={s.footer}>
			<div className={s.container}>
				<div className={s.github}>
					<ul>
						{GitHubItems.map(({ id, href, name }) => {
							return (
								<li className={s.item} key={id}>
									<a
										className={s.link}
										href={href}
										target="_blank"
										rel="noreferrer">
										{name}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<div className={s.rss}>
					<a href={RSS_HREF} target="_blank" rel="noreferrer">
						<span className={s.year}>&apos;21</span>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
