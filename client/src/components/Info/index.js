import React, { useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
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
        minWidth: "40vh"
    },
}));

// Props passed to this component must be in the following format:
/*
const exampleProps = {
    title: '',
    subheadings: [
        {
            header: '',
            body: ''
        }
        ...
    ]
};
<Info infoProps={exampleProps} />
*/

const Info = (props) => {
    const { infoProps, optionFade } = props;
    console.log(infoProps);
    const classes = useStyles();
    const [hover, setHover] = useState(false);

    const onHover = () => setHover(true);
    const onLeave = () => setHover(false);
    return (
        <div className={optionFade}>
            <InfoIcon className="infoIcon" onMouseEnter={onHover} onMouseLeave={onLeave} />
            {hover ? (
                <div className={classes.paper } id="dialog" onMouseEnter={onHover} onMouseLeave={onLeave}>
                    <h2 style={{ textAlign: 'center' }}>{infoProps.title}</h2>
                    {infoProps.subheadings.map(prop => (
                        <React.Fragment key={prop.header.toLowerCase()}>
                            <h4 className="key"id={prop.header.toLowerCase()}>{prop.header}</h4>
                            <p>{prop.body}</p>
                        </React.Fragment>
                    ))}
                </div>)
                : <> </>

            }
        </div>
    )
}

export default Info;