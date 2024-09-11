import React, { useEffect, useState } from "react";
import "./newsList.css";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("headlines");
  const [max, setMax] = useState(10);
  const [lang, setLang] = useState("en");
  const [country, setCountry] = useState("in");
  const [message, setMessage] = useState("");
  const [showHead, setShowHead] = useState(true);
  const [totalPages, setTotalPages] = useState(max);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const BASE_URL = "https://maran-gnews-backend.vercel.app";

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/news?query=${query}&lang=${lang}&country=${country}&max=${max}&page=${page}`
      );
      if (!response.ok) {
        throw new Error({ message: "Server Error" });
      }
      const data = await response.json();
      setNews(data.articles);
      setTotalPages(max);
      setMessage("News Fetch Successful");
    } catch (error) {
      setMessage("Error While Fetching News");
      console.error("Error fetching news:", error.message);
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchNews = (e) => {
    e.preventDefault();
    setShowHead(false);
    setPage(1); // Reset to the first page when fetching news
    fetchNews();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentIndex(newPage);
    }
  };

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < totalPages) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex >= 0 && currentIndex < totalPages) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleFetchNews}>
        <div className="form-group form-row">
          <label htmlFor="search">Search</label>
          <input
            className="form-control"
            required
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
          />
        </div>
        <div className="form-row d-flex justify-content-around">
          <div className="form-group col-md-4">
            <label htmlFor="count">Set Count</label>
            <select
              className="form-control"
              required
              id="count"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value, 10))} // Convert to integer
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="language">Select Language</label>
            <select
              className="form-control"
              required
              id="language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ta">Tamil</option>
              <option value="ml">Malayalam</option>
              <option value="te">Telugu</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="country">Select Country</label>
            <select
              className="form-control"
              required
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="in">India</option>
              <option value="gb">United Kingdom</option>
              <option value="us">United States</option>
              <option value="sg">Singapore</option>
              <option value="jp">Japan</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn mx-auto" type="submit">
            Fetch News
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <p className="message">
            {message && <span className="alert alert-info">{message}</span>}
          </p>
        </div>
      </form>

      {showHead ? (
        <>
          <div className="">
            <div className="d-flex justify-content-center">
              <h2 className="headLine">Headlines</h2>
            </div>
            <div className="list-group d-flex justify-content-center">
              {news &&
                news.map((article) => (
                  <div
                    className="list-group-item list-group-item-action"
                    key={article.url}
                  >
                    <a
                      href={article.url}
                      style={{ cursor: "pointer" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="black">{article.title}</p>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="slideshow">
            {news.length > 0 ? (
              <>
                {" "}
                <div className="card" key={news[currentIndex].url}>
                  <img
                    className="newsImg"
                    src={news[currentIndex].image}
                    alt={news[currentIndex].title}
                  />
                  <div className="cardContent">
                    <h3 className="newsTitle">{news[currentIndex].title}</h3>
                    <p className="newsDescription">
                      {news[currentIndex].description}
                    </p>
                    <p className="newsDate">
                      {new Date(news[currentIndex].publishedAt).toDateString()}
                    </p>
                    <a
                      className="moreButton"
                      href={news[currentIndex].url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                </div>
                <nav>
                  <div className="pagination">
                    <button
                      onClick={handlePrev}
                      disabled={currentIndex < 1}
                      className={`btn paginationButton ${
                        currentIndex < 1 ? "disabled" : ""
                      }`}
                    >
                      {"<<"}
                    </button>

                    <div className="paginationNum">
                      {[...Array(totalPages).keys()].map((num) => (
                        <div key={num}>
                          <button
                            onClick={() => handlePageChange(num)}
                            className={`btn btn2 paginationButton ${
                              num + 1 === page ? "active" : ""
                            }`}
                          >
                            {num + 1}
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={currentIndex === totalPages - 1}
                      className={`btn paginationButton ${
                        currentIndex === totalPages - 1 ? "disabled" : ""
                      }`}
                    >
                      {">>"}
                    </button>
                  </div>
                </nav>
              </>
            ) : (
              <>
                <p className="alert alert-danger">
                  Some error Occured. Try with new keywords
                </p>
              </>
            )}
          </div>
        </>
      )}
      <button
        className="btn"
        onClick={scrollToTop}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        Scroll to Top
      </button>
    </div>
  );
};

export default NewsList;
