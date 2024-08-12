import { useState, useRef, useCallback } from 'react'
import { Customer } from '../model/Customer';
import CustomerItem from './CustomerItem';
import Spinner from './Spinner';
import ErrorComponent from './ErrorComponent';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useCustomerList from '../hooks/useCustomerList';

interface CustomersListComponentProps {
    selectCustomerCallback: (customer: Customer) => void;
}

const CustomersList: React.FC<CustomersListComponentProps> = ({ selectCustomerCallback }) => {
    const [selectedCustomerID, setSelectedCustomerID] = useState<number | null>(0);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const page = useIntersectionObserver({ observerRef, isLoading });

    const showLoader = (value: boolean) => {
        setIsLoading(value);
    }
    const handleCustomerClick = (customer: Customer) => () => selectCustomer(customer);

    const { customersList, error, allCustomersfetched } = useCustomerList({ page, showLoader });
    const selectCustomer = useCallback((customer: Customer) => {
        setSelectedCustomerID(customer.id.value);
        selectCustomerCallback(customer);
    }, [selectCustomerCallback]);
    
    if (error) return <ErrorComponent error={error} />;

    if (customersList == null) return <p>No items</p>;

    return (
        <div>
            <div className='h-[82vh] overflow-y-scroll'>
                {
                    customersList.map((customer, index) =>
                        <div onClick={handleCustomerClick(customer)} key={customer.id.value + "-" + index}>
                            <CustomerItem isSelected={selectedCustomerID != null && selectedCustomerID === customer.id.value} key={customer.id.value} customer={customer} />
                        </div>)
                }
                {
                    !allCustomersfetched.current && <div ref={observerRef}>
                        <Spinner />
                    </div>
                }
            </div>

        </div>
    )
}

export default CustomersList