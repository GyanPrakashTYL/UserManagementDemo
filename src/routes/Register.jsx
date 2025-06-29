import { useFormik } from "formik"

export default function Register() {

    return (
    <>
      <div className="flex justify-center w-full mt-40">
        <form className='flex flex-col gap-6 w-[480px]'>
          <h1>Register</h1>
          <div className='flex flex-col items-start w-[480px]'>
            <label for="username">Username</label>
            <input className="border-1 rounded-sm p-2 w-full" type="text" name="username" />
          </div>
          <div className='flex flex-col items-start w-[480px]'>
            <label for="email">Email</label>
            <input className="border-1 rounded-sm p-2 w-full" type="email" name="email" />
          </div>
          <div className='flex flex-col items-start w-[480px]'>
            <label for="password">Password</label>
            <input className="border-1 rounded-sm p-2 w-full" type="password" name="password" />
          </div>
          <div className='flex flex-col items-start w-[480px]'>
            <button className="bg-blue-600 px-4 py-2 rounded-sm cursor-pointer hover:bg-blue-700 font-semibold" type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}
