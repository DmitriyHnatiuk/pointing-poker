import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PropsType = { children: ReactNode };

export const Portal = ({ children }: PropsType) => {
	const [container] = useState(() => document.createElement('div'));

	useEffect(() => {
		document.body.appendChild(container);
		return () => {
			document.body.removeChild(container);
		};
	}, []);

	return createPortal(children, container);
};
