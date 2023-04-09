import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countryArr, setCountryArr] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const handleSubmit = (e) => {
    setSearchParams({ request: e });
  }

  useEffect(() => {
    const request = searchParams.get("request");

    if (!request) return;

    async function getCountry() {
      try {
        setIsLoading(true);
        const response = await fetchByRegion(request);
        setCountryArr(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCountry();
    
  }, [searchParams]);



  console.log(countryArr);
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />
        {error && <Heading>Smth went wrong</Heading>}
        {isLoading && <Loader />}
        <CountryList countries={ countryArr } />
      </Container>
    </Section>
  );
};
