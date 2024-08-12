import { useState, useEffect } from 'react'
import { CustomerImage } from '../model/Image';
import { RANDOM_IMAGES_URL } from '../utils/constants';

const noOfImages: number = 9;
const refreshImagesInterval: number = 10000; // in milliseconds

const useCustomerPhotos = (customerID: number) => {
    const [loadingImages, setLoadingImages] = useState<boolean>(true);
    const [images, setImages] = useState<CustomerImage[]>([]);
    const [error, setError] = useState<string | null>(null);
    let pageNumber;

    const fetchImageData = async () => {
        pageNumber = Math.floor(Math.random() * 11) + 1; //to generate random page number
        try {
            setLoadingImages(true);
            const response = await fetch(`${RANDOM_IMAGES_URL}?page=${pageNumber}&limit=${noOfImages}`);
            if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
            const res: CustomerImage[] = await response.json();
            setImages(res);
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        }
        finally {
            setLoadingImages(false);
        }
    };

    useEffect(() => {
        let timer: number;
        fetchImageData();
        timer = setInterval(fetchImageData, refreshImagesInterval);
        return () => clearInterval(timer);
    }, [customerID])

    return { images, loadingImages, error };
}

export default useCustomerPhotos