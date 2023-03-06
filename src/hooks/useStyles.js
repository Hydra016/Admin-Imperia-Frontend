import { makeStyles } from "@material-ui/core/styles";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const drawerWidth = 250;

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7B00",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 800,
  },
});

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // height: '100%'
  },
  imageContainer: {
    background: "linear-gradient(to bottom, #f5f5f5, #fafafa)",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  image: {
    backgroundImage: "url(./imperia.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signupTextButton: {
    textDecoration: "none",
  },
  drawer: {
    width: drawerWidth,
  },
  sideBar: {
    width: drawerWidth,
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: 500,
  },
  toolbar: {
    width: "100%",
    height: "100vh",
    // border: '1px solid red'
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  signupContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  signupForm: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  signupFormField: {
    flexBasis: "49%",
    marginBottom: 10,
  },
  signupFormFieldInstructions: {
    flexBasis: "49%",
    marginBottom: 10,
  },
  signupFirstContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  signupSecondContainer: {
    display: "flex",
    flexBasis: "30%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  signupThirdContainer: {
    flexBasis: "69%",
  },
  fileContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  fileContainerIngredients: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  ingredientsContainer: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "49.5%",
  },
  noItemText: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  ingTextFieldsContainer: {
    border: "1px dashed grey",
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    marginTop: 10,
    maxHeight: "100%",
  },
  inputMainContainer: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
  },
  inputFiles: {
    flexBasis: "49.5%",
  },
  inputContainer: {
    border: "1px dashed grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: 200,
    flexBasis: "49.5%",
  },
  inputButton: {
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
    zIndex: 1000,
  },
  inputIcon: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  uploadImage: {
    marginTop: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 4,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  submitButtonContainer: {
    width: "20%",
    marginTop: 10,
    marginBottom: 10,
    position: "relative",
  },
  submitInput: {
    backgroundColor: "#FF7B00",
    marginTop: 50,
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF7B00",
    padding: 10,
    borderRadius: 5,
    color: "#FFFF",
  },
  avatarImage: {
    border: "1px dashed grey",
    width: 150,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    borderRadius: 500,
    cursor: "pointer",
    overflow: "hidden",
  },
  avatarInput: {
    height: "100%",
    opacity: 0,
    zIndex: 999,
  },
  avatarIcon: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    marginLeft: 20,
    fontSize: 10,
  },
  avatarPreview: {
    objectFit: "contain",
    borderRadius: 5000,
    width: 150,
    height: 250,
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  singleRecipeContainer: {
    display: "flex",
    backgroundColor: "#f2f2f2",
  },
  singleRecipeContainerFirst: {
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
  },
  singleRecipeContainerSecond: {
    flexBasis: "30%",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },
  SingleRecipeMain: {
    flexBasis: "70%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    paddingBottom: 50,
  },
  UserDetailContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  userDetailContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
