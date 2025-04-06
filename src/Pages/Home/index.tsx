import { useCallback, useState, useEffect } from "react";
import SearchBar from "../../Components/SearchBar";
import Button from "../../Components/Button";
import logoImage from "../../assets/logo.png";
import "../Home/style.css";
import axios from "axios";
import LoadingPage from "../../Components/LoadingPage";
import { CharacterCard } from "../../Components/Cards";
import Modal from "../../Components/Modal";
import Pagination from "../../Components/Pagination";

interface CharacterContent {
  id: number;
  image: string;
  name: string;
  species: string;
  status: string;
  gender: string;
  origin: Location;
  location: Location;
}

interface Location {
  id: number;
  name: string;
  dimension: string;
  residents_count: number;
  type: string;
}

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchResults, setSearchResults] = useState<CharacterContent[]>([]);
  const [selectCharacter, setSelectCharacter] = useState<CharacterContent | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    async (term: string, page = 1) => {
      if (!term.trim()) return;

      setLoading(true);
      setSearchTriggered(true);

      try {
        const encodedTerm = encodeURIComponent(term);
        const response = await axios.get(
          `http://127.0.0.1:5000/character/?search=${encodedTerm}&page=${page}`
        );

        if (response.data && response.data.data && response.data.data.characters) {
          setSearchResults(response.data.data.characters);
          setTotalPages(response.data.data.total_pages || 1);
          setCurrentPage(page);
        } else {
          setSearchResults([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.log("Erro no fetch", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handleSearch(searchValue, newPage);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSearch(searchValue, 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchValue, handleSearch]);

  return (
    <>
      <div className="homeContainer">
        <img src={logoImage} alt="Logo" className="logo" />
        <div className="searchContainer">
          <SearchBar onSearch={setSearchValue} />
          <Button onClick={() => handleSearch(searchValue, 1)}>Buscar</Button>
        </div>
      </div>

      {loading && <LoadingPage />}

      {searchTriggered && !loading && (
        <div className="cardsContainer">
          {searchResults.length > 0 ? (
            searchResults.map((character: CharacterContent) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => {
                  setSelectCharacter(character);
                  setModalOpen(true);
                }}
              />
            ))
          ) : (
            <p className="noResultsMessage">Nenhum personagem encontrado.</p>
          )}
        </div>
      )}

      {searchTriggered && !loading && searchResults.length > 0 && (
        <div className="paginationContainer">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}

      {modalOpen && (
        <Modal
          characterId={selectCharacter?.id}
          setModalOpen={setModalOpen} />
      )}
    </>
  );
};
