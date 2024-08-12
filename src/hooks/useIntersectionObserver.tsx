import React, { useEffect, useState } from 'react'

interface IntersectionObserverProps {
    observerRef: React.MutableRefObject<HTMLDivElement | null>;
    isLoading: boolean;
}

const useIntersectionObserver = ({ observerRef, isLoading }: IntersectionObserverProps) => {
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (observerRef?.current == null) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };


    }, [observerRef, isLoading]);

    return page;
}

export default useIntersectionObserver