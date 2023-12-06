import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectUser } from "../authSlice"

const Protected = ({children}) => {

    const user = useSelector(selectUser);

    if( !user ){
        return(
            <Navigate to='/login'></Navigate>
        )
    }

  return (
    children
  )
}

export default Protected