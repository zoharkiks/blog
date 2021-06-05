import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// Import Icons
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
// Redux
import { useSelector } from "react-redux";

const Navbar = () => {
  // Access State
  const articles = useSelector((state) => state.allArticles.articles);


  // Params
  const clear = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setSearchTerm("");
  }; 

  // Expanding on mobile
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenu = () => {
    setOpen(!open);
    clear();
  };

  return (
    <div className="Navbar font-montserrat ">
      <div className="bg-[#24272B] flex justify-between items-center px-4 py-2 h-20 lg:px-7">
        <h1 className="text-3xl text-[#F1DAC4] py-2 font-semibold sm:text-2xl ">
          {" "}
          <Link onClick={clear} to="/">
            Blogtastic
          </Link>
        </h1>

        <div className="relative hidden lg:flex">
          <input
            type="text"
            name=""
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="bg-gray-300 rounded-3xl pl-5 py-2 px-8 outline-none "
            placeholder="Search..."
          />
          <SearchIcon className="absolute right-1 top-1 text-white sm:top-2 sm:right-2" />
        </div>

        {searchTerm && searchTerm.length >= 2 ?  (
          <div className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 rounded-xl border-gray-200 absolute max-h-[20rem] w-1/2 top-[4rem] left-[9rem]  hidden lg:inline z-10 ">
            <div className="flex flex-col justify-center items-center space-y-5 relative xl:space-y-2 ">
              <span className="text-2xl mt-2 text-left w-full ml-20 text-white">
                Your search results:
              </span>
              {articles
                .filter((article) => {
                  const title = article.articleTitle.toLowerCase();
                  const term = searchTerm.toLowerCase();
                  if (searchTerm === "") {
                    return null;
                  } else if (title.includes(term) && term.length >=2 ) {
                    return article;
                  }
                  return false;
                })
                .map((article) => {
                  return (
                    <div key={article._id} className="py-2">
                      <Link to={`/articles/${article.slug}`} onClick={clear}>
                        <div className="bg-illusion p-4 text-white rounded-full text-xl flex flex-col justify-center items-center text-center sm:text-2xl">
                          <h1>{article.articleTitle}</h1>
                          <span className="text-center font-light text-sm sm:text-lg ">
                            by: {article.author}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          ""
        )}

        <span className="text-xl text-white hidden lg:inline" onClick={clear}>
          <Link  to="/allArticles/"> All Articles</Link>
        </span>
        <span className="text-xl text-white hidden lg:inline" onClick={clear}><Link to='/about-me'>About Me</Link></span>

        {/* -----------------------MOBILE NAVIGATION-------------------- */}

        <div className="lg:hidden">
          <MenuIcon
            onClick={handleMenu}
            
          className=" text-[#F1DAC4] !text-[45px] "
          />
        </div>
      </div>
      {open ? (
        <div className="bg-[#7699D4] px-7 h-screen w-full  fixed top-0 z-10 lg:hidden ">
          <div className="bg-[#9448BC] z-10 rounded-xl py-8 mt-5 w-full flex max-h-80 flex-col justify-start items-center pt-10 p-3 ">
            <CloseIcon
              onClick={handleMenu}
              className="absolute top-6 right-8 text-[#F1DAC4] "
            />
            <div className="relative ">
              <input
                type="text"
                name=""
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="bg-[#F26419] text-[#F1DAC4] placeholder-[#F1DAC4] h-9 font-medium rounded-3xl mb-10 pl-5 py-1 outline-none sm:py-3 sm:px-8 sm:rounded-3xl sm:text-lg"
                placeholder="Search..."
              />
              <SearchIcon className="absolute right-2 top-1 text-white sm:top-4 sm:right-2" />
            </div>
            {searchTerm && searchTerm.length >=2 ? (
              <div className='bg-[#F1DAC4] top-[6.5rem] min-h-[11rem] w-[19rem] absolute py-2 rounded-xl border-gray-200 max-h-[19rem] sm:w-[30rem]'>
                <div className="flex flex-col justify-start items-center  space-y-3">
                  <div className="flex flex-col justify-center items-center space-y-5 relative ">
                    {articles
                      .filter((article) => {
                        const title = article.articleTitle.toLowerCase();
                        const term = searchTerm.toLowerCase();
                        if (searchTerm === "") {
                          return null;
                        } else if (title.includes(term) && term.length >=2) {
                          return article;
                        }
                        return false;
                      })
                      .map((article) => {
                        return (
                          <div className='w-full' key={article._id}>
                            <Link to={`/articles/${article.slug}`}>
                              <div
                                className="border-b-2 border-[#24272B] font-medium p-2 space-y-2 text-[#24272B] text-xl flex flex-col  justify-center items-center text-center sm:text-2xl"
                                onClick={handleMenu}
                              >
                                <h1>{article.articleTitle}</h1>
                                <img className='rounded-full h-20 w-20' src={`http://localhost:1337${article?.coverImage?.url}`}/>
                                
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

          <div className="flex flex-col text-[#F1DAC4] font-bold text-2xl items-center space-y-2 ">
          <span className="sm:text-2xl" onClick={handleMenu}>
              <Link to="/">Home</Link>
            </span>
            <span className="sm:text-2xl" onClick={handleMenu}>
              <Link to="/allArticles/"> All Articles</Link>
            </span>
            <span className="sm:text-2xl" onClick={handleMenu}><Link to='/about-me'>About Me</Link></span>
          </div>
            
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
