import { selectSortedUsers } from '_redux/reducer/userReducer/selectors';
import PlayerCard from 'src/components/common/UserCard';
import { useTypedSelector } from 'src/hooks/useTypedSelector';

import styles from './index.module.scss';

const Members = () => {
	const { users } = useTypedSelector(selectSortedUsers);

	return (
		<>
			<h3 className="title-3 text-align-center">Members:</h3>
			{users.length ? (
				<ul className={styles.members_content}>
					{users.map((user) => (
						<li key={user.id}>
							<PlayerCard {...user} />
						</li>
					))}
				</ul>
			) : (
				<h4 className="text-align-center text">Waiting for team members...</h4>
			)}
		</>
	);
};

export default Members;
