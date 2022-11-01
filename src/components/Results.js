import Pet from './Pet';
import { FaSadTear } from 'react-icons/fa';

const Results = ({ pets }) => {
  return (
    <div>
      {pets.length ? (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <Pet
              id={pet.id}
              key={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-right uppercase font-bold text-[#00176C]">
            No Pet found
          </h1>
          <FaSadTear className="w-20 h-20 fill-[#1063DE]" />
          <h1 className="uppercase font-bold text-[#00176C]">No Pet found</h1>
        </div>
      )}
    </div>
  );
};

export default Results;
