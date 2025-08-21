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


class TeacherController extends Controller
{
    /**
     * Show the user's profile settin   gs page.
     */
    public function index(Request $request): Response
    {

              // 'per_page' sorgu parametresini al, eğer yoksa varsayılan olarak 10 kullan
        $perPage = FacadeRequest::input('per_page', 10);

        // 'per_page' değerinin geçerli bir sayı olduğundan emin ol
        // Örneğin, sadece belirli değerlere (10, 25, 50, 100) izin ver.
        $allowedPerPage = [5, 10, 25, 50, 100];
        if (!in_array((int)$perPage, $allowedPerPage)) {
            $perPage = 10; // Geçersizse varsayılana dön
        }


        return Inertia::render('teachers/index', [
            'filters' => FacadeRequest::all(['search', 'role', 'per_page']),
            'paginatedUsers' => new UserCollection(
                User::orderByName()
                    ->filter(FacadeRequest::only(['search', 'role']))
                    ->paginate($perPage)
                    ->appends(FacadeRequest::all()),
            )
        ]);
    }

    /**
     * Show the user's profile settings page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('teachers/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'first_name' => 'required|string|max:127',
            'last_name' => 'required|string|max:127',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'in:teacher']
        ]);

        $user = User::create([
            'name' => $request->name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request['role']);

        event(new Registered($user));

        // Auth::login($user);

        return redirect(route('teachers.index'))->with('success', 'User created.');
    }

    /**
     * Show the user's profile settings page.
     */
    public function edit(User $teacher): Response
    {
        return Inertia::render('teachers/edit', [
            'teacher' => $teacher->only(['id', 'name', 'email']),
            'roles' => $teacher->getRoleNames(),
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

        return redirect(route('teachers.index'))->with('success', 'User updated.');
    }

    /**
     * Show the user's profile settings page.
     */
    public function show(User $teacher): Response
    {
        return Inertia::render('teachers/show', [
            'teacher' => $teacher->only(['id', 'name', 'email', 'email_verified_at']),
            'roles' => $teacher->getRoleNames(),
        ]);
    }

    /**
     * Show the user's profile settings page.
     */
    public function destroy(Request $request, User $teacher): RedirectResponse
    {
        $teacher->delete();

        return redirect(route('teachers.index'))->with('success', 'User deleted.');
        ;
    }
}
