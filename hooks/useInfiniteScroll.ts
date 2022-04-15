import { CallBack } from 'interfaces';
import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteScroll = (callBack: CallBack, isActive: boolean) => {
    const observerRef = useRef<IntersectionObserver>();

    const infiniteScrollRef = useCallback<CallBack<HTMLElement>>(
        node => {
            observerRef.current?.disconnect();

            observerRef.current = new IntersectionObserver(
                entries => {
                    if (entries.length === 0) {
                        return;
                    }

                    if (entries[0].isIntersecting && isActive) {
                        callBack();
                    }
                },
                {
                    rootMargin: '200px',
                }
            );
            if (node) {
                observerRef.current.observe(node);
            }
        },
        [isActive]
    );

    useEffect(() => {
        return () => observerRef.current?.disconnect();
    }, []);

    return infiniteScrollRef;
};
