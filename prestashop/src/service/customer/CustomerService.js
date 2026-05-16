import { getAllCustomers } from "./CustomerApi";
import { saveGuest } from "./GuestApi";
import bcrypt from "bcryptjs";

async function getAllCustomersService() {
    try {
        const customers = await getAllCustomers();
        const filteredCustomers = customers.map(customer => {
            if (customer.id === 1 || customer.id === "1") {
                return ;
            }
            return { 
                id : customer.id,
                lastname : customer.lastname,
                firstName : customer.firstname,
                email : customer.email ,
                isAnnonymous : false ,
                passwd : customer.passwd,
                secure_key : customer.secure_key
            }
        });
        return filteredCustomers.filter(customer => customer !== undefined);
    } catch (error) {
        throw error;
    }
}
async function createGuestForCustomer() {
    try {
        const guest = {
        }
        const savedGuest = await saveGuest(guest);
        console.log("Guest créé : ", savedGuest);
        return savedGuest;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function verifyPassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    console.log("isMatch : ", isMatch);

    return isMatch;
}


export {
    getAllCustomersService,
    createGuestForCustomer,
    verifyPassword
}