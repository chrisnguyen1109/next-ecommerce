import { FieldOfModel, ServerResponse } from 'interfaces';
import { Model, Document } from 'mongoose';
import { FeatureApi } from './featureApi';
import { getPagination } from './pagination';

export const getFilterData = async <T extends Document>(
    model: Model<T>,
    queryObject: Record<string, any>,
    ...searchFields: FieldOfModel<T>[]
): Promise<ServerResponse<T[]>['data']> => {
    const featureApi = new FeatureApi<T>(model, queryObject);
    const query = featureApi
        .search([...searchFields])
        .projecting()
        .sort()
        .paginate();

    const [data, totalData] = await Promise.all([
        query.execute(),
        model.count(),
    ]);

    return {
        records: data,
        pagination: getPagination(queryObject, data, totalData),
    };
};
