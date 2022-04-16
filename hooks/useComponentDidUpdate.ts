import { DependencyList, EffectCallback, useEffect } from 'react';
import { useFirstRender } from './useFirstRender';

export const useComponentDidUpdate = (
    effect: EffectCallback,
    deps: DependencyList = []
) => {
    const firstRender = useFirstRender();

    useEffect(() => {
        !firstRender && effect();
    }, [...deps]);
};
