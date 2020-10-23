// @packages
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const CtrlSearchEngineResult = ({
    className,
    classes,
    id,
    results,
    title,
    total,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const ctrlSearchEngineResultClassName = classNames(
        className,
        classes.ctrlSearchEngineResult
    );

    const renderResults = results.map((item, index) => (
        <div key={`${id}-${item.name}-${index}`}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.thumbnail} />
                </ListItemAvatar>
                <ListItemText
                    primary={(
                        <>
                            <Link href={item.link}>{item.title}</Link>
                            {' - '}
                            <Typography variant="caption">
                                <Link href={item.link}>{item.link}</Link>
                            </Typography>
                        </>
                    )}
                    secondary={(
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            {item.description}
                        </Typography>
                    )}
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    ));

    return (
        <Paper className={ctrlSearchEngineResultClassName} id={id}>
            <Grid
                alignItems="flex-end"
                container
                direction="row"
                justify="center"
                spacing={1}
            >
                <Grid item>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="caption">{total}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
            >
                <Grid item>
                    <List>
                        {renderResults}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

CtrlSearchEngineResult.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        title: PropTypes.string,
        link: PropTypes.string,
        thumbnail: PropTypes.string
    })),
    title: PropTypes.string.isRequired,
    total: PropTypes.string,
    visible: PropTypes.bool.isRequired
};

CtrlSearchEngineResult.defaultProps = {
    className: null,
    results: [],
    total: ''
};

export default withStyles(styles)(CtrlSearchEngineResult);
