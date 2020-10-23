// @packages
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const CtrlToastNotification = ({
    className,
    id,
    message,
    onClose,
    position,
    visible
}) => (
    <Snackbar
        action={(
            <>
                <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={onClose}
                    size="small"
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </>
        )}
        anchorOrigin={{
            vertical: position.vertical,
            horizontal: position.horizontal
        }}
        className={className}
        id={id}
        message={message}
        open={visible}

    />
);

CtrlToastNotification.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    position: PropTypes.shape({
        horizontal: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
        vertical: PropTypes.oneOf(['bottom', 'top']).isRequired
    }).isRequired,
    visible: PropTypes.bool.isRequired
};

CtrlToastNotification.defaultProps = {
    className: null
};

export default CtrlToastNotification;
