import React from 'react'
import {faPenToSquare, faAngleRight, faKey} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function SidebarProfil(props: any) {
const linkArray = [
    {
        nav: 'profil',
        icon: faPenToSquare
    },
    {
        nav: 'security',
        icon: faKey
    },
]
  return (
    <div className='border border-l-0 border-t-0 flex flex-col text-gray-icon w-1/6 bg-white'>
        {
            linkArray.map((link) => (
                <div className={'cursor-pointer flex items-center p-4 border-b-2 ' + (props.nav === link.nav ? "active" : "")} onClick={()=>{ props.setNav(link.nav)} }>
                    <FontAwesomeIcon icon={link.icon} />
                    <span className='pl-4 '>{link.nav}</span>
                    <FontAwesomeIcon icon={faAngleRight} className='ml-auto'/>
                </div>
            ))
        }
    </div>
  )
}

export default SidebarProfil
