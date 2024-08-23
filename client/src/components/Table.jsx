import React, { useEffect, useState } from "react";

const Table = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() =>{
        fetch('http://localhost:8000/api/products')
        .then(response => response.json())
        .then(response => setProducts(response))
        .catch(err => console.error(err));
    },[products, setProducts])

    const fetchProducts = (page)=>{
        fetch(`http://localhost:8000/api/products?page=${page}`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setProducts(response);
        })
        .catch(err => console.error(err));
    }
    const handleIncrement = () => {
        if(page <6){
            setPage((prev)=>prev + 1);
            fetchProducts(page);
        }
    }
    const handleDecrement = () => {
        if(page > 1){
            setPage((prev)=>prev - 1);
            fetchProducts(page);
        }
    }
    const months = [{"text":"Jan", value:1 }, {"text":"Feb", value:2}, {"text":"Mar", value:3}, {"text":"Apr", value:4}, {"text":"May", value:5 }, {"text":"Jun", value:6}, {"text":"Jul", value:7}, {"text":"Aug", value:8}, {"text":"Sep", value:9}, {"text":"Oct", value:10}, {"text":"Nov", value:11}, {"text":"Dec", value:12}]
  return (
    <div>
      <div className="flex items-center justify-between flex-col">
        <div className="flex justify-between w-3/12 my-4">
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Search"
            required
          />
          <select className="outline-none focus:outline-none p-2 bg-white rounded-3xl">
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.text}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-xl mx-4">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700 uppercase">
                <th className="py-3 px-4 text-left">Id</th>
                <th className="py-3 px-4 text-left">Title</th>
                {/* <th className="py-3 px-4 text-left">Descrition</th> */}
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Sold</th>
                {/* <th className="py-3 px-4 text-left">Image</th> */}
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
                {products.map(product =>(
                    <tr className="border-b border-blue-gray-200">
                        <td className="py-3 px-4">{product.id}</td>
                        <td className="py-3 px-4">{product.title}</td>
                        {/* <td className="py-3 px-4 "><p>{product.description}</p></td> */}
                        <td className="py-3 px-4">{product.price} &#8377;</td>
                        <td className="py-3 px-4">{product.category}</td>
                        <td className="py-3 px-4">{product.sold ? "Sold" :"Not Sold"}</td>
                        {/* <td className="py-3 px-4">{product.image}</td> */}
                    </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-around my-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" onClick={handleDecrement}>
              Previous
            </button>
            <span>{page}</span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" onClick={handleIncrement}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
