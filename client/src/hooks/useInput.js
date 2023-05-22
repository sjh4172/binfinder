import { useState, useCallback } from 'react';

export default function useInput(initialValue = '', isEditor = false) {
	const [value, setValue] = useState(initialValue);

	const bind = {
		value,
		onChange: useCallback((e) => {
			const chageValue = isEditor ? e : e.target.value;
			setValue(chageValue);
		}, []),
	};

	const reset = useCallback(() => {
		setValue(initialValue);
	}, []);

	return [bind, reset];
}
