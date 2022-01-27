
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.css';


import LoginRegister from "./pages/LoginRegister/LoginRegister";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Routes from "./config/Routes";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginRegister} />

          <BrowserRouter>
            <Route render={props => (
              <>
                <Header {...props} />
                <Routes />
                <Footer />
              </>
            )} />
          </BrowserRouter>

          <Route path="*" component={() => "404 Page Not Found"} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;