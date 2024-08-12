
export interface Customer {
    id: {
        value:number
    };
    gender:string;
    name: {
      first:string;
      last:string;
    };
    email: string;
    phone?: string; 
    location: {
      street: {
        number: number,
        name:string;
      };
      city: string;
      state: string;
      country: string;
      postcode: number;
    };
  }