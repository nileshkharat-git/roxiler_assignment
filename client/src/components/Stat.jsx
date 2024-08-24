import React, {useEffect, useState} from "react";

const Stat = () => {
    const [salesData, setSalesData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(3);
 useEffect(() =>{
    fetch(`http://localhost:8000/api/products/stat/${selectedMonth}`)
     .then((response) => response.json())
     .then((data) => {
        setSalesData(data)
    });
  }, [selectedMonth]);

  const months = [
    { text: "Jan", value: 1 },
    { text: "Feb", value: 2 },
    { text: "Mar", value: 3 },
    { text: "Apr", value: 4 },
    { text: "May", value: 5 },
    { text: "Jun", value: 6 },
    { text: "Jul", value: 7 },
    { text: "Aug", value: 8 },
    { text: "Sep", value: 9 },
    { text: "Oct", value: 10 },
    { text: "Nov", value: 11 },
    { text: "Dec", value: 12 },
  ];

  if(salesData.length > 0){
    {console.log(salesData);}
    return (
      <div className="my-8">
          <h2 className="text-2xl font-bold text-gray-900">Statistics</h2>
          <select className="outline-none focus:outline-none p-2 bg-white rounded-3xl" onChange={(e)=>setSelectedMonth(e.target.value)}>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.text}
            </option>
          ))}
        </select>
          <div className="flex flex-wrap gap-4">
            <div className="w-1/2">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">
                  Total Sales
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {salesData[0].totalSale}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">
                  Sold items
                </p>
                <p className="text-2xl font-bold text-gray-900">{salesData[0].soldItems}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">
                  Not Sold items
                </p>
                <p className="text-2xl font-bold text-gray-900">{salesData[0].notSoldItems}</p>
              </div>
            </div>
          </div>
      
      </div>
    );
  } 
  return <div>Loading...</div>
};

export default Stat;
