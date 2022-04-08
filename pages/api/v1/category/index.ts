import { createCategory, getCategories } from 'controllers';
import createHttpError from 'http-errors';
import { catchAsync, connectDB } from 'lib';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
    const method = req.method;

    await connectDB();

    switch (method) {
        case 'GET':
            return getCategories(req, res);
        case 'POST':
            return createCategory(req, res);
        default:
            throw createHttpError(405, 'Method not allowed!');
    }
};

export default catchAsync(handler);
