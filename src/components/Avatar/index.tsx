import { AvatarType } from 'src/interfaces/commonComponents';

import styles from './index.module.scss';

const AvatarImg = ({ avatar, title }: { avatar: string; title: string }) => (
	<img
		className={styles.image}
		src={avatar}
		alt="avatar"
		title={title}
		loading="lazy"
	/>
);

const Avatar = ({ avatar, nameInitials, style = '', title }: AvatarType) => (
	<div className={`${styles.avatar_wrapper} ${style}`}>
		{avatar ? (
			<AvatarImg avatar={avatar} title={title} />
		) : (
			<span className={styles.initials} title={title}>
				{nameInitials}
			</span>
		)}
	</div>
);

export default Avatar;
