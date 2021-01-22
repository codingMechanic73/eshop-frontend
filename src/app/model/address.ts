import { UserDetails } from "./UserDetails";

export class Address {
    id: number;
    name: string;
    phone: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    zipcode: string;
    user: UserDetails
}