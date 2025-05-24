import { redirect } from 'next/navigation'

const page = () => {
    redirect('/users')
    return (
        null
    )
}

export default page