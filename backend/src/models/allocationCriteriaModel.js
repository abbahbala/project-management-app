// backend/src/models/allocationCriteriaModel.js
const mongoose = require('mongoose');

const allocationCriteriaSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  availability: { type: Number, required: true },
  pastPerformance: { type: Number, required: true }
});

const AllocationCriteria = mongoose.model('AllocationCriteria', allocationCriteriaSchema);

module.exports = AllocationCriteria;
