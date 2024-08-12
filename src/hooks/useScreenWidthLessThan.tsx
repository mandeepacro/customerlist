import { useState, useEffect } from 'react';

const useIsScreenWidthLessThan = (width: number) => {
    const [isScreenWidthLessThan, setIsScreenWidthLessThan] = useState<boolean>(window.innerWidth < width);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenWidthLessThan(window.innerWidth < width);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [width]);

    return isScreenWidthLessThan;
};

export default useIsScreenWidthLessThan;
