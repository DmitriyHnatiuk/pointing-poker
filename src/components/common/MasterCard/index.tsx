import { selectSortedUsers } from '_redux/reducer/userReducer/selectors';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import PlayerCard from '../UserCard';

import styles from './index.module.scss';

type PropsType = {
	style?: string;
};

const MasterCard = ({ style = '' }: PropsType) => {
	const { admin } = useTypedSelector(selectSortedUsers);

	return (
		<div className={styles.master_container}>
			<span className={styles.title_status}>Scram master:</span>
			{admin && <PlayerCard {...admin} style={style} />}
		</div>
	);
};

export default MasterCard;
