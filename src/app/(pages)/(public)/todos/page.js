import { toast } from 'react-toastify'

export const metadata = {
  title: "Create Todo Here",
  description: "Create Your Todos here "
}

function page() {

  return (
    <div className='w-full min-h-screen bg-green-600 flex justify-center items-center text-white font-bold text-2xl '>
      todos Page
    </div>
  )
}

export default page
