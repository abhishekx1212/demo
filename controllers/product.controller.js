const nodemailer = require("nodemailer");
const catModel = require("../model/category.schema");
const SubcatModel = require("../model/subCategory.schema");
const extracatModel = require("../model/ExtraCat.schema");
const { user } = require("../model/product.schema");

var catData = [];
const getCat = async(req,res)=>{
  catData = [];
  const selectedValue = req.body.value;
  try {
    let data = await catModel.findById(selectedValue).populate({
      path: "SubCatId",
      populate: { path: "extraCatId" },
    });

    catData = data.SubCatId;
    
    res.send('subcategory changed');
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message }); // Added error response
  }
}

const sendGetdata = (req,res)=>{
    let sendData = catData;
    return res.send(sendData)  
}

var subData = [];
const getSubCat = async(req,res)=>{
  subData = [];
  const selectedValue = req.body.value;
  try {
    let data = await SubcatModel.findById(selectedValue).populate({path: "extraCatId"});
    subData = data.extraCatId;
    
    res.send("Extracategory changed");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message }); // Added error response
  }
}

const sendSubGetdata = (req,res)=>{
    let sendData = subData;
    return res.send(sendData)  
}

let OldData;
const getOldData = async(req,res)=>{
  let {catData, SubCatData, ExtraCatData} = req.body;
  
  OldData = {
   getCatData : await catModel.findById(catData),
   getSubCatData : await SubcatModel.findById(SubCatData),
   getExtraCatData : await extracatModel.findById(ExtraCatData),
}
  return res.send('old data received')
}

const sendOldData = (req,res)=>{
  let getOldData = OldData;
  res.send(getOldData)
} 

const productPage = async (req, res) => {
  const msg = req.flash("msg");
  let cat = await catModel.find();
  let Subcat = await SubcatModel.find();
  let extracat = await extracatModel.find();
  return res.render("product", { msg, cat, Subcat, extracat });
};

const addProduct = async (req, res) => {
  // const { proName, proDescription, proPrice } = req.body;
  try {
    await user.create(req.body).then((data) => {
      console.log("data inserted");
      req.flash("msg", "add");
      return res.send("data inserted");
    });
  } catch (error) {
    console.log(error);
  }
};

const productData = async (req, res) => {
  let data = await user.find({});
  return res.send(data);
};

const deleteData = async (req, res) => {
  let id = req.params.id;
  try {
    await user.findByIdAndDelete(id);
    console.log("Data deleted");
    req.flash("msg", "deleted");
    return res.send("data deleted");
    // res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (req, res) => {
  let id = req.params.id;
  let { proName, proDescription, proPrice, catId, SubCatId, extraCatId } = req.body;
  try {
    await user.findByIdAndUpdate(id, { proName, proDescription, proPrice, catId, SubCatId, extraCatId });
    console.log("Data Updated");
    req.flash("msg", "update");
    // res.status(200).json({ message: "Data Updated successfully" });
    return res.send("Data updated");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  productPage,
  addProduct,
  productData,
  deleteData,
  updateData,
  getCat,
  sendGetdata,
  getSubCat,
  sendSubGetdata,
  getOldData,
  sendOldData
};
