export default () => ({
    loadingPage: {
    },
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 1000
    },
    centerPanel: {
        left: '50%',
        position: 'fixed',
        textAlign: 'center',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000 + 1
    }
});
