import { createContext } from "react";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency ='$'

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        // Check if the current month is before the birth month, or
        // if the months are the same, check if the current day is before the birth day.
        // If either of these conditions is true, it means the birthday for the current year has not passed yet.
        if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--; // Subtract 1 from the age because the birthday hasn't happened yet this year.
        }

        return age;
    }

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const value = {
        calculateAge,
        slotDateFormat,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

