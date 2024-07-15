const catModel = require("../model/category.schema");

const Catcreate = async (req, res) => {
  try {
    console.log(req.body);
    let cat = await catModel.create({
      CatName: req.body.CatName,
      SubCatId: req.body.SubCatId || [], // Initialize as empty array if not provided
    });
    res.send(cat);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message }); // Added error response
  }
};

const UpdateData = async (req, res) => {
  try {
    let { id } = req.params;
   
    let subCatIds = Array.isArray(req.body.SubCatId) ? req.body.SubCatId : [req.body.SubCatId];

    let data = await catModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { SubCatId: { $each: subCatIds } }, // Add unique subcategory IDs to the array
      },
      { new: true }
    ); // Return the updated document
    res.send(data);

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message }); // Added error response
  }
};

const getData = async (req, res) => {
  try {
    let data = await catModel.find().populate({
      path: "SubCatId",
      populate: { path: "extraCatId" },
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message }); // Added error response
  }
};

module.exports = { Catcreate, UpdateData, getData };
