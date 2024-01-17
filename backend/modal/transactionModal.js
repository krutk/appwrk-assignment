const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now()
        },
        description: {
            type: String,

        },
        credit: {
            type: Number,
            default: 0
        },
        debit: {
            type: Number,
            default: 0
        },
        running_balance: {
            type: Number,
        }
    }
)
module.exports = transactionSchema;