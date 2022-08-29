const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  getACustomer,
  postCustomer,
  patchCustomer,
  deleteCustomer,
} = require("../controllers/customers.js");

router.get("/", getAllCustomers);
router.get("/:name&:phone", getACustomer);
router.post("/", postCustomer);
router.patch("/:name&:phone", patchCustomer);
router.delete("/:name&:phone", deleteCustomer);

module.exports = router;
