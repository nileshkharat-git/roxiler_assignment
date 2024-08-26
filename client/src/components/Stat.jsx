import React, {useEffect, useState} from "react";

const Stat = ({month}) => {
    const [salesData, setSalesData] = useState({});

    useEffect(() =>{
        fetch(`http://localhost:8000/api/products/stat/${month}`)
        .then((response) => response.json())
        .then((data) => {
            setSalesData(data)
        });
      }, [month]);



  if(salesData.length > 0){
    return (
      <div className="my-8 mx-auto w-3/6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Statistics</h2>
          <div className="flex flex-wrap gap-4 justify-around">
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
                <p className="text-2xl font-bold text-gray-900">{salesData[0].soldItems?salesData[0].soldItems:0}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">
                  Not Sold items
                </p>
                <p className="text-2xl font-bold text-gray-900">{salesData[0].notSoldItems?salesData[0].notSoldItems:0}</p>
              </div>
            </div>
          </div>
      
      </div>
    );
  } 
  return <div>Loading...</div>
};

export default Stat;
