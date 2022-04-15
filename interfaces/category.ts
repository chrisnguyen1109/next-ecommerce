import { HasId, TimeStamp } from './common';

export interface CategoryDB {
    name: string;
}

export type CategoryC = CategoryDB & HasId & TimeStamp;
