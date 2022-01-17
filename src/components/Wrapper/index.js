import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Wrapper = (props) => {
	const { page, children } = props;
	return(
		<div className="wrapper" id={page}>
			{children}
		</div>
	);
};

Wrapper.propTypes = {
	page: PropTypes.string,
	children: PropTypes.any
};

Wrapper.defaultProps = {
	page: ''
};

export default Wrapper;