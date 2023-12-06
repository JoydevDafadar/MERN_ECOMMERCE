import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectUser } from "../authSlice"

const AdminProtected = ({children}) => {

    const user = useSelector(selectUser);

    if( !user ){
        return(
            <Navigate to='/login'></Navigate>
        )
    }
    if( !user && user.role !== 'admin' ){
        return(
            <Navigate to='/'></Navigate>
        )
    }

  return (
    children
  )
}

export default AdminProtected