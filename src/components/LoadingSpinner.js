import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen mt-10">
      <AiOutlineLoading3Quarters className="w-10 h-10 animate-spin text-[#f6546a]"></AiOutlineLoading3Quarters>
    </div>
  );
};

export default LoadingSpinner;
