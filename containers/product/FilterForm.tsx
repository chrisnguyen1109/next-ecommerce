import { useDebouncedEffect } from 'hooks';
import {
    CategoryC,
    ProductFields,
    ProductFilter,
    QueryParms,
} from 'interfaces';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

interface FilterFormProps {
    categories: CategoryC[];
    filter: Partial<QueryParms<ProductFields> & ProductFilter>;
    setFilter: Dispatch<
        SetStateAction<Partial<QueryParms<ProductFields> & ProductFilter>>
    >;
}

const FilterForm: React.FC<FilterFormProps> = ({
    categories,
    filter,
    setFilter,
}) => {
    const [searchInput, setSearchInput] = useState<string>(filter.search || '');

    const selectCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        setFilter(prev => {
            return { ...prev, category: value === 'ALL' ? undefined : value };
        });
    };

    useDebouncedEffect(() => {
        setFilter(prev => ({ ...prev, search: searchInput }));
    }, [searchInput]);

    return (
        <InputGroup className="mt-3 mb-5">
            <div className="col-12 my-2 col-md-2">
                <Form.Select
                    onChange={selectCategoryHandler}
                    value={filter.category}
                >
                    <option>ALL</option>
                    {categories.map(({ _id, name }) => (
                        <option key={_id} value={_id}>
                            {name}
                        </option>
                    ))}
                </Form.Select>
            </div>
            <div className="col-12 my-2 col-md-8">
                <FormControl
                    placeholder="Search by name, description"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
            </div>
            <div className="col-12 my-2 col-md-2">
                <Form.Select
                    className="text-uppercase"
                    value={filter.sort}
                    onChange={e =>
                        setFilter(prev => ({
                            ...prev,
                            sort: e.target.value as ProductFields,
                        }))
                    }
                >
                    <option value="-createdAt">Newest</option>
                    <option value="createdAt">Oldest</option>
                    <option value="-stock">Best Sales</option>
                    <option value="-price">Price: Hight - Low</option>
                    <option value="price">Price: Low - Hight</option>
                </Form.Select>
            </div>
        </InputGroup>
    );
};

export default FilterForm;
