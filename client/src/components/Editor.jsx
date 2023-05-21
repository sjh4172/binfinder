import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor({ value }) {
	// 렌더링 될때마다 modules생성되는 현상 방지
	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
					[{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
					[
						{ list: 'ordered' },
						{ list: 'bullet' },
						{ indent: '-1' },
						{ indent: '+1' },
						{ align: [] },
					],
				],
			},
		};
	}, []);

	return <ReactQuill {...value} id="body" modules={modules} />;
}
