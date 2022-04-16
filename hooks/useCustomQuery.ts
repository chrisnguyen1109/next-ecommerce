import {
    createItem,
    deleteItem,
    fetchItem,
    fetchList,
    updateItem,
} from 'apiClient';
import { DataCreate, HasId, ResponseData } from 'interfaces';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface Feature {
    queryKey: string;
    service: string;
}

interface MutationProps<T extends ResponseData> {
    onError?: (error: any) => void;
    onSuccess?: (response: T) => void;
}

interface UpdateProps<X> {
    id: string;
    body: Partial<X>;
}

const initialCustomQuery = <
    X extends HasId,
    Y extends ResponseData<HasId>,
    Z extends ResponseData<HasId[]>,
    T extends object,
    W extends Omit<DataCreate<X>, keyof X>
>(
    feature: Feature
) => {
    const useItem = (id: string) => {
        return useQuery<Y>(
            [feature.queryKey, id],
            () =>
                fetchItem<Y>({
                    id,
                    service: feature.service,
                }),
            {
                enabled: !!id,
            }
        );
    };

    const useList = (payload: T, enabled: boolean = true) => {
        return useQuery<Z>(
            [feature.queryKey, payload],
            () =>
                fetchList<T, Z>({
                    payload,
                    service: feature.service,
                }),
            {
                enabled,
            }
        );
    };

    const useCreateItem = ({ onError, onSuccess }: MutationProps<Y> = {}) => {
        return useMutation(
            (body: W) =>
                createItem<W, Y>({
                    body,
                    service: feature.service,
                }),
            {
                onError: (error, _newData) => {
                    onError?.(error);
                },
                onSuccess: (response: Y) => {
                    if (
                        response.message === 'Success' &&
                        response.data?.record
                    ) {
                        onSuccess?.(response);
                    }
                },
            }
        );
    };

    const useUpdateItem = ({ onError, onSuccess }: MutationProps<Y> = {}) => {
        const queryClient = useQueryClient();

        return useMutation(
            ({ id, body }: UpdateProps<X>) =>
                updateItem<Partial<X>, Y>({
                    id,
                    body,
                    service: feature.service,
                }),
            {
                onError: error => {
                    onError?.(error);
                },
                onSuccess: (response: Y, variables) => {
                    if (
                        response.message === 'Success' &&
                        response.data?.record
                    ) {
                        onSuccess?.(response);
                        queryClient.invalidateQueries([
                            feature.queryKey,
                            variables.id,
                        ]);
                    }
                },
            }
        );
    };

    const useDeleteItem = ({
        onError,
        onSuccess,
    }: MutationProps<ResponseData<null>> = {}) => {
        return useMutation(
            (id: string) =>
                deleteItem<ResponseData<null>>({
                    id,
                    service: feature.service,
                }),
            {
                onError: error => {
                    onError?.(error);
                },
                onSuccess: (response: ResponseData<null>) => {
                    if (response.message === 'Success') {
                        onSuccess?.(response);
                    }
                },
            }
        );
    };

    return {
        useCreateItem,
        useItem,
        useList,
        useUpdateItem,
        useDeleteItem,
    };
};

export default initialCustomQuery;
