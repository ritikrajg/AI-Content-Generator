import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader.component";
import { useAuth } from "./AuthContext/AuthContext";
import PrivateNavbar from "./components/PrivateNavbar.component";
import { ProtectedRoute, PublicRoute } from "./Routes";
import PublicNavbar from "./components/PublicNavbar.component";

const Register = lazy(() => import("./pages/Register.page"));
const Login = lazy(() => import("./pages/Login.page"));
const Dashboard = lazy(() => import("./pages/Dashboard.page"));
const Home = lazy(() => import("./pages/Home.page"));
const Content = lazy(() => import("./pages/GenerateContent.page"));
const History = lazy(() => import("./pages/History.page"));
const Pricing = lazy(() => import("./pages/Pricing.page"));
const Plans = lazy(() => import("./pages/Plans.page"));
const FreePlan = lazy(() => import("./pages/FreePlan.page"));
const CheckOut = lazy(() => import("./pages/CheckOut.page"));
const PaymentDetails = lazy(() => import("./pages/PaymentDetail.page"));

function App() {
  const { auth } = useAuth();
  return (
    <>
      <Router>
        {auth ? <PrivateNavbar /> : <PublicNavbar />}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Public Route */}
            <Route path="" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pricing" element={<Plans />} />
            </Route>
            {/* Private Route */}
            <Route path="" element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/generate-content" element={<Content />} />
              <Route path="/plans" element={<Pricing />} />
              <Route path="/freeplan" element={<FreePlan />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/verify" element={<PaymentDetails />} />
              <Route path="/history" element={<History />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
