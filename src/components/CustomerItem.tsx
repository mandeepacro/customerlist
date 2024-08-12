import React from 'react'
import { Customer } from '../model/Customer';

interface CustomerItemComponentProps {
  customer: Customer;
  isSelected: boolean;
}

const CustomerItem: React.FC<CustomerItemComponentProps> = ({ customer, isSelected }) => {
  return (
    <a className={`cursor-pointer block border-b border-gray-300 py-4 px-8 ${isSelected ? 'bg-sky-200' : ''}`} >
      <h4 className='text-xl font-semibold'>{customer.name.first} {customer.name.last}</h4>
      <p className='text-gray-500'>
        {customer.gender.slice(0, 1).toUpperCase()}{customer.gender.slice(1)}
      </p>
      <p>
        Phone: {customer.phone}
      </p>
    </a>
  )
}

export default CustomerItem