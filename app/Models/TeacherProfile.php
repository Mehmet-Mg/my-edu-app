<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'title',
        'gender',
        'birth_date',
        'marital_status',
        'subjects',
        'experience_years',
        'lesson_types', // online, evde, vb.
        'location',
        'is_verified',
        // 'review_count',
        // 'blog_count',
        // 'member_since',
        // 'last_activity',
        // 'is_online',
        'bio',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
