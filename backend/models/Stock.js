// //Stock.js
// const mongoose = require('mongoose');

// // Define the stock schema
// const stockSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   sku: { type: String, required: true, unique: true },
//   incoming: { type: Number, default: 0 },
//   price: { type: Number, required: true },
//   stock: { type: Number, required: true },
//   value: { type: Number, required: true },
//   status: { type: String, required: true },
// }, { timestamps: true });

// // Create the stock model
// const Stock = mongoose.model('Stock', stockSchema);

// module.exports = Stock;



//Stock.js
const mongoose = require('mongoose');

// Define the stock schema
const stockSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Product name is required'], 
      trim: true 
    },
    category: { 
      type: String, 
      required: [true, 'Category is required'], 
      trim: true 
    },
    sku: { 
      type: String, 
      required: [true, 'SKU is required'], 
      unique: true, 
      trim: true 
    },
    incoming: { 
      type: Number, 
      default: 0, 
      min: [0, 'Incoming quantity cannot be negative'] 
    },
    price: { 
      type: Number, 
      required: [true, 'Price is required'], 
      min: [0, 'Price cannot be negative'] 
    },
    stock: { 
      type: Number, 
      required: [true, 'Stock quantity is required'], 
      min: [0, 'Stock quantity cannot be negative'] 
    },
    value: { 
      type: Number, 
      required: [true, 'Value is required'], 
      min: [0, 'Value cannot be negative'] 
    },
    status: { 
      type: String, 
      enum: ['In Stock', 'Low Stock', 'Out of Stock'], 
      required: [true, 'Status is required'] 
    },
  },
  { 
    timestamps: true // Automatically adds createdAt and updatedAt fields 
  }
);

// Pre-save middleware to automatically calculate stock value
stockSchema.pre('save', function (next) {
  if (this.isModified('price') || this.isModified('stock')) {
    this.value = this.price * this.stock;
  }
  next();
});

// Create the stock model
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
