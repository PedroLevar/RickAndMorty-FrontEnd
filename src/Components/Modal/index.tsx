import React, { useEffect, useState } from "react";
import "./style.css";
import api from "../../services/api";
import { RiGroupLine } from "react-icons/ri";


interface CharacterContent {
    image: string;
    name: string;
    species: string;
    gender: string;
    status: string;
    last_seen: string;
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

interface ModalProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    characterId: number | undefined;
}

const Modal: React.FC<ModalProps> = ({ setModalOpen, characterId }) => {
    const [character, setCharacter] = useState<CharacterContent | null>(null);

    const getAboutText = () => {
        if (!character) return "";
        let gender = "";
        switch (character.gender) {
            case "Male":
                gender = "He";
                break;
            case "Female":
                gender = "She";
                break;
            default:
                gender = "He";
                break;
        }

        switch (character.status) {
            case "Alive":
                return `${character.name} is a ${character.gender} ${character.species}. ${gender} is ${character.status} and well. Last seen in ${character.last_seen}`;
            case "Dead":
                return `${character.name} was a ${character.gender} ${character.species}. ${gender} is ${character.status}.`;
            default:
                return `${character.name} is a ${character.gender} ${character.species}. It cant't be told if ${gender} is alive or dead.`;
        }
    };

    const getOriginText = () => {
        if (!character?.origin || !character.origin.name || character.origin.name.toLowerCase() === "unknown") {
            return "Unknown Origin";
        }

        const { name, dimension } = character.origin;

        return dimension && dimension.toLowerCase() !== "unknown"
            ? `${name} (Dimension: ${dimension})`
            : name;
    };

    const getLocationText = () => {
        if (!character?.location || !character.location.name || character.location.name.toLowerCase() === "unknown") {
            return "Unknown Location";
        }

        const { name, dimension } = character.location;

        return dimension && dimension.toLowerCase() !== "unknown"
            ? `${name} (Dimension: ${dimension})`
            : name;
    };


    useEffect(() => {
        const searchCharacter = async () => {
            try {
                const response = await api.get(`/character/${characterId}`);
                setCharacter(response.data.data);
            } catch (error) {
                console.log("Erro ao buscar personagem", error);
            }
        };
        searchCharacter();
    }, [characterId]);

    return (
        <div className="modal-overlay">
            {character && (
                <div className="modal-container">
                    <div className="modal-left">
                        <img
                            src={character.image}
                            alt={character.name}
                            className="modal-bg-image"
                        />
                        <button className="close-modal-btn" onClick={() => setModalOpen(false)}>
                            Close
                        </button>
                        <div className="modal-image-card">
                            <img src={character.image} alt={character.name} />
                            <div className="modalDescription">
                                <h3>{character.name}</h3>
                                <p>{character.species}</p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-right">
                        <div className="modal-info">
                            <div className="about-section">
                                <h1>ABOUT</h1>
                                <p>{getAboutText()}</p>
                            </div>

                            <div className="origin-section">
                                <h1>ORIGIN</h1>
                                <h2>Planet</h2>
                                <h3>{getOriginText()}</h3>
                                {character?.origin && (
                                    <>
                                        <h4>Replacement Dimension</h4>
                                        <h5><RiGroupLine /> {character.origin.residents_count} residents</h5>

                                    </>
                                )}
                            </div>

                            <div className="location-section">
                                <h1>LOCATION</h1>
                                <h2>Planet</h2>
                                <h3>{getLocationText()}</h3>
                                {character?.location && (
                                    <>
                                        <h4>Replacement Dimension</h4>
                                        <h5><RiGroupLine /> {character.location.residents_count} residents</h5>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
