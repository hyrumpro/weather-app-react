import { Container, Header, Icon, Segment } from 'semantic-ui-react';

const NotFound = () => (
    <Container textAlign="center" style={{ padding: '5em 0' }}>
        <Header as="h1" icon>
            <Icon name="cloud showers heavy" />
            404 - Page Not Found
            <Header.Subheader>
                Oops! Looks like the weather forecast was wrong.
            </Header.Subheader>
        </Header>
        <Segment raised>
            <p>
                The page you are looking for seems to have gone missing, just like the sun on a rainy day.
            </p>
            <p>
                Dont worry, we will help you find your way back home.
            </p>
            <a href="/">Go to Homepage</a>
        </Segment>
    </Container>
);

export default NotFound;