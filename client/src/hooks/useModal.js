import { useCallback, useState } from 'react';

export default function useModal(initvalue) {
	const [isOpenModal, setIsOpenModal] = useState(initvalue);
	const openModal = useCallback(() => {
		setIsOpenModal(true);
		document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
	}, []);
	const closeModal = useCallback(() => {
		setIsOpenModal(false);
		const scrollY = document.body.style.top;
		document.body.style.cssText = '';
		window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
	}, []);

	return [isOpenModal, openModal, closeModal];
}
