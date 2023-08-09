type PropsType = {
	title: string;
	author: string;
	subject: string;
};

export const infoData = ({ title, author, subject }: PropsType) => ({
	info: {
		title,
		author,
		subject
	}
});
