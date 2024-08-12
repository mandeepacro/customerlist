import { useEffect, useRef, useState } from 'react'
import { Customer } from '../model/Customer';
import { CustomerAPIResponse } from '../model/APIResponse';
import { MOCK_CUSTOMER_URL } from '../utils/constants';

interface useCustomerListProps {
    page: number;
    showLoader: (value: boolean) => void;
}
const numberOfResults: number = 10;

const useCustomerList = ({ page, showLoader }: useCustomerListProps) => {
    const [customersList, setCustomersList] = useState<Customer[]>([]);
    const [error, setError] = useState<string | null>(null);
    const allCustomersfetched = useRef<boolean>(false);

    const fetchData = async (page: number = 1) => {
        console.log("fetchData calling for page - " + page);
        showLoader(true);
        try {
            const response = await fetch(`${MOCK_CUSTOMER_URL}?page=${page}&results=${numberOfResults}&seed=abc`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const responseJson: CustomerAPIResponse = await response.json();
            if (page == 1) {
                setCustomersList(responseJson.results);
            }
            else {
                setCustomersList((prevData) => [...prevData, ...responseJson.results]);
            }

            if (responseJson.results.length < numberOfResults) allCustomersfetched.current = true;
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            showLoader(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    return { customersList, error, allCustomersfetched }
}

export default useCustomerList