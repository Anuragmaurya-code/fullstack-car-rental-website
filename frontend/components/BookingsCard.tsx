"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { generateCarImageUrl } from "@utils";
import { BookingProps } from "@types";
import { UserButton, useUser } from "@clerk/nextjs";
import { fetchBookings } from "@utils";

const BookingsCard = () => {
    const [myBookings, setMyBookings] = useState<BookingProps[]>([]);
    const { user, isLoaded } = useUser();

    useEffect(() => {
        setInterval(()=>{
            if(isLoaded && user){
            
                try {
                    axios.get("http://localhost:8000/bookings?userId="+user.id).then((response)=>{
                        console.log(response)
                    setMyBookings(response.data);
    
                    })
                    
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
    
            }
        },5000)
        
    }, [user]);

    return (
        <div className="flex flex-col gap-5">

            {myBookings.length > 0 ? myBookings.map((booking: BookingProps, index: number) => (
                <CarCard key={index} car={booking} />
            )):<h1 className=" hero__title text-center p-20 group-hover:invisible justify-between text-grey">
            No bookings by you yet 😔
          </h1>}
        </div>
    );
};

const CarCard = ({ car }: { car: BookingProps }) => {
    const { city_mpg, year, make, model, transmission, drive, price,totalPrice,fromDate,toDate } = car;

    return (
        <div className="car-card group">
        <div className="car-card__content">
          <h2 className="car-card__content-title">
            {make} {model}
          </h2>
        </div>
  
        <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
          <span className='self-start text-[14px] leading-[17px] font-semibold'>₹</span>
          {price}
          <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
        </p>
  
        <div className='relative w-full h-40 my-3 object-contain'>
          <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
        </div>
  
        <div className='relative flex w-full mt-2'>
          <div className='flex w-full justify-between text-grey'>
            <div className='flex flex-col justify-center items-center gap-2'>
            <p className='text-[14px] leading-[17px]'>Total Price</p>
              <h3 className="font-semibold">
              <span className='self-start text-[14px] leading-[17px] font-semibold'>₹ </span>
                {totalPrice}
              </h3>
            </div>
            

            <div className='flex flex-col justify-center items-center gap-2'>
            <p className='text-[14px] leading-[17px]'>From Date</p>
              <h3 className="font-semibold">
                {fromDate}
              </h3>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
            <p className='text-[14px] leading-[17px]'>To Date</p>
              <h3 className="font-semibold">
                {toDate}
              </h3>
            </div>
          </div>
  
          
        </div>

      </div>
    );
};

export default BookingsCard;
