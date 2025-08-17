import HomeLayout from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';

export default function Blog() {

    return (
        <>
            <Head title="Blog">
            </Head>
            <HomeLayout>
            <p>Blog</p>
            </HomeLayout>
        </>
    );
}
