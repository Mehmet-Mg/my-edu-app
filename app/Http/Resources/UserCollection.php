<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return $this->collection->map(fn ($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email'=> $user->email,
            'email_verified_at' => $user->email_verified_at,
            'roles' => $user->getRoleNames(),
        ]);
    }
}