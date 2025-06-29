import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import { loginRequest } from "../app/actions"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export default function Login() {

  const userInfo = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo.sessionToken) {
      navigate('/')
    }
  }, [userInfo])

  const dispatch = useDispatch()

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid Email'),
    password: Yup.string().required('A password is required.').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
  })

  const handleFormSubmit = (values) => {
    console.log(values)
    dispatch(loginRequest(values))
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema
  })

  return (
    <>
      <div className="flex justify-center w-full mt-40">
        <form className='flex flex-col gap-6 w-[480px]' onSubmit={formik.handleSubmit}>
          <h1>Login</h1>
          <div className='flex flex-col items-start w-[480px]'>
            <label htmlFor="email">Email</label>
            <input className="border-1 rounded-sm p-2 w-full" type="email" {...formik.getFieldProps('email')} />
            {formik.errors.email && formik.touched.email ? <div className="text-sm text-red-500 p-1"> {formik.errors.email} </div> : null}
          </div>
          <div className='flex flex-col items-start w-[480px]'>
            <label htmlFor="password">Password</label>
            <input className="border-1 rounded-sm p-2 w-full" type="password" {...formik.getFieldProps('password')} />
            {formik.errors.password && formik.touched.password ? <div className="text-sm text-red-500 p-1 whitespace-break-spaces"> {formik.errors.password} </div> : null}
          </div>
          <div className='flex flex-col items-start w-[480px]'>
            <button className="bg-blue-600 px-4 py-2 rounded-sm cursor-pointer hover:bg-blue-700 font-semibold" type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  )
}
