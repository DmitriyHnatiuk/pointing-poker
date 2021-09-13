import React from 'react';

import styles from './index.module.scss';

export const Chat: React.FC = (): JSX.Element => {
	function setDate() {
		const d = new Date();
		if (d.getMinutes()) {
			const min = d.getMinutes();
			return (
				<div className={styles.timestamp}>
					{d.getHours()}:{min}
				</div>
			);
		}
		return null;
	}

	return (
		<div className={styles.chat}>
			<div className={styles.chatTitle}>
				<h1>Alberico</h1>
				<h2>Admin</h2>

				<figure className={styles.avatar}>
					<img src="#" alt="avatar" />
				</figure>
			</div>
			<div className={styles.messages}>
				<ul className={styles.messagesContent}>
					<li className={styles.message}>
						<figure className={styles.avatar}>
							<img src="#" alt="img.jpg" />
						</figure>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde eum
						commodi sed harum voluptas. Laboriosam maiores consequuntur ipsa
						{setDate()}
					</li>
					<li className={`${styles.message} ${styles.personal}`}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
						dolorum accusamus asperiores. Vel laboriosam odio sed! Eos rerum,
						aliquid ex fugiat voluptatem nihil, delectus nesciunt facilis
						accusantium eligendi necessitatibus repellat.
						{setDate()}
					</li>
				</ul>
			</div>
			<div className={styles.box}>
				<textarea className={styles.input} placeholder="Add message..." />
				<input type="submit" className={styles.submit} value="Send" />
			</div>
		</div>
	);
};

export default Chat;
