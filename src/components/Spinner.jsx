const Spinner = () => {
  return (
    <div role="status" className="flex justify-center items-center">
      <div className="w-7 h-7 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-green-500"></div>
    </div>
  );
};

export default Spinner;
