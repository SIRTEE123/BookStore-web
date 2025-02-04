import axios from 'axios'


export const payment = async (token) => 
    await axios.post('https://book-store-api-coral.vercel.app/api/user/create-payment-intent', {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})