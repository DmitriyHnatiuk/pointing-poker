declare module '*.jpg';
declare module '*.webp';
declare module '*.png';
declare module '*.woff2';
declare module '*.woff';
declare module '*.ttf';

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.svg' {
	import React from 'react';

	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	export { ReactComponent };

	export default string;
}

declare module '*.svg?url' {
	const value: string;

	export default value;
}

declare module '*.svg?source' {
	const value: string;

	export default value;
}
