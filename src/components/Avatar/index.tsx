import React from 'react';

import { InterfaceAvatar } from 'interfaces/commonComponents';

import styles from './index.module.scss';

const Avatar: React.FC<InterfaceAvatar> = (props) => {
	const { avatar, firstName, lastName, blockStyle, textStyle } = props;

	const AvatarInitials = () => {
		if (lastName) {
			return (
				<span className={`${styles.initials} ${textStyle}`}>
					{firstName?.trim()[0]}
					{lastName.trim()[0]}
				</span>
			);
		}
		return (
			<span className={`${styles.initials} ${textStyle}`}>
				{firstName?.trim()[0]}
				{firstName?.trim()[1]}
			</span>
		);
	};

	const AvatarImg = (): JSX.Element => {
		const blob = new Blob([avatar]);
		const image = URL.createObjectURL(blob);

		return (
			<>
				<img className={styles.image} src={image} alt="" />
			</>
		);
	};

	return (
		<div className={`${styles.avatar} ${blockStyle}`}>
			{avatar ? <AvatarImg /> : <AvatarInitials />}
		</div>
	);
};

export default Avatar;
