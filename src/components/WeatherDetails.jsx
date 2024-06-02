import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Header, Icon, Segment, Dimmer, Loader } from 'semantic-ui-react';

const WeatherDetails = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { city } = useParams();

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.REACT_APP_WEATHER_API_KEY}&units=metric`
                );
                setWeatherData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city]);

    if (loading) {
        return (
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        );
    }

    if (error) {
        return (
            <Container textAlign="center" style={{ paddingTop: '5rem' }}>
                <Header as="h2" icon textAlign="center">
                    <Icon name="warning sign" />
                    Error: {error}
                </Header>
            </Container>
        );
    }

    return (
        <Container textAlign="center" style={{ paddingTop: '5rem' }}>
            <Header as="h2" icon textAlign="center">
                <Icon name={`${weatherData.weather[0].icon}.png`} />
                <Header.Content>{weatherData.name}</Header.Content>
            </Header>
            <Segment raised>
                <p style={{ fontSize: '1.2rem' }}>{weatherData.weather[0].description}</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{weatherData.main.temp}°C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </Segment>
        </Container>
    );
};

export default WeatherDetails;