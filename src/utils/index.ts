const isIncludeProtocol = (link: string) =>
	link.startsWith('http:/') || link.startsWith('https:/');

export const generateUrl = (link: string) =>
	isIncludeProtocol(link) ? link : `http://${link}`;

export const getLink = (link: string) =>
	isIncludeProtocol(link) ? link.split('://')[1] : link;
