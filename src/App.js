import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './screens/register';
import Protected from './components/protected';
import Login from './screens/login';
import { useSelector } from 'react-redux';
import { login_status } from './redux/slices/registerSlice';
import MeetingsCalender from './screens/meetingsCalender';

function App() {
  const data = useSelector(login_status);
  console.log(data, 'data');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />

        <Route
          path="/"
          element={
            <Protected isLoggedIn={data}>
              <MeetingsCalender />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
