const AdoptedPet = ({ adoptedPet }) => {
  return (
    <div className="w-1/4 flex flex-col items-center gap-1">
      <img
        src={adoptedPet.images[0]}
        alt={adoptedPet.name}
        className="object-contain rounded-full"
      />
      <p className="text-pink-700 font-bold">Your new friend!</p>
    </div>
  );
};

export default AdoptedPet;
