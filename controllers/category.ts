import createHttpError from 'http-errors';
import { ApiRequest, ApiResponse } from 'interfaces';
import { checkAuth } from 'lib';
import { Category } from 'models';

export const getCategories = async (req: ApiRequest, res: ApiResponse) => {
    const categories = await Category.find();

    return res.status(201).json({
        message: 'Success',
        data: {
            records: categories,
        },
    });
};

export const getCategory = async (req: ApiRequest, res: ApiResponse) => {
    const id = req.query.id;

    const category = await Category.findById(id).populate('products');

    if (!category) {
        throw createHttpError(404, `No category with this id: ${id}`);
    }

    return res.status(201).json({
        message: 'Success',
        data: {
            record: category,
        },
    });
};

export const createCategory = async (req: ApiRequest, res: ApiResponse) => {
    await checkAuth(req, res);

    const newCategory = await Category.create({ ...req.body });

    return res.status(201).json({
        message: 'Success',
        data: {
            record: newCategory,
        },
    });
};
