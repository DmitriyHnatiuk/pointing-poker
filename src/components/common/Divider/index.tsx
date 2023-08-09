import './divider.scss';

type StyleCustomType = Partial<{
	background: string;
	backgroundColor: string;
}>;

type DividerParamsType = {
	height?: string;
	top?: string;
	bottom?: string;
	className?: string;
	styleCustom?: StyleCustomType;
};

export const Divider = ({
	top,
	bottom,
	height,
	className = ' ',
	styleCustom
}: DividerParamsType) => {
	const style = {
		...(top ? { marginTop: top } : {}),
		...(bottom ? { marginBottom: bottom } : {}),
		...(height ? { height } : {})
	};

	return (
		<div
			className={className}
			style={{
				...style,
				...(styleCustom ? styleCustom : {})
			}}
		/>
	);
};
