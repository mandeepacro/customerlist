import React from 'react'
import Spinner from './Spinner';
import useCustomerPhotos from '../hooks/useCustomerPhotos';
import ErrorComponent from './ErrorComponent';

interface PhotoGridComponentProps {
    customerID: number;
    cusomerName: string | null;
}
const PhotoGrid: React.FC<PhotoGridComponentProps> = ({ customerID, cusomerName }) => {
    const { images, loadingImages, error } = useCustomerPhotos(customerID);

    if (error) return <ErrorComponent error={error} />;
    if (images == null || images.length == 0) return <h1 className='text-center mt-10'>Loading images</h1>

    return (
        <>
            <h1 className='text-center mt-10'>{cusomerName}'s favourite wallpapers</h1>
            {
                loadingImages ?
                    <Spinner /> :
                    <div className='grid grid-cols-3 gap-y-10 gap-x-20 mx-16 mt-8'>
                        {
                            images.map(i => <img className='h-60 rounded-xl shadow-xl verflow-hidden w-full object-cover' src={i.download_url} alt={'Image by ' + i.author} key={'image-' + i.id} />)
                        }
                    </div>
            }
        </>

    )
}

export default PhotoGrid