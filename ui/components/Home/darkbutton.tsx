import React from 'react'

// @ts-ignore
function Darkbutton({children, className, onClick}) {
  return (
    <button
        className={`p-2 rounded-md border-main-purple border-2 text-main-purple hover:bg-btn-over hover:text-white cursor-pointer ${className}`}
        onClick={onClick}
    >
       {children}
    </button>
  )
}

export default Darkbutton
