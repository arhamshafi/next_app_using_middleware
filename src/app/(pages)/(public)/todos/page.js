import TodoInput from '@/components/TodoInput'
import { toast } from 'react-toastify'

export const metadata = {
  title: "Create Todo Here",
  description: "Create Your Todos here "
}

function page() {

  return (
    <div className='w-full min-h-screen bg-green-600 flex flex-col items-center text-white font-bold text-2xl '>
      <p className='text-white text-2xl font-bold mt-32'>TODOS</p>
      <TodoInput/>
    </div>
  )
}

export default page
