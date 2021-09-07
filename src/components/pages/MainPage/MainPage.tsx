import React from 'react';

import MyButton from 'components/common/MyButton';
import MyInput from 'components/common/MyInput';

import poker from 'assets/images/MainPage/poker-planning.jpg';

import s from 'assets/styles/pages/MainPage.module.scss';

const MainPage: React.FC = (): JSX.Element => {
	return (
		<div className={s.main_page}>
			<div className={s.container}>
				<section className={s.section}>
					<div className={s.logo}>
						<img src={poker} alt="Poker-planning" />
					</div>
					<div className={s.start}>
						<h3>Start your planning:</h3>
						<span>Create session:</span>
						<MyButton>Start new game</MyButton>
					</div>
					<div className={s.or}>
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
