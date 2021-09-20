import React from 'react';

import MyButton from 'components/common/MyButton';
import { btn } from 'constants/commonComponents';

import { InterfaceModalsKick } from 'interfaces/modals';

import styles from './index.module.scss';

const { YES, NO } = btn;

const ModalKick: React.FC<InterfaceModalsKick> = (props) => {
	const { open, playerKick, player, vote } = props;

	const closeModal = () => open(false);

	const TypeKickModal = (): JSX.Element => {
		if (vote) {
			return (
				<div className={styles.content}>
					<h2 className={styles.title}>Kick </h2>
					<p className={styles.text}>
						<span className={styles.player}>{player} </span>
						want to kick member
						<span className={styles.player}> {playerKick} </span>
						Do you agree with it?
					</p>
				</div>
			);
		}

		return (
			<div className={styles.content}>
				<h2 className={styles.title}>Kick player? </h2>
				<p className={styles.text}>
					Are you really want to remove player
					<span className={styles.player}>` ${player} `</span>
					from game session?
				</p>
			</div>
		);
	};

	const TypeSubmitBtn = () => {
		return vote ? console.log('vote') : console.log('admin');
	};

	return (
		<div className={styles.kickModal}>
			<TypeKickModal />
			<div className={styles.buttons}>
				<MyButton value={YES} onclick={TypeSubmitBtn} />
				<MyButton value={NO} onclick={closeModal} style={styles.cancel} />
			</div>
		</div>
	);
};

export default ModalKick;
