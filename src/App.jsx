import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import your components here
import Home from './components/Home'
import WeatherDetails from './components/WeatherDetails'
import NotFound from './components/NotFound'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/weather/:city" element={<WeatherDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App