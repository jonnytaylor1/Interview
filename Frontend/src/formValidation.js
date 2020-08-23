//Checks if a field is valid, if not returns the error message
export const isFieldValid = (name, value)=>{
    let validator = true;
    if(value==="") return "Please insert a value";

    switch(name) {
        case "type":
            if(value==="DEFAULT") validator = "Please choose a type"
            break;

        case "amount":
            if(value < 15000) validator = "Insert value greater than £15000"
            else if(value%1000!==0) validator = "Must be a multiple of 1000"    
            break;
        }
        return validator;
    }
//Checks if the form is valid
export const isFormValid = (validationObject)=>{
for (let key in validationObject){
    if(validationObject[key]!==true){
        return false;
    }
}
return true;
}
