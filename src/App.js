import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routes from "./routes/Routes";
import "./assets/style/style.css";
import Header from "./component/admin/defaultLayout/Header";
import { BrowserRouter } from "react-router-dom";

function App() {
  // {
  //   console.log = () => {};
  //   console.error = () => {};
  //   console.debug = () => {};
  // }
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
