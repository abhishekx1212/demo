const SubcatModel = require("../model/subCategory.schema");

const SubCatcreate = async (req, res) => {
  try {
    console.log(req.body);
    let cat = await SubcatModel.create({
      SubCatName: req.body.SubCatName,
      extraCatId: req.body.extraCatId || [],
    });
    res.send(cat);
  } catch (error) {
    console.log(error.message);
  }
};

const UpdateData = async (req, res) => {
  try {
    let { id } = req.params;

    let extraCatIds = Array.isArray(req.body.extraCatId)
      ? req.body.extraCatId
      : [req.body.extraCatId];

    let data = await SubcatModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { extraCatId: { $each: extraCatIds } }, // Add unique subcategory IDs to the array
      },
      { new: true }
    );
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const getData = async (req, res) => {
  let data = await SubcatModel.find().populate("extraCatId");
  res.send(data);
};

module.exports = { SubCatcreate, UpdateData, getData };
