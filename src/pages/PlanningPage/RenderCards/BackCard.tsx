import { CARDS_BACK } from '_assets/images/CardBack';
import { selectPlanningSettings } from '_redux/reducer/planningReducer/selectors';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import styles from './index.module.scss';

export const BackCard = () => {
	const { typeCards } = useTypedSelector(selectPlanningSettings);

	return (
		<div className={styles.back}>
			<img
				className={styles.image_back}
				src={require(`_assets/images/CardBack/${CARDS_BACK[typeCards].name}`)}
				alt={`card_${typeCards}`}
				loading="lazy"
			/>
		</div>
	);
};
