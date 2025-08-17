import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';

import { Form, Head, Link } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { ArrowLeftIcon, Save } from 'lucide-react';
import { useRef } from 'react';
import RoleSelect from '@/components/role-select';

export default function UserShow({ user, roles }: { user: User, roles: string[] }) {
    const nameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);

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

                    <Form
                        method="patch"
                        action={route('users.update', user.id)}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={['password', 'password_confirmation', 'current_password']}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.name) {
                                nameInput.current?.focus();
                            }
                            if (errors.email) {
                                emailInput.current?.focus();
                            }
                        }}
                        className="space-y-6"
                    >
                        {({ errors, processing, recentlySuccessful }) => (
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <Input id="id" name="id" type="hidden" defaultValue={user.id} />

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        ref={nameInput}
                                        name="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        placeholder="Name"
                                        defaultValue={user.name}
                                    />

                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>

                                    <Input
                                        id="email"
                                        ref={emailInput}
                                        name="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        placeholder="Email"
                                        defaultValue={user.email}
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="role">Role</Label>
                                    <RoleSelect name="role" tabIndex={1} defaultValue={roles.length > 0 ? roles[0] : ''} />
                                    <InputError message={errors.role} />
                                </div>

                                <div className="flex items-center justify-between gap-4 lg:col-span-2">
                                    <Button asChild type="button">
                                        <Link href={route('users.index')}>
                                            <ArrowLeftIcon />
                                            Back
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Save />
                                        Save
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">Saved</p>
                                    </Transition>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
