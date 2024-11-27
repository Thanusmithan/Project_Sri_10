const Stock = require('../models/Stock'); // Stock model
const Supplier = require('../models/Supplier'); // Supplier model

// Fetch stocks (product name and category)
// const getStocks = async (req, res) => {
//   try {
//     const stocks = await Stock.find({}, 'name category'); // Fetch only name and category
//     res.status(200).json(stocks);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch stocks', details: err.message });
//   }
// };
const getStocks = async (req, res) => {
    try {
      const stocks = await Stock.find({}, 'name category'); // Fetch only `name` and `category` fields
      res.status(200).json(stocks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch stocks', details: err.message });
    }
  };
  

// Fetch suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suppliers', details: err.message });
  }
};

// Add a new supplier
const addSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).json({ message: 'Supplier added successfully', supplier: newSupplier });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add supplier', details: err.message });
  }
};

// Update supplier
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update supplier', details: err.message });
  }
};

// Delete supplier
const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSupplier = await Supplier.findByIdAndDelete(id);
    if (!deletedSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted successfully', supplier: deletedSupplier });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete supplier', details: err.message });
  }
};

module.exports = { getStocks, getSuppliers, addSupplier, updateSupplier, deleteSupplier };

