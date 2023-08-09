import { ReactNode } from 'react';

import Chat from '../common/Chat';

import { Loader } from '../Loading';
import GlobalModal from '../Modals/GlobalModals';
import styles from './index.module.scss';

const Main = ({ children }: { children: ReactNode }) => (
	<>
		<main className={styles.main_container}>
			<div className={styles.content}>{children}</div>

			<Chat />
			<GlobalModal />
			<Loader />
		</main>
	</>
);

export default Main;
