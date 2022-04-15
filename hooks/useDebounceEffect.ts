import { useEffect } from 'react';
import type { EffectCallback, DependencyList } from 'react';

export const useDebouncedEffect = (
    effect: EffectCallback,
    deps: DependencyList = [],
    delay: number = 500
) =>
    useEffect(() => {
        const handler = setTimeout(effect, delay);

        return () => clearTimeout(handler);
    }, [...deps, delay]);
