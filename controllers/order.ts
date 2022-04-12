import createHttpError from 'http-errors';
import { ApiRequest, ApiResponse } from 'interfaces';
import { checkAuth } from 'lib';
import { Order, OrderDocument } from 'models';

export const getOrders = async (req: ApiRequest, res: ApiResponse) => {
    const orders = await Order.find();

    return res.status(201).json({
        message: 'Success',
        data: {
            records: orders,
        },
    });
};

export const getOrder = async (
    req: ApiRequest,
    res: ApiResponse<OrderDocument>
) => {
    const id = req.query.id;

    const order = await Order.findById(id);

    if (!order) {
        throw createHttpError(404, `No order with this id: ${id}`);
    }

    return res.status(201).json({
        message: 'Success',
        data: {
            record: order,
        },
    });
};

export const createOrder = async (
    req: ApiRequest,
    res: ApiResponse<OrderDocument>
) => {
    await checkAuth(req, res as ApiResponse);

    if (!req.body.cart || req.body.cart.length === 0) {
        throw createHttpError(
            400,
            'Please choose some products to create order!'
        );
    }

    const newOrder = await Order.create({ ...req.body });

    return res.status(201).json({
        message: 'Success',
        data: {
            record: newOrder,
        },
    });
};

export const updateOrder = async (
    req: ApiRequest,
    res: ApiResponse<OrderDocument>
) => {
    await checkAuth(req, res as ApiResponse);

    const id = req.query.id;

    const order = await Order.findByIdAndUpdate(
        id,
        { ...req.body },
        {
            new: true,
            runValidators: true,
        }
    );
    if (!order) {
        throw createHttpError(404, `No order with this id: ${id}`);
    }

    await order.save();

    return res.status(200).json({
        message: 'Success',
        data: {
            record: order,
        },
    });
};
