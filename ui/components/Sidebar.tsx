import React from 'react';
import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartArea, faSquareRss, faUserPen, faUsers, faUsersGear, faBitcoinSign} from '@fortawesome/free-solid-svg-icons';

type MyState = { show: boolean };

class Sidebar extends React.Component<{}, MyState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      show: false,
    };

    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({show: !this.state.show});
  }

  render() {
    return (
      <div className='flex flex-col top-0 left-0 bg-white border w-fit border-t-0 '>
        <div className='overflow-y-auto overflow-x-hidden flex-grow'>
          <ul className='flex flex-col py-6 space-y-1 items-center'>
            <li>
              <Link href='/dashboard'
                    className='relative flex flex-row items-center h-11 pr-6'>
                <span className='absolute left-0 top-0 h-full bg-main-purple w-1 rounded'></span>
                <span className='inline-flex justify-center items-center ml-4'>
                    <FontAwesomeIcon
                      className='cursor-pointer'
                      icon={faChartArea}
                      color='#6532D1'
                      style={{fontSize: 24}}
                    />
                  </span>
              </Link>
            </li>
            <li>
              <Link href='/feed'
                    className='relative flex flex-row items-center h-11 pr-6'>
                {/*<span className='absolute left-0 top-0 h-full bg-main-purple w-1 rounded'></span>*/}
                <span className='inline-flex justify-center items-center ml-4'>
                    <FontAwesomeIcon
                      className='cursor-pointer'
                      icon={faSquareRss}
                      color='#BDC0C9'
                      style={{fontSize: 24}}
                    />
                  </span>
              </Link>
            </li>
            <li>
              <Link href='#' onClick={this.toggleShow}
                    className='relative flex flex-row items-center h-11 pr-6'>
                {/*<span className='absolute left-0 top-0 h-full bg-main-purple w-1 rounded'></span>*/}
                <span className='inline-flex justify-center items-center ml-4'>
                    <FontAwesomeIcon
                      className='cursor-pointer'
                      icon={faUsersGear}
                      color='#BDC0C9'
                      style={{fontSize: 20}}
                    />
                  </span>
              </Link>
            </li>
            {this.state.show ? (
              <div>
                <li>
                  <Link
                    href='/admin/crypto'
                    className='relative flex flex-row items-center h-11 pr-6'
                  >
                    {/*<span className='absolute left-0 top-0 h-full bg-main-purple w-1 rounded'></span>*/}
                    <span className='inline-flex justify-center items-center ml-5'>
                      <FontAwesomeIcon
                        className='cursor-pointer'
                        icon={faBitcoinSign}
                        color='#BDC0C9'
                        style={{fontSize: 20}}
                      />
                  </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/admin/users'
                    className='relative flex flex-row items-center h-11 pr-6'
                  >
                    {/*<span className='absolute left-0 top-0 h-full bg-main-purple w-1 rounded'></span>*/}
                    <span className='inline-flex justify-center items-center ml-4'>
                    <FontAwesomeIcon
                      className='cursor-pointer'
                      icon={faUsers}
                      color='#BDC0C9'
                      style={{fontSize: 18}}
                    />
                  </span>
                  </Link>
                </li>
                <li>
                  <Link href='/admin/rssfeed'
                        className='relative flex flex-row items-center h-11 pr-6'
                  >
                    {/*<span className='absolute left-0 top-0 h-full bg-main-purple w-1 rounded'></span>*/}
                    <span className='inline-flex justify-center items-center ml-4'>
                    <FontAwesomeIcon
                      className='cursor-pointer'
                      icon={faSquareRss}
                      color='#BDC0C9'
                      style={{fontSize: 20}}
                    />
                  </span>
                  </Link>
                </li>
              </div>
            ) : null}
            <li>
              <Link href='/profil'
                    className='relative flex flex-row items-center h-11 pr-6'
              >
                {/*<span className='absolute left-0 top-0 h-full bg-main-purple w-1 rounded'></span>*/}
                <span className='inline-flex justify-center items-center ml-4'>
                  <FontAwesomeIcon
                    className='cursor-pointer'
                    icon={faUserPen}
                    color='#BDC0C9'
                    style={{fontSize: 20}}
                  />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
