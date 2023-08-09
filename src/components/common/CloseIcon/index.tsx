import CloseImage from '_assets/images/close-icon.png';

type PropsType = Partial<{
	width: number;
	height: number;
}>;

export const CloseIcon = ({ width = 18, height = 18 }: PropsType) => (
	<img
		src={CloseImage}
		alt="close_icon"
		width={width}
		height={height}
		loading="lazy"
	/>
);
