import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from '../service/country-service';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await getCountries();
        setCountries(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  console.log(countries);

  return (
    <Section>
      <Container>
        <CountryList countries={countries} />
        {isLoading && <Loader />}
        {error && <Heading>Something went wrong</Heading>}
      </Container>
    </Section>
  );
};
