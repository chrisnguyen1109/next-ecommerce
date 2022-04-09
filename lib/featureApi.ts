import { FieldOfModel } from 'interfaces';
import { Model, Document, Query, FilterQuery } from 'mongoose';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './pagination';

export class FeatureApi<T extends Document> {
    private query: Query<T[], T>;

    constructor(
        private model: Model<T>,
        private queryString: Record<string, any>
    ) {
        this.query = this.filter();
    }

    private filter() {
        const excludeFields = ['page', 'sort', 'limit', 'fields', 'search'];
        const queryObject = excludeFields.reduce(
            (prev, current) => {
                delete prev[current];
                return prev;
            },
            { ...this.queryString }
        ) as FilterQuery<T>;

        for (const key in queryObject) {
            const matchFilter = key.match(/\b(gte|gt|lte|lt)\b/);

            if (matchFilter) {
                const filterType = `$${matchFilter[0]}`;
                const filterField = key.replace(
                    `[${matchFilter[0]}]`,
                    ''
                ) as keyof T;
                queryObject[filterField] = {
                    ...queryObject[filterField],
                    [filterType]: queryObject[key],
                };
            }
        }

        return this.model.find(queryObject);
    }

    search(fileds: FieldOfModel<T>[]): FeatureApi<T> {
        if (this.queryString.search && fileds.length > 0) {
            const searchField = fileds.map(field => ({
                [field]: new RegExp(`${this.queryString.search.trim()}`, 'i'),
            })) as FilterQuery<T>[];

            this.query.or(searchField);
        }

        return this;
    }

    sort(): FeatureApi<T> {
        this.queryString.sort
            ? this.query.sort(this.queryString.sort)
            : this.query.sort('-createdAt');

        return this;
    }

    projecting(): FeatureApi<T> {
        this.queryString.fields && this.query.select(this.queryString.fields);

        return this;
    }

    paginate(): FeatureApi<T> {
        const page = +this.queryString.page || DEFAULT_PAGE;
        const limit = +this.queryString.limit || DEFAULT_LIMIT;
        const skip = (page - 1) * limit;
        this.query.skip(skip).limit(limit);

        return this;
    }

    execute() {
        return this.query;
    }
}
