<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('users/index', [
            'users' => User::all(),
        ]);
    }

        /**
     * Show the user's profile settings page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('users/create');
    }

            /**
     * Show the user's profile settings page.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('users/edit', [
            'user' => $user,
        ]);
    }

                /**
     * Show the user's profile settings page.
     */
    public function show(User $user): Response
    {
        return Inertia::render('users/show', [
            'user' => $user,
        ]);
    }

                    /**
     * Show the user's profile settings page.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        $user->delete();

        return redirect(route('users.index'));
    }
}
