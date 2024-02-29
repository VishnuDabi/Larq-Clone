import "./App.css";
import Economical from "./Components/Economical/Economical";
import BuyProduct from "./Components/Buy/BuyProduct";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Magazine from "./Components/Magazine/Magazine";
import Mission from "./Components/Mission/Mission";
import Register from "./Components/Register/Register";
import Review from "./Components/Reviews/Review";
import Shop from "./Components/Shop Component/Shop";
import SingIn from "./Components/Signin/SingIn";
import NowTrending from "./Components/Trending/NowTrending";
import { Route, Routes, useNavigate } from "react-router-dom";
// import Main from "./Redux/Main";
import { ID, account } from "./lib/appwite";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/features/counter/cartSlice";
import CheckOutNow from "./Components/check out now/CheckOutNow";
import ScrollToTop from "./ScrollToTop";
function App() {
  // const [loggedInUser, setLoggedInUser] = useState(null);
  // const [loggedInUser, setLoggedInUser] = useState(
  //   localStorage.getItem("cookieFallback") || null
  // );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function loginHandler(email, password) {
    try {
      if (email && password) {
        await account.createEmailSession(email, password);
        let user = await account.get();
        // setLoggedInUser(user);
        dispatch(setUser(user));
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  }

  async function registerHandler(email, password, name) {
    try {
      if (email && password && name) {
        await account.create(ID.unique(), email, password, name);
        loginHandler(email, password);
      }
    } catch (error) {
      alert(error);
    }
  }
  async function logoutHandler() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      {/* <Main /> */}
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header logout={logoutHandler} />
                <Home />
                <Review />
                <Shop />
                <NowTrending />
                <Economical />
                <Mission />
                <Magazine />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header logout={logoutHandler} />
                <SingIn login={loginHandler} />
                <Footer />
              </>
            }
          />
          <Route
            path="/registration"
            element={
              <>
                <Header logout={logoutHandler} />
                <Register logout={logoutHandler} register={registerHandler} />
                <Footer />
              </>
            }
          />
          <Route
            path="/bottle/:targetIndex"
            element={
              <>
                <Header logout={logoutHandler} />
                <BuyProduct />
                <Footer />
              </>
            }
          />
          <Route
            path="checkout"
            element={
              <>
                <Header logout={logoutHandler} />
                <CheckOutNow />
                <Footer />
              </>
            }
          />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;
