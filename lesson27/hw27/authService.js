import {ROLES}  from "./config.js";

const user = {
    name: 'John',
    role:ROLES.USER,
};

const admin = {
    name: 'Bill',
    role:  ROLES.ADMIN,
};

const user2 = {
    name: 'Bill',
    role: "SUPER_ADMIN",
};

export function getAuthenticatedUser(){
    //Imitation
    return admin;
}