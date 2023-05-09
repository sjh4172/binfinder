import { useState, useCallback } from 'react';

export default function useInput(initialValue = '') {
	const [value, setValue] = useState(initialValue);

	const bind = {
		value,
		onChange: useCallback((e) => {
			setValue(e.target.value);
		}, []),
	};

	const reset = useCallback(() => {
		setValue(initialValue);
	}, []);

	return [bind, reset];
}
