import { BrowserRouter, Routes, Route } from "react-router-dom";

import TierList from "./pages/TierList";
import Login from "./pages/Login";
import { NotificationContextProvider } from "./context/NotificationContext";

const App = () => {
	return <NotificationContextProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />}/>
				<Route path="/tier-list" element={<TierList />}/>
			</Routes>
		</BrowserRouter>;
	</NotificationContextProvider>
}

export default App;
