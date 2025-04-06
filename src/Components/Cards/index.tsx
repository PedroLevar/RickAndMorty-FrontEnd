import "./style.css"


interface CharacterProps {
    onClick: () => void;
    character: {
        image: string;
        name: string;
        status: string;
        species: string;
    }
}


export const CharacterCard: React.FC<CharacterProps> = ({ character, onClick }) => {
    const isDead = character.status === "Dead";

    const containerCardClasses = `card ${isDead ? "grayscale" : ""}`

    return (


        <div onClick={onClick} className="containerCard">
            <div className={containerCardClasses}>
                <img
                    src={character.image}
                    alt={character.name}
                    className="image"
                />
                {isDead && <div className="cardDead"> </div>}
                <div className="textContainer">
                    <h3 className="textName">{character.name}</h3>
                    <p className="textSpecies">{character.species}</p>
                </div>
            </div>
        </div>
    );
};