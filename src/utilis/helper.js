export const validateEmail = (email)=>{
    const regax =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regax.test(email);
}

export const getInitials = (name)=>{
    if(!name) return "";

    const words = name.split("");
        let initials = "";

    for (let i=0; i< Math.min(words.length,2); i++){
        initials += words[1] [0];
    }

    return initials.toUpperCase();
}

export const getEmptyCardMessage = (filterType)=>{
    switch(filterType){
        case"search":
        return `Oops! No stories found matching your search.`;
        
        case"date":
        return `No stories found in the given date range`;

        default:
            return`Start creating your first Travel Story! Click the 'Add' button to jot down your thoughts, ideas, and memories. Let's get started!`;
    }
}
// export const getEmptyCardImg = (filterType)=>{
//     switch(filterType){
//         case"search":
//         return `Oop`
//     }
// }