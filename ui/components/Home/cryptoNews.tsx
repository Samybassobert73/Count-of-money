import React from 'react'
import Link from 'next/link';
import { format} from "date-fns";
import { fr } from 'date-fns/locale';
import defaultImage from '../../assets/img/bg-article-flux.jpg'
const CryptoNews = ({ rssFeed, rssImage}:any) => {
const url = rssFeed.ctt;
const tmp = document.createElement('div');
tmp.innerHTML = url;
const img = tmp.querySelector('img');
const src = img?.getAttribute('src') ?? defaultImage.src;

  return (
      <div className='bg-white dark:bg-gray-900 flex flex-col w-full p-4 border-2 border-gray-500 rounded-xl shadow-default'>
        <div className='relative'>
          <img src={src} referrerpolicy="no-referrer" className="w-full h-60 object-cover" />
          <span className='text-dateArticle rounded-full bg-gray-500/30 px-3 py-1 rounded-full absolute top-2 right-2'>{format(new Date(rssFeed.date), "PPP",{locale: fr})}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-authorCardArticle text-gray-400 my-2'>{rssFeed.author?rssFeed.author : "author name"}</span>
          <span className='text-titleCardArticle my-1'>{rssFeed.title}</span>
        </div>
        <div className='flex flex-row mt-auto'>
            {/* <Link key={rssFeed.slug} href={`/feeds/${rssFeed.title.replace(/ /g,"_")}`} className="m-2 bg w-fit bg-btn hover:bg-btn-over shadow-default hover:shadow-default text-white p-btn-sm rounded-btn">lire</Link> */}
            <Link key={rssFeed.slug} href={rssFeed.guid} target="_blank" className="ml-auto m-2 bg w-fit bg-btn hover:bg-btn-over shadow-default hover:shadow-default text-white p-btn-sm rounded-btn">lire</Link>
        </div>
      </div>
  )
}

export default CryptoNews
