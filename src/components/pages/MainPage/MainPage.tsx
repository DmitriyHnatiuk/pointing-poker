import React from 'react';

import MyButton from 'components/common/MyButton/MyButton';
import MyInput from 'components/common/MyInput/MyInput';

import pokerPlanningImage from 'assets/images/MainPage/poker-planning.jpg';

import styles from './MainPage.module.scss';

const MainPage: React.FC = (): JSX.Element => {
	return (
		<div className={styles.main_page}>
			<div className={styles.container}>
				<section className={styles.section}>
					<div className={styles.logo}>
						<img src={pokerPlanningImage} alt="Poker-planning" />
					</div>
					<div className={styles.start}>
						<h3>Start your planning:</h3>
						<span>Create session:</span>
						<MyButton>Start new game</MyButton>
					</div>
					<div className={styles.or}>
						<h3>OR:</h3>
						<span>Connect to lobby:</span>
						<form>
							<MyInput />
							<MyButton>Connect</MyButton>
						</form>
					</div>
				</section>
			</div>
		</div>
	);
};

export default MainPage;
