import { useState, useEffect, useRef } from 'react';

const useInfiniteScroll = (callback, recordsEnd) => {
    const [isFetching, setIsFetching] = useState(false);
    const scrollRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (
                scrollRef.current &&
                window.innerHeight + window.scrollY >=
                scrollRef.current.offsetTop + scrollRef.current.offsetHeight &&
                !isFetching
            ) {
                setIsFetching(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching]);

    useEffect(() => {
        if (!isFetching) return;

        if (!recordsEnd) {
            callback();
            setIsFetching(false);
        }
    }, [isFetching, recordsEnd, callback]);

    return { scrollRef, setIsFetching };
};

export default useInfiniteScroll;
