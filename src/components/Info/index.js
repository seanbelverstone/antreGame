import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@mui/styles';
import './style.css';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		minWidth: '40vh'
	},
}));

// Props passed to this component must be in the following format:
/*
const exampleProps = {
    title: '',
    main: [
        {
            header: '',
            subheading: ''
            body: ''
        }
        ...
    ]
};
<Info infoProps={exampleProps} />
*/

const Info = (props) => {
	const { infoProps, optionFade } = props;
	const classes = useStyles();
	const [hover, setHover] = useState(false);

	const onHover = () => setHover(true);
	const onLeave = () => setHover(false);
	return (
		<div className={optionFade}>
			<InfoIcon className="infoIcon" onMouseEnter={onHover} onMouseLeave={onLeave} onClick={onHover} />
			{hover ? (
				<div className={classes.paper } id="dialog" onMouseEnter={onHover} onMouseLeave={onLeave}>
					<h2 style={{ textAlign: 'center' }}>{infoProps.title}</h2>
					{infoProps.main.map(prop => (
						<React.Fragment key={prop.header.toLowerCase()}>
							<h3 className="key"id={prop.header.toLowerCase()}>{prop.header}</h3>
							{prop?.subheading ? <div className="subheading" style={{color: 'darkred'}}>{prop.subheading}</div> : ''}
							<div className="dialogBody">{prop.body}</div>
						</React.Fragment>
					))}
				</div>)
				: <> </>

			}
		</div>
	);
};

Info.propTypes = {
	infoProps: PropTypes.object,
	optionFade: PropTypes.string
};

Info.defaultProps = {
	infoProps: {},
	optionFade: ''
};

export default Info;