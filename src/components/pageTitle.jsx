import useTitle from '../utils/useTitle';

function PageTitle({ title, ...props }) {
	useTitle(title);

	return props.children;
}

export default PageTitle;
