import React from 'react';

import style from './index.module.scss';

export const Chat = () => {
	function setDate() {
		const d = new Date();
		if (d.getMinutes()) {
			const min = d.getMinutes();
			return (
				<div className={style.timestamp}>
					{d.getHours()}:{min}
				</div>
			);
		}
		return null;
	}

	return (
		<div className={style.chat}>
			<div className={style.chatTitle}>
				<h1>Alberico</h1>
				<h2>Admin</h2>

				<figure className={style.avatar}>
					<img src="#" alt="avatar" />
				</figure>
			</div>
			<div className={style.messages}>
				<ul className={style.messagesContent}>
					<li className={style.message}>
						<figure className={style.avatar}>
							<img src="#" alt="img.jpg" />
						</figure>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde eum
						commodi sed harum voluptas. Laboriosam maiores consequuntur ipsa
						{setDate()}
					</li>
					<li className={`${style.message} ${style.personal}`}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
						dolorum accusamus asperiores. Vel laboriosam odio sed! Eos rerum,
						aliquid ex fugiat voluptatem nihil, delectus nesciunt facilis
						accusantium eligendi necessitatibus repellat.
						{setDate()}
					</li>
				</ul>
			</div>
			<div className={style.box}>
				<textarea className={style.input} placeholder="Add message..." />
				<input type="submit" className={style.submit} value="Send" />
			</div>
		</div>
	);
};

export default Chat;
