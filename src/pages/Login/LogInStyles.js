import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: "#ECEFF1",
  },
  container: {
    overflow: 'auto',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
  },
  logo: {
    width: 70,
  },
  form: {
    margin: theme.spacing(2, 0),
    maxWidth: 320,
    width:"100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: theme.palette.common.white,
  },
  forgotPass: {
    marginTop: theme.spacing(1),
    "&:hover":{
      textDecoration: "underline",
    },
  },
  inputField: {
    minWidth: 320,
    maxWidth: 320,
    width: 320,
    ['@media (max-width:320px)']: { // eslint-disable-line no-useless-computed-key
      minWidth: 300,
      width: 300
    },
    backgroundColor: "white"
  },
  button: {
    maxWidth: 320,
    width: 320,
    ['@media (max-width:320px)']: { // eslint-disable-line no-useless-computed-key
      maxWidth: 300,
      width: 300
    },
    marginTop: theme.spacing(1)
  }
}));

export default useStyles;
