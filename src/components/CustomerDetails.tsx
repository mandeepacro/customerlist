import React from 'react'
import { Customer } from '../model/Customer';
import PhotoGrid from './PhotoGrid';

interface CustomerDetailsComponentProps {
    customer: Customer | null;
}

const MemoizedPhotoGrid = React.memo(PhotoGrid);
const CustomerDetails: React.FC<CustomerDetailsComponentProps> = ({ customer }) => {

    if (customer == null) return <div className='h-full flex items-center justify-center text-2xl text-gray-500'>Please select a customer to view</div>

    const { number, name } = customer.location.street;
    const { city, state, country, postcode } = customer.location;

    return (
        <div className={'h-full overflow-y-scroll p-8  rounded-md  bg-gray-100'}>
            <h1 className='text-4xl font-medium'>{customer.name.first} {customer.name.last}</h1>

            <div className="grid grid-cols-2 mt-8">
                <h4 className='text-xl leading-10'><span className='font-semibold'>Email: </span>{customer.email}</h4>
                <h4 className='text-xl leading-10'><span className='font-semibold'>Phone: </span>{customer.phone}</h4>
                <h4 className='text-xl col-span-2 leading-10'><span className='font-semibold'>Address: </span>{number}, {name}, {city} {state} {country}, {postcode}</h4>
            </div>
            <hr className='my-6' />
            <MemoizedPhotoGrid cusomerName={customer.name.first} customerID={customer.id.value} />
        </div>
    )
}

export default CustomerDetails