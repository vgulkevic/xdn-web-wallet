import React, {useState} from "react";

const hardcodedUser = {
    name: 'James',
    lastName: 'Zalupin'
};

export const useUser = () => {
    const [user, setUser] = useState(hardcodedUser);

    return user;
}
