import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback: Function, index: number, recordsEnd: boolean, payload?: any) => {
    const [isFetching, setIsFetching] = useState(false);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight ||
            isFetching
        ) {
            return;
        }
        setIsFetching(true);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        if (!recordsEnd) {
            callback(index + 1)
            setIsFetching(false)
        }
    }, [isFetching]);

    return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;
