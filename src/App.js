import "./styles.css";
import { useEffect, useState } from "react";
const PAGE_LIMIT = 10;
export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    // Could be GET or POST/PUT/PATCH/DELETE

    fetch("https://dummyjson.com/products")
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        setProducts(response?.products);
      });
  }, []);
  const handlePage = (n) => {
    setCurrentPage(n);
  };
  const goPrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageCount = Math.ceil(products?.length / PAGE_LIMIT);
  const start = currentPage * PAGE_LIMIT;
  const end = start + 10;
  const goNext = () => {
    if (currentPage + 1 < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };
  if (products?.length) {
    return (
      <div className="App">
        <h1>Pagination</h1>
        <div className="Page">
          <div
            className="Arrow"
            onClick={() => {
              goPrevious();
            }}
          >
            ⏪
          </div>
          {Array.from({ length: products?.length / PAGE_LIMIT }).map((u, n) => {
            return (
              <div
                key={n}
                className={
                  n === currentPage ? "SinglePageSelected" : "SinglePage"
                }
                onClick={() => {
                  handlePage(n);
                }}
              >
                {n + 1}
              </div>
            );
          })}
          <div
            className="Arrow"
            onClick={() => {
              goNext();
            }}
          >
            ⏩
          </div>
        </div>
        <div className="Container">
          {products?.slice(start, end).map((item) => {
            return (
              <div key={item?.id} className="Card">
                <img
                  className="CardImage"
                  height={200}
                  src={item?.images[0]}
                  alt="card image"
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Unable to get products</div>;
  }
}
