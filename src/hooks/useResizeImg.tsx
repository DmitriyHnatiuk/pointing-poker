import { useState } from 'react';

type ParamsType = {
	width: number;
	quality?: number;
};
type imgDataType = { file: File | null; url: string | null };

export const useResizeImg = ({ width, quality = 1 }: ParamsType) => {
	const [imgData, setImgDate] = useState<imgDataType>({
		file: null,
		url: null
	});

	const setResizeImg = (fileData: File) => {
		const compressImage = (data: any, width: number) => {
			const img = new Image();
			img.src = data;
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const context = canvas.getContext('2d');
				const ratio = width / img.width;
				canvas.width = width;
				canvas.height = img.height * ratio;
				context?.drawImage(img, 0, 0, canvas.width, canvas.height);

				canvas.toBlob(
					(blob) => {
						if (blob) {
							const reader = new FileReader();
							const file = new File([blob], fileData.name, blob);

							reader.onload = (event) => {
								if (event.target?.result) {
									setImgDate({
										file: file,
										url: event.target.result.toString()
									});
								}
							};
							reader.readAsDataURL(blob);
						}
					},
					'image/webp',
					quality
				);
			};
		};

		const reader = new FileReader();
		reader.onload = (event) => {
			if (event.target?.result) {
				compressImage(event.target.result, width);
			}
		};
		reader.readAsDataURL(fileData);
	};
	return { imgData, setResizeImg };
};
