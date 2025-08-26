import React from 'react';

export const ProfileCard = ({
  name = 'Carlic Bolomboy',
  email = 'carlic@gmai.com',
  avatarSrc = '',
  projects = 26,
  followers = 356,
  following = 68,
}) => {
  return (
    <div className="rounded-2xl bg-white px-4 py-6 shadow-sm ring-1 ring-black/5 h-full mb-6 w-1/2">
      <div className="flex flex-col items-center text-center">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={name}
            className="h-16 w-16 rounded-full ring-1 ring-black/10 object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full grid place-items-center ring-1 ring-black/10 bg-neutral-100 text-3xl">
            🤩
          </div>
        )}

        <h3 className="mt-3 text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="grid grid-cols-3 text-center gap-2">
          <div>
            <p className="text-xs text-gray-400">Projects</p>
            <p className="text-xl font-semibold text-gray-900">{projects}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Followers</p>
            <p className="text-xl font-semibold text-gray-900">{followers}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Following</p>
            <p className="text-xl font-semibold text-gray-900">{following}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
