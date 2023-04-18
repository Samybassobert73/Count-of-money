import React, { useState } from "react";

import FluxServices from "../../_services/flux";

const fluxServices = new FluxServices();

export default function Form({ id, feed, disabled }) {

  const [url, setUrl] = useState(feed.url);
  const [isHome, setIsHome] = useState(feed.isHome);

  const value = isHome === "true";

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const flux = {
        id: id,
        url: url,
        isHome: value,
      };
      fluxServices.updateFlux(flux.id, flux).then();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
      <label htmlFor="url">Url</label>
      <input
        type="text"
        className="p-2 rounded-xl border-2 border-gray"
        name="url"
        placeholder="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <label htmlFor="display">Display on home</label>
      <input
        type="boolean"
        className="p-2 rounded-xl border-2 border-gray"
        name="display"
        placeholder="Write true or false"
        value={isHome}
        disabled={!disabled}
        onChange={(e) => setIsHome(e.target.value)}
        required
      />

      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-linear px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-opacity focus:outline-none focus:ring-2 focus:ring-purple-opacity focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Update an rss feed
      </button>
    </form>
  );
}
