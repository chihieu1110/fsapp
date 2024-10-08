import ReactDOM from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "~/theme";
import { ConfirmProvider } from "material-ui-confirm";
ReactDOM.createRoot(document.getElementById("root")).render(
  <CssVarsProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      allowClose:false,
      confirmationButtonProps:{color:'error',variant:'outlined'},
      cancellationButtonProps:{color:'primary'},
    }}>
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-left" theme="colored" />
    </ConfirmProvider>
  </CssVarsProvider>
);
