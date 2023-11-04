import { Stack, Snackbar, Alert as MuiAlert } from '@mui/material'
import React from 'react';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class SnackBar extends React.Component {
    state = {
        open: false,
        tipo:"error"
    }
    handleClick = () => {
        this.setState({ open: true });
    };
    handleClose = (event, reason) => {
        //console.log("propos de eventos", reason)
        if (reason === 'clickaway') {
            return;
        }
        this.props.cerra_snack()
    };
    render() {
        
        return (
            <>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={this.props.ver_snack} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={this.props.tipo_snack} sx={{ width: '100%' }}>
                    {this.props.mensaje}
                </Alert>
                    </Snackbar>
                </Stack>
            </>
        )
    }
}