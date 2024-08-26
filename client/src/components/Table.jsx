import React, { useEffect, useState } from "react";

const Table = ({month}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isReadMore, setIsReadMore] = useState(true)

  const fetchData = async () => {
    const url =
      searchText.length > 0
        ? `http://localhost:8000/api/products/${month}?page=${page}&search=${searchText}`
        : `http://localhost:8000/api/products/${month}?page=${page}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => setProducts(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [page, month]);

  const handleIncrement = () => {
    if (page < 6) {
      setPage((prev) => prev + 1);
      fetchData();
    }
  };
  const handleDecrement = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      fetchData();
    }
  };

  const handleSearch = () => {
    fetchData();
  };

 
  return (
    <div>
      <div className="flex items-center justify-between flex-col">
        <div className="flex w-5/12  my-4 ">
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mx-3"
            onClick={handleSearch}
          >
            Search
          </button>
         
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className=" bg-white shadow-md rounded-xl mx-8">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700 uppercase">
              <th className="py-3 px-4 text-left">Id</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Descrition</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Sold</th>
              <th className="py-3 px-4 text-left">Image</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {products.map((product, key) => (
              <tr className="border-b border-blue-gray-200" key={key}>
                <td className="py-3 px-4">{product.id}</td>
                <td className="py-3 px-4">{product.title}</td>
                <td className="py-3 px-4 "><p>{isReadMore ? product.description.slice(0,60):product.description} <span className="font-bold text-blue-500" onClick={()=>setIsReadMore(!isReadMore)}>{isReadMore?"...read more":"Show less"}</span></p></td>
                <td className="py-3 px-4">{product.price} &#8377;</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">
                  {product.sold ? "Sold" : "Not Sold"}
                </td>
                <td className="py-3 px-4"><img src={product.image} alt="" className="w-52 object-fit"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-around my-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleDecrement}
        >
          Previous
        </button>
        <span>{page}</span>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleIncrement}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
