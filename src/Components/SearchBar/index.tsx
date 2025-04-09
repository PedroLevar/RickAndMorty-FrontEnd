import React from "react";
import "./style.css";


interface SearchBarProps {
  onSearch: (value: string) => any
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {


  const handleSearch = (event: any) => {
    onSearch(event.target.value)
  }

  return (
    <input
      type="text"
      onChange={handleSearch}
      placeholder="Pesquisar..."
      className="SearchBar"
    />
  );
};

export default SearchBar;