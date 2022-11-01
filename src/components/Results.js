import Pet from './Pet';

const Results = ({ pets }) => {
  return (
    <div className="search">
      {pets.length ? (
        pets.map((pet) => (
          <Pet
            id={pet.id}
            key={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
          />
        ))
      ) : (
        <h1>Not Pet found</h1>
      )}
    </div>
  );
};

export default Results;
