import HomeLayout from '@/layouts/home-layout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function About() {

    return (
        <>
            <Head title="About">
            </Head>
            <HomeLayout>
            <p>About</p>
            </HomeLayout>
        </>
    );
}
