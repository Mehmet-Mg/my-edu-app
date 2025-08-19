<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\ProfileUpdateRequest;
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
            'filters' => FacadeRequest::all(['search', 'role']),
            'paginatedUsers' => new UserCollection(
                User::orderByName()
                    ->filter(FacadeRequest::only(['search', 'role']))
                    ->paginate(2)
                    ->appends(FacadeRequest::all()),
            )
        ]);
    }

    /**
     * Show the user's profile settings page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('users/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'in:student,teacher']
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request['role']);

        event(new Registered($user));

        // Auth::login($user);

        return redirect(route('users.index'))->with('success', 'User created.');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('users/edit', [
            'user' => $user->only(['id', 'name', 'email']),
            'roles' => $user->getRoleNames(),
        ]);
    }

    /**
     * Show the user's profile settings page.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class),//->ignore($request->get('id')),
            ],
        ]);

        $user = User::findOrFail($request->get('id'));

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

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
