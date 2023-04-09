import { FiSearch } from 'react-icons/fi';
import { BtnSearch, Select, SearchFormStyled } from './SearchForm.styled';
import { useState } from 'react';

export const SearchForm = ({onSubmit}) => {
  const [searchCountry, setSearchCountry] = useState('');

  const handleInput = (e) => {
    const query = e.target.value;
    setSearchCountry(query);
    console.log(query);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchCountry);
  }

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <BtnSearch type="submit">
        <FiSearch size="16px" />
      </BtnSearch>
      <Select aria-label="select" name="region" required onChange={handleInput}>
        <option disabled defaultValue="">
          Select a region and press enter
        </option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </Select>
    </SearchFormStyled>
  );
};
