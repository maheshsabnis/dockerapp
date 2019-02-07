var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var cors = require("cors");
var instance = express();
var router = express.Router();
instance.use(router);
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(bodyParser.json());
instance.use(cors());

mongoose.connect(
  "mongodb://database:27017/ProductsAppsDb",
  { useNewUrlParser: true }
);

var dbConnect = mongoose.connection;
if (!dbConnect) {
  console.log("Sorry Connection is not established");
  return;
}

instance.get("/api/get", function(request, response) {
  response.send({ status: 200, data: "Some Thing Happened" });
});

var productsSchema = mongoose.Schema({
  ProductId: Number,
  ProductName: String,
  CategoryName: String,
  Manufacturer: String,
  Price: Number
});

var productModel = mongoose.model("Products", productsSchema, "Products");
instance.get("/api/products", function(request, response) {
  productModel.find().exec(function(err, res) {
    if (err) {
      response.statusCode = 500;
      response.send({ status: response.statusCode, error: err });
    }
    response.send({ status: 200, data: res });
  });
});

instance.post("/api/products", function(request, response) {
  // parsing posted data into JSON
  var prd = {
    ProductId: request.body.ProductId,
    ProductName: request.body.ProductName,
    CategoryName: request.body.CategoryName,
    Manufacturer: request.body.Manufacturer,
    Price: request.body.Price
  };
  // pass the parsed object to "create()" method
  productModel.create(prd, function(err, res) {
    if (err) {
      response.statusCode = 500;
      response.send(err);
    }
    response.send({ status: 200, data: res });
  });
});

instance.listen(4000, function() {
  console.log("started listening on port 4000");
});
