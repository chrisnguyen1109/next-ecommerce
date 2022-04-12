import createHttpError from 'http-errors';
import { Delivery, OrderDB } from 'interfaces';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { Product } from './product';

export interface OrderDocument extends OrderDB, Document {}

interface OrderModel extends Model<OrderDocument> {}

const trimmedString = { type: String, trim: true };

const orderSchema: Schema<OrderDocument, OrderModel> = new Schema(
    {
        address: {
            ...trimmedString,
            required: [true, 'Address field must be required!'],
        },
        mobile: {
            ...trimmedString,
            required: [true, 'Mobile field must be required!'],
            match: [
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Invalid mobile phone!',
            ],
        },
        total: {
            type: Number,
            required: [true, 'Total field must be required!'],
        },
        paymentId: {
            ...trimmedString,
        },
        delivery: {
            type: String,
            enum: {
                values: Object.values(Delivery),
                message:
                    'Delivery is either: standard shipping, priority shpping or no shipping!',
            },
        },
        paid: {
            type: Boolean,
            default: false,
        },
        paymentDate: Date,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User must be required!'],
        },
        cart: [
            {
                quantity: Number,
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret) {
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.isFeatured;
                delete ret.__v;
                return ret;
            },
        },
    }
);

orderSchema.pre('save', async function (next) {
    if (!this.isModified('cart')) return next();

    await Promise.all(
        this.cart.map(async ({ product, quantity }) => {
            const matchingProduct = await Product.findById(product);

            if (!matchingProduct) {
                throw createHttpError(
                    404,
                    `No product with this id: ${product}`
                );
            }

            if (
                matchingProduct.inStock === undefined ||
                matchingProduct.sold === undefined
            ) {
                throw createHttpError(500, 'This product is unavailble!');
            }

            if (quantity > matchingProduct.inStock) {
                throw createHttpError(
                    400,
                    'The quantity of products demanded exceeds the quantities offered!'
                );
            }

            matchingProduct.inStock = matchingProduct.inStock - quantity;
            matchingProduct.sold = matchingProduct.sold + quantity;

            return matchingProduct.save();
        })
    );

    next();
});

orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
    });

    this.populate({
        path: 'cart.product',
        select: 'title slug price description content imageCover',
    });

    next();
});

export const Order =
    (mongoose.models?.Order as OrderModel) ||
    mongoose.model<OrderDocument, OrderModel>('Order', orderSchema);
