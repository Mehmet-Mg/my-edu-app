<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teacher_profile', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('full_name');
            $table->string('title')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed'])->nullable();
            $table->text('subjects')->nullable(); // JSON array of subjects
            $table->integer('experience_years')->nullable();
            $table->text('lesson_types')->nullable(); // JSON array of lesson types (online, evde, vb.)
            $table->string('location')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->text('bio')->nullable(); // JSON array of subjects
            $table->timestamps();
        });

        //         protected $fillable = [
        //     'full_name',
        //     'title',
        //     'gender',
        //     'birth_date',
        //     'marital_status',
        //     'subjects',
        //     'experience_years',
        //     'lesson_types', // online, evde, vb.
        //     'location',
        //     'is_verified',
        //     'bio',
        // ];
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teacher_profile');
    }
};
