const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  proName: String,
  proDescription: String,
  proPrice: String,
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categoryTbl",
  },
  SubCatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubcategoryTbl",
  },
  extraCatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "extracategoryTbl",
  }
});
const user = mongoose.model("productData", userSchema);

module.exports = { user };
