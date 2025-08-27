import logoSrc from '../assets/iqlogo.png';
import { useEffect, useState } from 'react';

export const Topbar = () => {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 0); // eşiği istersen 8/16px yap
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 inset-x-0 z-50 transition-all duration-200',
        stuck
          ? 'bg-white/70 supports-[backdrop-filter]:bg-white/50 backdrop-blur-md rounded-b-xl shadow-sm'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className={['px-6 transition-all duration-200', stuck ? 'py-3' : 'py-5'].join(' ')}>
        <div className="flex items-center justify-between">
          {/* left */}
          <div className="flex items-center gap-4">
            <img
              className={[
                'topbar-logo w-auto transition-all duration-200',
                stuck ? 'h-10' : 'h-16',
              ].join(' ')}
              src={logoSrc}
              alt="Logo"
            />
            <p
              className={[
                'mb-0 font-bold transition-all duration-200',
                stuck ? 'text-sm' : 'text-base',
              ].join(' ')}
            >
              Hello, Admin!
            </p>
          </div>

          {/* right */}
          <div className="flex items-center gap-3">
            <div
              className={[
                'flex items-center bg-white rounded-full shadow-sm transition-all duration-200',
                stuck ? 'pl-3 pr-1 py-0.5' : 'pl-4 pr-1.5 py-1',
              ].join(' ')}
            >
              <input
                type="text"
                placeholder="Search..."
                className={[
                  'outline-none text-sm border-none transition-all duration-200',
                  stuck ? 'w-44' : 'w-60',
                ].join(' ')}
              />
              <button className="ml-2">
                <svg
                  className={[
                    'text-white font-bold bg-black rounded-full flex items-center justify-center cursor-pointer transition-all duration-200',
                    stuck ? 'w-8 h-8 p-2' : 'w-10 h-10 p-3',
                  ].join(' ')}
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

            <button
              className={[
                'bg-white rounded-full shadow-sm transition-all duration-200',
                stuck ? 'p-2.5' : 'p-3',
              ].join(' ')}
            >
              <svg
                className={[
                  stuck ? 'w-4 h-4' : 'w-5 h-5',
                  'text-gray-600 transition-all duration-200',
                ].join(' ')}
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

            <button
              className={[
                'bg-white rounded-full shadow-sm transition-all duration-200',
                stuck ? 'p-2.5' : 'p-3',
              ].join(' ')}
            >
              <svg
                className={[
                  stuck ? 'w-4 h-4' : 'w-5 h-5',
                  'text-gray-600 transition-all duration-200',
                ].join(' ')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 8.75v5.408c0 .447-.176.879-.488 1.2L6 17h9z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
