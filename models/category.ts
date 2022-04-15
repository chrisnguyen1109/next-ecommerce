import { CategoryDB } from 'interfaces';
import mongoose, { Document, Model, Schema } from 'mongoose';

interface CategoryDocument extends CategoryDB, Document {}

interface CategoryModel extends Model<CategoryDocument> {}

const trimmedString = { type: String, trim: true };

const categorySchema: Schema<CategoryDocument, CategoryModel> = new Schema(
    {
        name: {
            ...trimmedString,
            required: [true, 'Category field must be required!'],
            unique: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform(_doc, ret) {
                delete ret.__v;
                return ret;
            },
        },
        toObject: { virtuals: true },
        id: false,
    }
);

categorySchema.virtual('products', {
    ref: 'Product',
    foreignField: 'category',
    localField: '_id',
});

export const Category =
    (mongoose.models?.Category as CategoryModel) ||
    mongoose.model<CategoryDocument, CategoryModel>('Category', categorySchema);
