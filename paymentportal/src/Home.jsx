import React from 'react'

import axios from "axios";
import { useState } from "react";


const Home = () => {

    const [amt, setAmt] = useState(0);


    const checkoutHandler = async () => {

      var  amount = Number(amt);

        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

        const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
            amount
        })
        console.log(order)

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Indirve",
            description: "Cab payment",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd5jXu3EbRfka2T8ma0F7M8uGRNxHzISEjbV0-j3esnA&s",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                name: "John Simth",
                email: "john.smilth@gmail.com",
                contact: "9898989898"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#131213"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    const fun1 = () =>{
        checkoutHandler();
    }

    return (
        <div>
        <form >
          <label>
            Cab Payment  :  
            <input
                type="text"
                value={amt}
                onChange={(e) => {
                    setAmt(e.target.value);
                }}

                placeholder=""

                style={{
                    width: '200px',
                    height: '30px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '16px',
                  }}
            />
          </label>
          <br></br>
        </form>
          <button type="submit" onClick={fun1}  style={{
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}>
    Submit</button>
      </div>
    )
}

export default Home