import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";
import { getMusic, setCurrentMusic } from "../actions/musicActions";

const MusicCat = ({ catergory }) => {
  const musicList = useSelector((state) => state.music?.music);
  console.log(musicList);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cat = JSON.parse(searchParams.get("cat"));
  const currentMusic = useSelector((state) => state.music?.currentMusic);
  const dispatch = useDispatch();
  const handleSetMusic = (music) => {
    dispatch(setCurrentMusic(music));
  };

  useEffect(() => {
    if (cat.name === "arab")
      dispatch(
        getMusic("https://mocki.io/v1/eed7c8f9-947c-4ff4-9701-95b34e8f4b01")
      );
    else if (cat.name === "classical")
      dispatch(
        getMusic("https://mocki.io/v1/293c6514-2242-4c16-b04d-b570f170153b")
      );
    else if (cat.name === "anime")
      dispatch(
        getMusic("https://mocki.io/v1/d17a45dd-0ee1-4a51-a7fb-50d2609a7c4a")
      );
    else if (cat.name === "tv")
      dispatch(
        getMusic("https://mocki.io/v1/88456221-70bb-4bfa-b77d-75fb115e8032")
      );
  }, [cat]);

  return (
    <>
      <div className="bg-gray-100 flex flex-col items-start justify-start">
        <div className="relative max-w-full w-full h-96 bg-black  shadow-lg overflow-hidde">
          <div className="absolute inset-0 overflow-hidden bg-red-200">
            <img src={cat.img} alt="" className="w-full" />
            <div className="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black"></div>
          </div>
          <div className="absolute flex space-x-6 transform translate-x-6 translate-y-8">
            <div className="w-72 h-72 rounded-lg shadow-lg overflow-hidden">
              <img src={cat.img} alt="" className="w-72 h-72" />
            </div>
            <div className="text-white pt-12">
              <h3 className="font-bold uppercase text-7xl">{cat.name === 'tv' ? "TV & MOvies" : cat.name}</h3>
              <div className="text-sm opacity-60">MUSIC SOUNDS</div>
              <div className="mt-8 text-gray-400">
                <div className="flex items-center space-x-2 text-xs">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                  <span className="text-white">Easy listening</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center border rounded-lg min-w-screen">
        <ul class="bg-white rounded-lg text-gray-900 w-full">
          {musicList?.map((song, i) => (
            <li
              className="flex border-b-2  mx-10 mt-2 items-center space-x-3 mb-2 hover:bg-yellow-300"
              key={i}
            >
              <button
                className="p-3  group focus:outline-none"
                onClick={() =>
                  handleSetMusic({
                    cover: `${song?.track.album.images[0].url}`,
                    name: `${song?.track.name}`,
                    src: `${song?.track.preview_url}`,
                    artist: `${song?.track.artists[0].name}`,
                  })
                }
              >
                <svg
                  className="w-4 h-4 group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
              <div className="text-xs text-gray-400">
                <img src={song?.track.album.images[0].url} width={50} />
              </div>
              <div className="flex-1">
                <span>{song?.track.artists[0].name}</span> -{" "}
                <span>{song?.track.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {currentMusic.length !== 0 && <MusicPlayer tracks={[currentMusic]} />}
    </>
  );
};

export default MusicCat;
