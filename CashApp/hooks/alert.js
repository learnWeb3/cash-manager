import * as React from 'react'
import Snackbar from '../components/Snackbar'

export const useAlert = () => {
    const [alert, setAlert] = React.useState({
        toggled: false,
        message: "",
        severity: "error"
    })

    return ({
        alert,
        setAlert,
        component: Snackbar
    })
}