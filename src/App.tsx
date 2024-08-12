import { useState } from 'react'
import CustomersList from './components/CustomersList'
import CustomerDetails from './components/CustomerDetails'
import { Customer } from './model/Customer';
function App() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  const selectCustomerHandler = (selectedCustomer:Customer) => {
    setSelectedCustomer(selectedCustomer);
  }

  return (
    <>
      <div className="container mx-auto px-8">
        <h1 className="text-center text-4xl h-[15vh] flex items-center justify-center">Customers</h1>
        <div className="flex flex-col md:flex-row w-full border-neutral-200 border-2 rounded-md h-[82vh] overflow-hidden">
          <div className="md:w-3/12 border-r border-gray-200">
            <CustomersList selectCustomerCallback={selectCustomerHandler} />
          </div>
          <div className="md:w-9/12">
            <CustomerDetails customer={selectedCustomer} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
