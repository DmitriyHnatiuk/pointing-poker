import React from 'react';

import { InterfaceAvatar } from 'interfaces/commonComponents';

import styles from './index.module.scss';

const Avatar: React.FC<InterfaceAvatar> = (props) => {
	const { avatar, firstName, lastName } = props;

	const AvatarInitials = () => {
		if (lastName) {
			return (
				<span className={styles.initials}>
					{firstName?.trim()[0]}
					{lastName.trim()[0]}
				</span>
			);
		}
		return (
			<span className={styles.initials}>
				{firstName?.trim()[0]}
				{firstName?.trim()[1]}
			</span>
		);
	};

	const AvatarImg = (): JSX.Element => {
		const image = URL.createObjectURL(avatar);
		return (
			<>
				<img className={styles.image} src={image} alt="" />
			</>
		);
	};

	return (
		<div className={styles.avatar}>
			{avatar ? <AvatarImg /> : <AvatarInitials />}
		</div>
	);
};

export default Avatar;
