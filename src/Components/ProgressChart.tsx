const ProgressChart = () => {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Daily Progress</h2>
        <div className="flex flex-col items-center mt-4">
          <div className="relative w-24 h-24">
            <svg className="absolute inset-0" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="10" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="10" fill="none" strokeDasharray="251.2" strokeDashoffset="50" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
              80%
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Keep improving the quality of your health</p>
        </div>
      </div>
    );
  };
  
  export default ProgressChart;
  