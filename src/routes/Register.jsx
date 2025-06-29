import { useFormik } from "formik"

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirm_password: ''
}

const validateForm = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username Required'
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(values.password)) {
    errors.password = (<span>
      Password must contain:
      <ul>
        <li className="list-disc ml-4">At least 8 characters</li>
        <li className="list-disc ml-4">At least 1 lowercase letter</li>
        <li className="list-disc ml-4">At least 1 uppercase letter</li>
        <li className="list-disc ml-4">At least 1 digit</li>
        <li className="list-disc ml-4">At least 1 special character (e.g. !@#$%^&*)</li>
      </ul>
    </span>)
  }

  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'This field should be same as password'
  }

  return errors
}

const handleFormSubmit = (values) => {
  console.log(values)
}

export default function Register() {

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validate: validateForm
  })

  return (
    <>
      <div className="flex justify-center w-full mt-40">
        <form className='flex flex-col gap-6 w-[480px]' onSubmit={formik.handleSubmit}>
          <h1>Register</h1>
          <div className='flex flex-col items-start w-[480px]'>
            <label htmlFor="username">Username</label>
            <input className="border-1 rounded-sm p-2 w-full" type="text" name="username" onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} />
            {(formik.errors.username && formik.touched.username) ? <div className="text-sm text-red-500 p-1"> {formik.errors.username} </div> : null}
          </div>
          <div className='flex flex-col items-start w-[480px]'>
            <label htmlFor="email">Email</label>
            <input className="border-1 rounded-sm p-2 w-full" type="email" name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email ? <div className="text-sm text-red-500 p-1"> {formik.errors.email} </div> : null}
          </div>
          <div className='flex flex-col items-start w-[480px]'>
            <label htmlFor="password">Password</label>
            <input className="border-1 rounded-sm p-2 w-full" type="password" name="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password ? <div className="text-sm text-red-500 p-1 whitespace-break-spaces"> {formik.errors.password} </div> : null}
          </div>
          <div className='flex flex-col items-start w-[480px]'>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input className="border-1 rounded-sm p-2 w-full" type="password" name="confirm_password" onChange={formik.handleChange} value={formik.values.confirm_password} onBlur={formik.handleBlur} />
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
