// import { useEffect, useState } from "react";
// import api from "../services/api";

// interface Character {
//   id: number;
//   name: string;
//   image: string;
// }

// interface CharacterListProps {
//   onSelectCharacter: (id: number) => void;
//   searchTerm: string;
// }

// function CharacterList({ onSelectCharacter, searchTerm }: CharacterListProps) {
//   const [characters, setCharacters] = useState<Character[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCharacters() {
//       try {
//         const response = await api.get("/character", {
//           params: { search: searchTerm, page: 1 },
//         });
//         setCharacters(response.data.data);
//       } catch (error) {
//         console.error("Erro ao buscar personagens", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCharacters();
//   }, [searchTerm]);

//   if (loading) return <p>Carregando personagens...</p>;

//   return (
//     <div>
//       {characters.map((character) => (
//         <div key={character.id} onClick={() => onSelectCharacter(character.id)}>
//           <img src={character.image} alt={character.name} />
//           <p>{character.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CharacterList;