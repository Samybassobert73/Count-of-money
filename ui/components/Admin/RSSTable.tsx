import React from 'react';
import FluxServices from '../../_services/flux';
import Link from 'next/link';
import ModalUser from './Modal';
import UpdateRSS from './FormRSSUpdate';
import Searchbar from '../Searchbar';

const fluxServices = new FluxServices();

interface EventsProps {
  events: boolean;
}

export default class RSSTable extends React.Component<EventsProps, any> {
  state = {
    rssFeed: [],
    open: false,
    id: '',
    feed: [],
    events: false,
    display: false,
    checkIfOneRss: 0,
  };

  getAllFlux() {
    fluxServices.getAllFlux().then((res: { data: { [x: string]: any } }) => {
      let rssFeed = res.data['hydra:member'];
      rssFeed.forEach((element: { [x: string]: string }) => {
        element['@id'] = element['@id'].replace('/api/flux_articles/', '');
      });
      this.setState({rssFeed});

      let isHome = res.data['hydra:member'].map(function (feed: {
        [x: string]: any;
      }) {
        return feed['isHome'];
      });
      isHome = isHome.filter((v: boolean) => v === true).length;
      this.setState({checkIfOneRss: isHome});
    });
  }

  displayOnOff(isTrue: boolean) {
    if (this.state.checkIfOneRss < 1 || isTrue === true) {
      this.setState({display: true})
    } else if (this.state.checkIfOneRss > 1) {
      this.setState({display: false})
    } else if (isTrue === false) {
      this.setState({display: false})
    }
  }

  componentDidMount() {
    this.getAllFlux();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.events !== this.state.events) {
      return this.getAllFlux();
    }

    if (prevProps.events !== this.props.events) {
      return this.getAllFlux();
    }
  }

  colonnes = ['id', 'Name', 'Nb Articles', 'edit', 'is on Home'];

  render() {
    return (
      <div className='min-h-screen subpixel-antialiased p-8'>
        <div className='flex justify-between pb-4'>
          <h1 className='text-headingTwo font-semiBold font-raleway'>Source to display on the homepage</h1>
        </div>
        <div className='searchBar pb-4'>
          <Searchbar />
        </div>
        <div className='text-sm'>
          <div className='space-y-2'>
            <div className='bg-white shadow-lg hover:shadow-xl rounded-md overflow-hidden justify-center'>
              <table className='table flex table-auto w-full leading-normal'>
                <thead
                  className='uppercase align-middle justify-items-center text-gray-600 text-xs font-semibold bg-gray-border'>
                <tr className='hidden md:table-row'>
                  {this.colonnes.map((element, i) => (
                    <th key={i} className='text-left p-3'>
                      <p>{element}</p>
                    </th>
                  ))}
                </tr>
                </thead>
                <tbody className='flex-1 text-gray-700 sm:flex-none'>
                {this.state.rssFeed.map((article, i) => (
                  <tr
                    key={i}
                    className='border-t justify-items-center first:border-t-0 flex p-1 md:p-3 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap'
                  >
                    <td className='p-1 md:p-3'>
                      <label
                        className='text-xs text-gray-500 uppercase font-semibold md:hidden'
                        htmlFor=''
                      >
                        id
                      </label>
                      <p className=''>{article['@id']}</p>
                    </td>
                    <td className='p-1 md:p-3'>
                      <label
                        className='text-xs text-gray-500 uppercase font-semibold md:hidden'
                        htmlFor=''
                      >
                        Url
                      </label>
                      <div>
                        <Link href={article['url']}>{article['url']}</Link>
                      </div>
                    </td>
                    <td className='p-1 md:p-3'>
                      <label
                        className='text-xs text-gray-500 uppercase font-semibold md:hidden'
                        htmlFor=''
                      ></label>
                      <p className=''></p>
                    </td>
                    <td className='p-1 md:p-3'>
                      <label
                        className='text-xs text-gray-500 uppercase font-semibold md:hidden'
                        htmlFor=''
                      >
                        edit
                      </label>
                      <div className='flex justify-center'>
                        <svg
                          className='fill-gray-header cursor-pointer'
                          onClick={() => {
                            this.displayOnOff(article['isHome']),
                              this.setState({
                                open: !this.state.open,
                                id: article['@id'],
                                feed: article,
                              })
                          }
                          }
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 512 512'
                        >
                          <path
                            d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z'/>
                        </svg>
                      </div>
                    </td>
                    <td className='p-1 md:p-3'>
                      <label
                        className='text-xs text-gray-500 uppercase font-semibold md:hidden'
                        htmlFor=''
                      >
                        active/inactive
                      </label>
                      <div className='flex justify-center'>
                        {article['isHome'] === true ? (
                          <svg
                            className='fill-green-value'
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 512 512'
                          >
                            <path
                              d='M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'/>
                          </svg>
                        ) : (
                          <svg
                            className='fill-red-value'
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 512 512'
                          >
                            <path
                              d='M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'/>
                          </svg>
                        )}
                      </div>
                    </td>
                    {this.state.open ? (
                      <ModalUser
                        title='Update an rss feed'
                        children={
                          <UpdateRSS
                            id={this.state.id}
                            feed={this.state.feed}
                            disabled={this.state.display}
                          />
                        }
                        open={this.state.open}
                        setOpen={() =>
                          this.setState({
                            open: !this.state.open,
                            events: !this.state.events,
                          })
                        }
                      />
                    ) : null}
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
