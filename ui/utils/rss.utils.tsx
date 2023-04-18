import Parser from 'rss-parser';

type Feed = {
  slug: string;
  title: string;
  url: string;
}

export const FEEDS: Feed[] = [
  {
    slug: "nextjs-blog",
    title: "Next.js Blog",
    url: "https://nextjs.org/feed.xml",
  },
  {
    slug: "nrk",
    title: "nrk",
    url: "https://www.nrk.no/toppsaker.rss",
  },
];

export async function getFeed(url:string) {
  let parser = new Parser({
    requestOptions: {
      rejectUnauthorized: false
    },
    customFields: {
      item: [
        ['content:encoded', 'ctt'],
        ['imgAuthor', 'imgAuthor'],
        ['pubDate', 'date'],
        ['dc:creator', 'author'],
        ['title', 'title'],

      ]
    },
    headers: {'Accept': ' application/rss+xml, application/rdf+xml;q=0.8, application/atom+xml;q=0.6, application/xml;q=0.4, text/xml;q=0.4',},
  });
  try {
    return await parser.parseURL(url);
  } catch (error) {
    console.log('error',error)
  }
}
