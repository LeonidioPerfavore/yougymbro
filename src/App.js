import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import Home from "./Pages/HomePage/Home";
import AuthGuard from "./components/Guards/AuthGuard";
import GuestGuard from "./components/Guards/GuestGuard";
import NotFound from "./Pages/NotFound";
import Registration from "./Pages/RegistrationPage/Registration";
import TrainingDay from "./Pages/HomePage/Day/TrainingDay";
import ExercisesList from "./Pages/Exercises/ExercisesList";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <GuestGuard>
                        <Login/>
                    </GuestGuard>
                }/>
                <Route path="/registration" element={
                    <GuestGuard>
                        <Registration/>
                    </GuestGuard>
                }/>
                <Route path="/" element={
                    <AuthGuard>
                        <Home/>
                     </AuthGuard>
                }/>
                <Route path="/week/:date" element={
                    <AuthGuard>
                        <TrainingDay/>
                    </AuthGuard>
                }/>
                <Route path="/exercises" element={
                    <AuthGuard>
                        <ExercisesList/>
                    </AuthGuard>
                }/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
