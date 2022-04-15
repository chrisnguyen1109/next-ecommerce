import createHttpError from 'http-errors';
import { ApiRequest, ApiResponse } from 'interfaces';
import { checkAuth, getFilterData } from 'lib';
import { Product, ProductDocument } from 'models';

export const getProducts = async (
    req: ApiRequest,
    res: ApiResponse<ProductDocument[]>
) => {
    const data = await getFilterData<ProductDocument>(
        Product,
        req.query,
        'title',
        'description'
    );

    return res.status(200).json({
        message: 'Success',
        data,
    });
};

export const getProduct = async (
    req: ApiRequest,
    res: ApiResponse<ProductDocument>
) => {
    const id = req.query.id;

    const product = await Product.findById(id);

    if (!product) {
        throw createHttpError(404, `No product with this id: ${id}`);
    }

    return res.status(201).json({
        message: 'Success',
        data: {
            record: product,
        },
    });
};

export const createProduct = async (
    req: ApiRequest,
    res: ApiResponse<ProductDocument>
) => {
    await checkAuth(req, res as ApiResponse);

    const newProduct = await Product.create({ ...req.body });

    return res.status(201).json({
        message: 'Success',
        data: {
            record: newProduct,
        },
    });
};

export const updateProduct = async (
    req: ApiRequest,
    res: ApiResponse<ProductDocument>
) => {
    await checkAuth(req, res as ApiResponse);

    const id = req.query.id;

    const product = await Product.findByIdAndUpdate(
        id,
        { ...req.body },
        {
            new: true,
            runValidators: true,
        }
    );
    if (!product) {
        throw createHttpError(404, `No product with this id: ${id}`);
    }

    await product.save();

    return res.status(200).json({
        message: 'Success',
        data: {
            record: product,
        },
    });
};

export const deleteProduct = async (req: ApiRequest, res: ApiResponse) => {
    await checkAuth(req, res);

    const id = req.query.id;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw createHttpError(404, `No product with this id: ${id}`);
    }

    return res.status(204).json({
        message: 'Success',
    });
};
