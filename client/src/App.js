import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import FourOFour from "./pages/FourOFour";

const App = () => {
	return (
		<div>
			<div className='App'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/chats' element={<ChatPage />} />
					<Route path='*' element={<FourOFour />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
