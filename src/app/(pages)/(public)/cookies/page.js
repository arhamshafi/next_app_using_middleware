import { cookies } from "next/headers";

export default async function Page() {
    const Cookies = await cookies();
    const all_cookies = Cookies.getAll();
    console.log(all_cookies);

    return (
        <div className='w-full min-h-screen bg-blue-600 flex justify-center items-center text-white font-bold text-2xl '>
            {all_cookies.map((c) => (
                <p key={c.name}>{c.name}: {c.value}</p>
            ))}
        </div>
    );
}