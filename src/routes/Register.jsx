import { useFormik } from "formik"
import * as Yup from "yup"
import * as Api from '../api/apis'
import { useDispatch } from "react-redux"
import { loginRequest, registerRequest } from "../app/actions"



export default function Register() {

  const dispatch = useDispatch()

  const initialValues = {
  username: '',
  email: '',
  password: '',
  confirm_password: ''
}

const validationSchema = Yup.object({
  username: Yup.string().required('Username Required'),
  email: Yup.string().required('Email is required').email('Invalid Email'),
  password: Yup.string().required('A password is required.').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirm_password: Yup.string().required('Enter the same password').oneOf([Yup.ref("password")], 'Password does not match')
})

const handleFormSubmit = (values) => {
  console.log(values)
  dispatch(registerRequest(values))
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
          <h1>Register</h1>
          <div className='flex flex-col items-start w-[480px]'>
            <label htmlFor="username">Username</label>
            <input className="border-1 rounded-sm p-2 w-full" type="text" {...formik.getFieldProps('username')} />
            {(formik.errors.username && formik.touched.username) ? <div className="text-sm text-red-500 p-1"> {formik.errors.username} </div> : null}
          </div>
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
            <label htmlFor="confirm_password">Confirm Password</label>
            <input className="border-1 rounded-sm p-2 w-full" type="password" {...formik.getFieldProps('confirm_password')} />
            {formik.errors.confirm_password && formik.touched.confirm_password ? <div className="text-sm text-red-500 p-1"> {formik.errors.confirm_password} </div> : null}
          </div>
          <div className='flex flex-col items-start w-[480px]'>
            <button className="bg-blue-600 px-4 py-2 rounded-sm cursor-pointer hover:bg-blue-700 font-semibold" type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}
