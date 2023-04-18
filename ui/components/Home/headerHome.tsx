import React, {useState} from 'react'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Darkbutton from './darkbutton'
import {useTheme} from 'next-themes';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {TokenStorageService} from '../../_interceptors/token-storage';

const Headercw = () => {
  const tokenStorage = new TokenStorageService();
  const [isLoggin, setIsLoggin] = useState('');
  const router = useRouter();
  const {systemTheme, theme, setTheme} = useTheme();

  useEffect(() => {
    const token = tokenStorage.getToken();
    // @ts-ignore
    setIsLoggin(token);
  }, []);

  let button;
  if (isLoggin) {
    button = <Link href={'/login'} onClick={logout}>Logout</Link>;
  } else {
    button = <Link href={'/login'}>Login</Link>;
  }

  function logout(): any {

    tokenStorage.removeToken()
    return router.push('/')
  }

  const renderThemeChanger = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (currentTheme === 'dark') {
      return (
        <Darkbutton className={''}
                    onClick={() => setTheme('light')}>
          <FontAwesomeIcon icon={faSun}/>
        </Darkbutton>
      )
    } else {
      return (
        <Darkbutton className={''} onClick={() => setTheme('dark')}>
          <FontAwesomeIcon icon={faMoon}/>
        </Darkbutton>
      )
    }
  };
  return (
    <div className='z-20 p-3 flex flex-col sm:flex-row justify-between border-solid border-b border-grey-600 '>
      <div className='flex'>
        <div className='flex flex-col sm:flex-row items-center'>
          <Link className='w-9 h-9 py-6 flex items-center' href={'/'}>
            <svg
              width='34'
              height='36'
              viewBox='0 0 34 36'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7V29C14 32.866 10.866 36 7 36C3.13401 36 0 32.866 0 29V7ZM18 8C18 3.58172 21.5817 0 26 0C30.4183 0 34 3.58172 34 8C34 12.4183 30.4183 16 26 16C21.5817 16 18 12.4183 18 8ZM26 20C21.5817 20 18 23.5817 18 28C18 32.4183 21.5817 36 26 36C30.4183 36 34 32.4183 34 28C34 23.5817 30.4183 20 26 20Z'
                fill='url(#paint0_linear_378_1153)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_378_1153'
                  x1='15.5'
                  y1='-4'
                  x2='24'
                  y2='33'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#6532D1'/>
                  <stop offset='1' stopColor='#5860E3'/>
                </linearGradient>
              </defs>
            </svg>
          </Link>
          <span className='font-bold text-brandName m-4'>The count of <span className='text'>money</span></span>
        </div>
      </div>
      <div className='text-headerLink flex flex-col sm:flex-row items-center'>
        <div>
          {renderThemeChanger()}
        </div>
        <Link href={'/dashboard'} className='border-main-purple border-2 text-main-purple hover:bg-btn-over hover:text-white cursor-pointer shadow-default hover:shadow-default m-4 w-fit font-medium p-btn-sm rounded-btn'>
          Dashboard
        </Link>
        <div className='bg-btn hover:bg-btn-over border-main-purple border-2 shadow-default hover:shadow-default m-4 w-fit text-white font-medium p-btn-sm rounded-btn'>
          {button}
        </div>
      </div>
    </div>
  )
}

export default Headercw
