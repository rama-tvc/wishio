const users = [ {
    email: "dcox.net@gmail.com",
    password: "123456"
},
{
    email: "timur@rama.gg",
    password: "123456"
},
{
    email: "helloadmin@gmail.com",
    password: "123456"
}
]

export const getUserByEmail = email =>{
    const found = users.find(user => user.email === email );
    return found; 
}