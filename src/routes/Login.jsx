import { useFormik } from "formik"

const initialValues = {
  email: '',
  password: '',
}

const validateForm = (values) => {
  const errors = {};

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

  return errors
}

const handleFormSubmit = (values) => {
  console.log(values)
}

export default function Login() {

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validate: validateForm
  })

  return (
    <>
      <div className="flex justify-center w-full mt-40">
        <form className='flex flex-col gap-6 w-[480px]' onSubmit={formik.handleSubmit}>
          <h1>Login</h1>
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
            <button className="bg-blue-600 px-4 py-2 rounded-sm cursor-pointer hover:bg-blue-700 font-semibold" type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  )
}
