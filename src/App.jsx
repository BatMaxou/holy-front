import { BrowserRouter, Routes, Route } from "react-router-dom";

import TierList from "./pages/TierList";
import Login from "./pages/Login";

const App = () => {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />}/>
			<Route path="/tier-list" element={<TierList />}/>
		</Routes>
	</BrowserRouter>;
}

export default App;
