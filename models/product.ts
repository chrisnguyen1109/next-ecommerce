import { ProductDB } from 'interfaces';
import mongoose, { Document, Model, Schema } from 'mongoose';
import slugify from 'slugify';

export interface ProductDocument extends ProductDB, Document {}

interface ProductModel extends Model<ProductDocument> {}

const trimmedString = { type: String, trim: true };

const productSchema: Schema<ProductDocument, ProductModel> = new Schema(
    {
        title: {
            ...trimmedString,
            required: [true, 'Title field must be required!'],
            unique: true,
        },
        slug: {
            ...trimmedString,
        },
        price: {
            type: Number,
            required: [true, 'Price field must be required!'],
        },
        description: {
            ...trimmedString,
            required: [true, 'Description field must be required!'],
        },
        content: {
            ...trimmedString,
            required: [true, 'Content field must be required!'],
        },
        imageCover: {
            type: String,
            required: [true, 'Image cover field must be required'],
        },
        images: [String],
        checked: {
            type: Boolean,
            default: false,
        },
        inStock: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category must be required!'],
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret) {
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.__v;
                return ret;
            },
        },
    }
);

productSchema.index({ slug: 1 });

productSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });

    next();
});

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
    });

    next();
});

export const Product =
    (mongoose.models?.Product as ProductModel) ||
    mongoose.model<ProductDocument, ProductModel>('Product', productSchema);
