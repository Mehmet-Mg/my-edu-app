import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';

import { Head, Link } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeftIcon, Edit, Trash2 } from 'lucide-react';

export default function UserShow({ user }: { user: User }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: user.name + ' Edit',
            href: '/users',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-y-6">
                    <HeadingSmall title={user.name + ' Edit'} description="Ensure your account is using a long, random password to stay secure" />

                    {/* <Form
                        method="put"
                        action={route('password.update')}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={['password', 'password_confirmation', 'current_password']}
                        resetOnSuccess
                        onError={(errors) => {
                            // if (errors.password) {
                            //     passwordInput.current?.focus();
                            // }

                            // if (errors.current_password) {
                            //     currentPasswordInput.current?.focus();
                            // }
                        }}
                        className="space-y-6"
                    >
                        {({ errors, processing, recentlySuccessful }) => (
                         */}
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                // ref={currentPasswordInput}
                                name="name"
                                type="text"
                                className="mt-1 block w-full"
                                autoComplete="name"
                                placeholder="Name"
                                disabled
                                defaultValue={user.name}
                            />

                            {/* <InputError message={errors.name} /> */}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                // ref={passwordInput}
                                name="email"
                                type="email"
                                className="mt-1 block w-full"
                                autoComplete="email"
                                placeholder="Email"
                                disabled
                                defaultValue={user.email}
                            />

                            {/* <InputError message={errors.email} /> */}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email_verified_at">Email verified at</Label>

                            <Input
                                id="email_verified_at"
                                name="email_verified_at"
                                type="text"
                                className="mt-1 block w-full"
                                autoComplete="email_verified_at"
                                placeholder="Email Verified At"
                                disabled
                                defaultValue={user.email_verified_at ?? ''}
                            />

                            {/* <InputError message={errors.email_verified_at} /> */}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <Button asChild>
                                <Link href={route('users.index')}>
                                    <ArrowLeftIcon />
                                    Back
                                </Link>
                            </Button>
                            <div className="flex items-center gap-4">
                                <Button asChild></Button>

                                <Button asChild>
                                    <Link href={route('users.edit', user.id)}>
                                        <Edit />
                                        Edit
                                    </Link>
                                </Button>
                                <Button variant="destructive">
                                    <Trash2 />
                                    Delete
                                </Button>
                            </div>

                            {/* <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">Saved</p>
                                    </Transition> */}
                        </div>
                    </>
                </div>
            </div>
        </AppLayout>
    );
}
