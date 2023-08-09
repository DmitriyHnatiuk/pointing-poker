import { Link } from 'react-router-dom';

import GitLogoIcon from 'src/assets/images/Footer/github.svg?url';
import RSSLogoIcon from 'src/assets/images/Footer/rss.svg?url';
import { GitHubRefs, RSS_HREF } from 'src/constants/commonComponents';

import styles from './index.module.scss';

const Footer = () => (
	<footer className={styles.footer}>
		<div className={styles.container}>
			<div className={styles.github}>
				<img src={GitLogoIcon} alt="git logo" width={30} loading="lazy" />

				<ul className="text-align-start">
					{GitHubRefs.map(({ href, name }) => (
						<li className={styles.item} key={href}>
							<Link
								className={styles.link}
								to={href}
								target="_blank"
								rel="noreferrer">
								{name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.rss}>
				<Link to={RSS_HREF} target="_blank" rel="noreferrer">
					<img src={RSSLogoIcon} alt="rss logo" loading="lazy" />
					<span className={styles.year}>&apos;21</span>
				</Link>
			</div>
		</div>
	</footer>
);

export default Footer;
