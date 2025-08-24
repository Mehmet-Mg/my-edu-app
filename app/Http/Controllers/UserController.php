<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Request as FacadeRequest;


class UserController extends Controller
{
    /**
     * Show the user's profile settin   gs page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('users/index', [
            'users' => new UserCollection(User::with('roles')->get()),
        ]);
    }

    /**
     * Show the user's profile settings page.
     */
    public function create(Request $request): Response
    {
        $roles = \Spatie\Permission\Models\Role::all()->pluck('name');
        return Inertia::render('users/create', [
            'roles' => $roles,
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $request->validated();

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'password' => Hash::make($request->password),
        ]);

        if ($request->has('terms_accepted')) {
            $user->terms_accepted_at = now();
            $user->save();
        }

        if ($request->has('role')) {
            $user->syncRoles($request->role);
        }

        event(new Registered($user));

        return redirect(route('users.index'))->with('success', 'User created.');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('users/edit', [
            'user' => $user->only(['id', 'first_name', 'last_name', 'full_name', 'email']),
            'roles' => $user->getRoleNames(),
        ]);
    }

    /**
     * Show the user's profile settings page.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $user->update($request->validated());

        if ($request->has('terms_accepted') && ! $user->terms_accepted_at) {
            $user->terms_accepted_at = now();
            $user->save();
        }

        if ($request->has('role')) {
            $user->syncRoles($request->role);
        }

        return redirect(route('users.index'))->with('success', 'User updated.');
    }

    /**
     * Show the user's profile settings page.
     */
    public function show(User $user): Response
    {
        return Inertia::render('users/show', [
            'user' => $user->only(['id', 'name', 'email', 'email_verified_at']),
            'roles' => $user->getRoleNames(),
        ]);
    }

    /**
     * Show the user's profile settings page.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        $user->delete();

        return redirect(route('users.index'))->with('success', 'User deleted.');
        ;
    }
}
