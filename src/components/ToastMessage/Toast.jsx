import React, { useEffect } from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, message, type, onClose }) => {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-400 ${isShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
    >
      <div
        className={`min-w-[250px] max-w-[300px] bg-white border border-gray-200 shadow-md rounded-lg relative overflow-hidden ${type === 'delete' ? 'border-red-500' : 'border-green-500'
          }`}
      >
        <div className={`absolute h-full w-1 left-0 top-0 ${type === 'delete' ? 'bg-red-500' : 'bg-green-500'}`} />

        <div className="flex items-center gap-3 py-3 px-4">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full bg-opacity-10 ${type === 'delete' ? 'bg-red-500' : 'bg-green-500'
              }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-700 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
