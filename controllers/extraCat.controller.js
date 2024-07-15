const extracatModel = require("../model/ExtraCat.schema");

const extraCatcreate = async (req, res) => {
  try {
    console.log(req.body);
    let cat = await extracatModel.create(req.body);
    res.send(cat);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { extraCatcreate };
