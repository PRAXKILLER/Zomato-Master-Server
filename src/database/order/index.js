import mongoose, { mongo } from 'mongoose';

const OrderSchema = new mongoose.Schema({
    users: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    orderDetails: [
        {
            food: {type: mongoose.Types.ObjectId, ref: 'Foods'},
            quantity: {type: Number, required: true},
            paymode:{type: String, required: true},
            status:{type: String, default: "Placed"},
            paymentDeatils: {
                itemTotal: {type: Number, required: true},
                promo: {type: Number, required: true},
                tax: {type: Number, required: true}
            },
        },
    ],
},{
    timestamps: true
});

export const OrderModel = mongoose.model("Orders",OrderSchema);