import { useState, useEffect } from 'react';

export default function useMediaQuery(query = '(max-width: 768px)') {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		setMatches(mediaQuery.matches);

		const handleResize = () => {
			setMatches(mediaQuery.matches);
		};

		mediaQuery.addEventListener('change', handleResize);
		return () => mediaQuery.removeEventListener('change', handleResize);
	}, [query]);

	return matches;
}
