import logo from '../assets/iqlogo.png';

export const Topbar = () => {
  return (
    <div className="py-5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img className="topbar-logo" src={logo} alt="Logo" />
          <p className="mb-0 ml-5">Hello, Admin!</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white border-none rounded-full pl-4 pr-1.5 py-1 shadow-sm">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-sm w-60 border-none"
            />
            <button className="ml-2">
              <svg
                className="w-10 h-10 text-white font-bold bg-black rounded-full p-3 flex items-center justify-center cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </button>
          </div>

          <button className="p-3 bg-white rounded-full shadow-sm">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </button>

          <button className="p-3 bg-white rounded-full shadow-sm">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
            6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 
            8 7.388 8 8.75v5.408c0 .447-.176.879-.488 
            1.2L6 17h9z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
