import { Link } from 'react-router-dom';

const Pet = ({ id, name, animal, breed, location, images }) => {
  let hero = 'https://pets-images.dev-apis.com/pets/none.jpg';

  if (images.length) hero = images[0];

  return (
    <Link
      to={`/details/${id}`}
      className="grid grid-rows-[83%, 17%] pb-10 bg-slate-100 rounded overflow-hidden"
    >
      <div className="w-full h-7/8 mb-5 bg-gray-300">
        <img
          src={hero}
          alt={name}
          className="w-full h-full bg-gray-300 object-cover"
        />
      </div>
      <div className="mt-auto flex flex-col items-center justify-around gap-2 flex-wrap px-3">
        <h1 className="text-2xl text-pink-600 font-bold">{name}</h1>
        <h2 className="md:text-xs sm:text-xs lg:text-base text-[#333] text-center">{`${animal}: ${breed} from ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
