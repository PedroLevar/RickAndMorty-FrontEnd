import React from "react";
import "./style.css";


interface SearchBarProps {
  onSearch: (value: string) => any
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {


  const handleSearch = (event: any) => {
    console.log("valor digitado ", event.target.value)
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