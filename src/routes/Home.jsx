import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { secretChangeRequest } from "../app/actions"

export default function Home() {

    const userData = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const changeSecret = (value) => {
        dispatch(secretChangeRequest({newSecret: value.newSecret, sessionToken: userData.sessionToken}))
    }

    const formik = useFormik({
        initialValues: {
            newSecret: ''
        },
        onSubmit: changeSecret
    })

    const navigate = useNavigate()

    useEffect(() => {
        if(!userData.sessionToken) {
            navigate('/login')
        }
    }, [userData])

    return (
        <>
            <div className="w-full flex flex-col items-center mt-20">
                <div className="w-[400px] text-2xl">
                    <span>Username: </span>
                    <span>{userData.username}</span>
                </div>
                <div className="w-[400px] text-2xl">
                    <span>Email: </span>
                    <span>{userData.email}</span>
                </div>
                <div className="w-[400px] text-2xl">
                    <span>Secret: </span>
                    <span>{userData.secret}</span>
                </div>
                <form className="w-[400px] text-1xl mt-4" onSubmit={formik.handleSubmit}>
                    <label htmlFor="newSecret">New Secret: </label>
                    <input className="border-1 rounded-sm ml-2" type="text" {...formik.getFieldProps('newSecret')} />
                    <button className="bg-blue-600 px-4 py-2 rounded-sm mt-2 hover:bg-blue-700 cursor-pointer font-semibold" type="submit">Change Secret</button>
                </form>
            </div>
        </>
    )
}