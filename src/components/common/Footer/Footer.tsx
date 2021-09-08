import React from 'react';

import { RSS_HREF, GitHubItems } from 'constants/commonComponents';

import styles from './Footer.module.scss';

const Footer: React.FC = (): JSX.Element => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.github}>
					<ul>
						{GitHubItems.map(({ id, href, name }) => {
							return (
								<li className={styles.item} key={id}>
									<a
										className={styles.link}
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
				<div className={styles.rss}>
					<a href={RSS_HREF} target="_blank" rel="noreferrer">
						<span className={styles.year}>&apos;21</span>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
