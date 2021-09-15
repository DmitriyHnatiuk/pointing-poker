import React from 'react';

import Switch from 'components/common/Switch';
import Card from './Card';

import styles from './index.module.scss';

const AdminMenu: React.FC = (): JSX.Element => {
	return (
		<div id="adminLobbyMenu" className={styles.adminLobbyMenu}>
			<h2 className={styles.SettingsTitle}>Game settings:</h2>
			<div className={styles.settings}>
				<span>
					<h3>Scram master as player:</h3>
					<Switch />
				</span>
				<span>
					<h3>Changing card in round end:</h3>
					<Switch />
				</span>
				<span>
					<h3>Is timer needed:</h3>
					<Switch />
				</span>
				<span>
					<h3>Score type:</h3>
					<input type="text" placeholder="story point" />
				</span>
				<span>
					<h3>Score type (Short):</h3>
					<input type="text" placeholder="SP" />
				</span>
				<span>
					<h3>Round time:</h3>
					{/* Timer */} {/* soon to be implemented and applied */}
				</span>
				<ul className={styles.cardsWrapper}>
					<h2>Add card values:</h2>
					<Card />
				</ul>
			</div>
		</div>
	);
};

export default AdminMenu;
