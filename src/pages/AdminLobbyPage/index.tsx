import AdminMenu from './AdminMenu';
import Issues from './Issues';
import Members from './Members';
import PlanningStatus from './PlanningStatus';

import styles from './index.module.scss';

const AdminLobbyPage = () => (
	<div className={styles.admin_lobby}>
		<PlanningStatus />
		<Members />
		<Issues />
		<AdminMenu />
	</div>
);

export default AdminLobbyPage;
