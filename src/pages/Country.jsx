import { Section, Container, CountryInfo, Loader } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';

export const Country = () => {
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { countryId } = useParams();

  useEffect(() => {
    if (!countryId) {
      return;
    }
    const getCountryOnSearch = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCountryOnSearch(countryId);
  }, [countryId]);

  const { flag, capital, countryName, id, languages, population } = country;
  return (
    <Section>
      {isLoading && <Loader />}
      {error && <h2>Сталася помилка!</h2>}
      <Container>
        <CountryInfo
          flag={flag}
          capital={capital}
          countryName={countryName}
          languages={languages}
          id={id}
          population={population}
        />
      </Container>
    </Section>
  );
};
