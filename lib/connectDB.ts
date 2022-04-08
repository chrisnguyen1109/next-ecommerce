import createHttpError from 'http-errors';
import mongoose from 'mongoose';

// export const connectDB =
//     (handler: NextApiHandler) =>
//     async (req: NextApiRequest, res: ApiResponse) => {
//         if (mongoose.connections[0].readyState) {
//             return handler(req, res);
//         }

//         if (
//             !process.env.DATABASE ||
//             !process.env.DATABASE_PASSWORD ||
//             !process.env.DATABASE_USERNAME
//         ) {
//             throw createHttpError(503, 'Connect database failed!');
//         }

//         await mongoose.connect(process.env.DATABASE);

//         console.log('Connect database successfully!');

//         return handler(req, res);
//     };

export const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }

    if (
        !process.env.DATABASE ||
        !process.env.DATABASE_PASSWORD ||
        !process.env.DATABASE_USERNAME
    ) {
        throw createHttpError(503, 'Connect database failed!');
    }

    await mongoose.connect(process.env.DATABASE);

    console.log('Connect database successfully!');
};
