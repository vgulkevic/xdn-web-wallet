import {createMuiTheme} from "@material-ui/core/styles";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import {deepPurple, indigo} from "@material-ui/core/colors";


let theme = createMuiTheme({
    palette: {
        primary: {
            main: deepPurple[600]
        },
        secondary: {
            main: indigo[600]
        },
        background: {
            default: "#ECEFF1",
        },
    },
    typography: {
        fontFamily: 'Arimo, Helvetica, Arial, sans-serif',
        button: {
            fontFamily: "'Arimo', 'Helvetica', 'Arial', sans-serif",
            textTransform: "none",
            fontWeight: 400
        }
    }
});

theme = responsiveFontSizes(theme);

export default theme;