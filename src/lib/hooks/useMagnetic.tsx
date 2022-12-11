import { useEffect } from "react"
import Magnetic from "../../components/MagneticButton/Magnetic"

export const useMagnetic = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('[data-magnetic]')
        elements.forEach((element) => {
            new Magnetic(element)
        })
    }, [])
}