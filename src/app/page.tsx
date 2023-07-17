import Link from 'next/link';


export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
           <div className='flex flex-col text-lg'>
               <h1 className='text-2xl'>Register Forms</h1>
               <Link href='form' className='my-4 text-blue-400'>Custom validation</Link>
               <Link href='form-yup' className='text-blue-400'>Yup validation</Link>
           </div>
        </main>
    )
}
