import { Divider } from 'src/components/common/Divider';
import { PlanningBoard } from './PlanningBoard';
import { UsersScore } from './UsersScore';

import styles from './index.module.scss';

const PlanningPage = () => (
	<div className={styles.container}>
		<PlanningBoard />
		<Divider className={styles.border} />
		<UsersScore />
	</div>
);

export default PlanningPage;
