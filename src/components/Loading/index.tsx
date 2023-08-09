import { selectLoading } from '_redux/reducer/loading/selectors';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import Modals from '../Modals';
import styles from './index.module.scss';

const Loading = () => <div className={styles.loading} />;

export const Loader = () => {
	const isLoader = useTypedSelector(selectLoading);

	return (
		<Modals isOpen={isLoader}>
			<Loading />
		</Modals>
	);
};

export default Loading;
