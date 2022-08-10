

export const getSender = (loggedUser,users) =>{
    return users[0]._id === loggedUser ? users[0].name : users[1].name;
}