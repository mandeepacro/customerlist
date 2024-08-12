import React, { useEffect, useState } from 'react'
import { Customer } from '../model/Customer';
import PhotoGrid from './PhotoGrid';
import useIsScreenWidthLessThan from '../hooks/useScreenWidthLessThan';

interface CustomerDetailsComponentProps {
    customer: Customer | null;
}

const MemoizedPhotoGrid = React.memo(PhotoGrid);
const CustomerDetails: React.FC<CustomerDetailsComponentProps> = ({ customer }) => {

    const [showDetailsMobileScreen,setShowDetailsMobileScreen] =  useState<boolean>(false);
    const isMobile = useIsScreenWidthLessThan(767);
    useEffect(()=>{
        if(customer!=null && isMobile) setShowDetailsMobileScreen(true);
    },[customer]);

    const closeDetailsScreenMobile = () => {
        setShowDetailsMobileScreen(false);
    }

    if (customer == null) return <div className={`absolute md:relative left-0 h-full flex items-center justify-center text-2xl text-gray-500`}>Please select a customer to view</div>

    const { number, name } = customer.location.street;
    const { city, state, country, postcode } = customer.location;

    return (
        <div className={`fixed md:relative h-full ${isMobile ? showDetailsMobileScreen ? 'top-0':'hidden':''} left-0 overflow-auto p-8 rounded-md bg-gray-100 z-10 pt-24 md:pt-8`}>
            <div className="md:hidden flex fixed top-0 right-0 md:relative w-full justify-end mb-2 bg-gray-100 z-10 py-6 px-8" onClick={closeDetailsScreenMobile}>
                <button className='text-blue-600'>close</button>
            </div>
            <h1 className='text-4xl font-medium'>{customer.name.first} {customer.name.last}</h1>
         
            <div className="grid grid-cols-2 mt-8">
                <h4 className='text-xl leading-10'><span className='font-semibold'>Email: </span>{customer.email}</h4>
                <h4 className='text-xl col-span-2 md:col-span-1 leading-10'><span className='font-semibold'>Phone: </span>{customer.phone}</h4>
                <h4 className='text-xl col-span-2 leading-10'><span className='font-semibold'>Address: </span>{number}, {name}, {city} {state} {country}, {postcode}</h4>
            </div>
            <hr className='my-6' />
            <MemoizedPhotoGrid cusomerName={customer.name.first} customerID={customer.id.value} />
        </div>
    )
}

export default CustomerDetails