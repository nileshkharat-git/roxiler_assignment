const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./Product");


const app = express();

// middleware
app.use(express.json({ extended: false }));
app.use(cors());
// connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/inventory")
  .then(() => console.log("database connection established"))
  .catch(() => console.log("database connection error" + err));

// routes
app.get("/initialize-database", async (req, res) => {
  fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    .then((response) => response.json())
    .then((data) => {
      const products = data.map(async (product) => {
        const newProduct = new Product({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          sold: product.sold,
          dateOfSale: product.dateOfSale,
        });
        await newProduct.save();
      });
      res.status(200).json(products);
    });
});

app.get('/api/products/:month', async (req, res) => {
  const saleMonth = Number(req.params.month);
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const perPage = 10;
  const skip = (page - 1) * perPage;
  try {
    if (search.length > 0) {
      const products = await Product.aggregate([{$match:{$text:{$search:search}}},{$addFields:{month:{$month:"$dateOfSale"}}},{$match:{month:saleMonth}}]).skip(skip).limit(perPage).sort({id: 1});
      return res.status(200).json(products);
      }
      else {
      const products = await Product.aggregate([{$addFields:{month:{$month:"$dateOfSale"}}},{$match:{month:saleMonth}}]).skip(skip).limit(perPage).sort({id: 1});
      return res.status(200).json(products);
      }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.get('/api/products/stat/:month', async (req, res) => {
  const month = Number(req.params.month);
  try {
    const soldItems = await Product.aggregate([{$addFields:{month:{$month:"$dateOfSale"}}},{$match:{month:month, sold:true}},{$group:{"_id":{$month:"$dateOfSale"}, totalSale:{$sum:"$price"},soldItems:{$count:{}}}}, {$sort:{_id:1}}])

    const notSoldItems= await Product.aggregate([{$addFields:{month:{$month:"$dateOfSale"}}},{$match:{month:month, sold:false}},{$group:{"_id":{$month:"$dateOfSale"}, notSoldItems:{$count:{}}}}, {$sort:{_id:1}}])

    for(let i=0;i<notSoldItems.length;i++){
      if(soldItems[i]._id === notSoldItems[i]._id)
        soldItems[i].notSoldItems = notSoldItems[i].notSoldItems
    }
    return res.status(200).json(soldItems)
  } catch (error) {
    return res.status(500).json(error.message);
  }
})

app.get('/api/products/bar-chart/:month', async (req, res) => {
  const month = Number(req.params.month);
  try {
    const data = await Product.aggregate([{$addFields:{month:{$month:"$dateOfSale"}}},{$match:{month:month}},{$bucket:{groupBy:"$price", boundaries:[0,100,200,300,400,500,600,700,800,900], default:"Greater tham 900", output:{count:{$sum:1}}}},{$sort:{_id:1}}])
    const prepareData = []
    data.map((item)=>{
      let obj = {"label":null,"value":null}
      if (0 >= item._id && item._id <= 100) {
        obj.label = "0-100";
        obj.value = item.count;
      } else if ((101 >= item._id) && (item._id <= 200)) {
        obj.label = "101-200";
        obj.value = item.count;
      } else if ((201 >= item._id) && (item._id <= 300)) {
        obj.label = "201-300";
        obj.value = item.count;
      } else if ((301 >= item._id) && (item._id <= 400)) {
        obj.label = "301-400";
        obj.value = item.count;
      } else if ((401 >= item._id) && (item._id <= 500)) {
        obj.label = "401-500";
        obj.value = item.count;
      } else if ((501 >= item._id) && (item._id <= 600)) {
        obj.label = "501-600";
        obj.value = item.count;
      } else if ((601 >= item._id) && (item._id <= 700)) {
        obj.label = "601-700";
        obj.value = item.count;
      } else if ((701 >= item._id) && (item._id <= 800)) {
        obj.label = "701-800";
        obj.value = item.count;
      } else if ((801 >= item._id) && (item._id <= 900)) {
        obj.label = "801-900";
        obj.value = item.count;
      } else if (900 >= item._id) {
        obj.label = "Greater than 900";
        obj.value = item.count;
      }
      prepareData.push(obj);
    })
    return res.status(200).json(prepareData);

  } catch (error) {
    return res.status(500).json(error.message)
  }
})

app.get('/api/products/pie-chart/:month', async (req, res) => {
  const month = Number(req.params.month);
  try {
    const data = await Product.aggregate([{$addFields:{month:{$month:"$dateOfSale"}}},{$match:{month:month}},{$group:{"_id":"$category", itemCount:{$sum:1}}},{$sort:{_id:1}}])

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error.message);
  }
})

app.get('/api/all/:month', async (req, res)=> {
  const month = Number(req.params.month);
  let stat, barChart, pieChart;

  await fetch(`http://localhost:8000/api/products/stat/${month}`)
  .then(res => res.json())
  .then(json => stat=json)
  .catch(err => console.error('error:' + err));

  await fetch(`http://localhost:8000/api/products/bar-chart/${month}`)
  .then(res => res.json())
  .then(json => barChart=json)
  .catch(err => console.error('error:' + err));

  await fetch(`http://localhost:8000/api/products/pie-chart/${month}`)
  .then(res => res.json())
  .then(json => pieChart=json)
  .catch(err => console.error('error:' + err));

  const data = {
    stat: stat,
    barChart: barChart,
    pieChart: pieChart
  }
  return res.status(200).json(data);
})
app.listen(8000, () => {
  console.log("server listening on http://localhost:8000");
});
