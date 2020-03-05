import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#BB86FC'
        },
        secondary: {
            main: '#03DAC6'
        },
        error: {
            main: '#CF6679'
        },
        background: {
            default: '#212121',
            paper: '#424242'
        },
        text: {
            primary: '#F5F5F5',
            secondary: '#E0E0E0'
        }
    }
});

export default theme;
