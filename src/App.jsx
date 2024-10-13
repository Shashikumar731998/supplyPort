import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./routes/protected";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Pages
import Login from "./pages/Login";
import Homepage from "./pages/home/Homepage";
import Selectoutlet from "./pages/Selectoutlet";
import Signup from "./pages/Signup";
import FormSubmitted from "./pages/FormSubmitted";
import Category from "./pages/category/Category";
import Cart from "./pages/cart/Cart";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/signin/SignIn";
import Checkout from "./pages/checkout/Checkout";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import OrderPlaced from "./pages/orderPlaced/OrderPlaced";
import ProductPage from "./pages/productPage/ProductPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Otp from "./pages/otp";
import Credits from "./components/Credits";
import AllOrder from "./pages/all-order/all-order";
import AllOrderCam from "./components/all-order";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/selectoutlet" element={<Selectoutlet />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/submitted" element={<FormSubmitted />} />
        <Route path="/category" element={<Category />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/placeorder/:orderId" element={<PlaceOrder />} />
        <Route path="/orderplaced" element={<OrderPlaced />} />
        <Route path="/productpage/:ItemId" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/all-order" element={<AllOrder />} />
        <Route path="/all-order-cam" element={<AllOrderCam />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
