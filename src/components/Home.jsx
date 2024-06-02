import { useState } from 'react';
import { Container, Grid, Header, Input, Icon, Segment, Dimmer, Loader, Message, Dropdown } from 'semantic-ui-react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const Home = () => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState('metric');

    // API request and data handling
    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${unit}`);
            const data = await response.json();

            if (data.cod === 200) {
                const { name, weather, main, wind } = data;
                const { description, icon } = weather[0];
                const { temp, humidity } = main;
                const { speed } = wind;

                setWeatherData({ city: name, description, icon, temperature: temp, humidity, windSpeed: speed });
            } else {
                setError(data.message); // [1]
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('An error occurred while fetching weather data.');
        } finally {
            setLoading(false);
        }
    };

    // Unit conversion
    const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

    const convertTemp = (val, fromScale, toScale) => {
        if (fromScale === toScale) {
            return val;
        } else if (fromScale === 'celsius' && toScale === 'fahrenheit') {
            return celsiusToFahrenheit(val);
        } else if (fromScale === 'fahrenheit' && toScale === 'celsius') {
            return (val - 32) * 5 / 9;
        }
        return val;
    };

    const handleUnitChange = (e, { value }) => {
        setUnit(value);
        if (value === 'imperial' && weatherData) {
            const fahrenheitTemp = convertTemp(weatherData.temperature, 'celsius', 'fahrenheit');
            setWeatherData({ ...weatherData, temperature: fahrenheitTemp });
        }
    };

    // Weather icon mapping
    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case '01d':
                return <WiDaySunny size={64} />;
            case '02d':
            case '03d':
            case '04d':
                return <WiCloudy size={64} />;
            case '09d':
            case '10d':
                return <WiRain size={64} />;
            case '13d':
                return <WiSnow size={64} />;
            case '11d':
                return <WiThunderstorm size={64} />;
            default:
                return <WiDaySunny size={64} />;
        }
    };

    const unitOptions = [
        { key: 'metric', text: 'Celsius', value: 'metric' },
        { key: 'imperial', text: 'Fahrenheit', value: 'imperial' },
    ];


    return (
        <Container textAlign="center" style={{ paddingTop: '5rem', backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
            <Header as="h1" icon textAlign="center" style={{ color: 'var(--primary-color)' }}>
                <Icon name="cloud" circular className="weather-icon" />
                <Header.Content>Weather App</Header.Content>
            </Header>

            <Grid centered columns={2} stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Segment raised>
                            <Input
                                fluid
                                icon="search"
                                iconPosition="left"
                                placeholder="Enter city name"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                action={{
                                    color: 'teal',
                                    labelPosition: 'right',
                                    icon: 'search',
                                    content: 'Search',
                                    onClick: handleSearch,
                                }}
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                            fluid
                            selection
                            options={unitOptions}
                            value={unit}
                            onChange={handleUnitChange}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            {loading && (
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            )}

            {error && (
                <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{error}</p>
                </Message>
            )}

            {weatherData && (
                <Segment raised style={{ marginTop: '2rem' }}>
                    <Header as="h2" icon textAlign="center" style={{ color: 'var(--primary-color)' }}>
                        {getWeatherIcon(weatherData.icon)}
                        <Header.Content>{weatherData.city}</Header.Content>
                    </Header>
                    <p style={{ fontSize: '1.2rem', textTransform: 'capitalize' }}>{weatherData.description}</p>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{weatherData.temperature}°{unit === 'metric' ? 'C' : 'F'}</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                    <p>Wind Speed: {weatherData.windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
                </Segment>
            )}
        </Container>
    );
};

export default Home;