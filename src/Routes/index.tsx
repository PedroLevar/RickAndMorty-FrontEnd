import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home } from "../Pages/Home";


export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};
