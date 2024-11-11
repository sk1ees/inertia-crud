<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Route::get('/api', function () {
//     $data = [
//         'name' => 'John Doe',
//         'age' => 30,
//         'email' => 'john.doe@example.com',
//     ];
//     return Inertia::render('Kanban/Api', [
//         'data' => $data,
//     ]);
// })->name('api');


Route::get('/api', [ApiController::class, 'index'])->name('api');
Route::post('/api', [ApiController::class, 'store'])->name('store');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

// Route::get('/tasks/create', function () {
//     return Inertia::render('TaskForm');
// })->name('tasks.create');

Route::get('/kanban', [ApiController::class, 'showKanban'])->name('kanban');
Route::post('/kanban', [ApiController::class, 'storeKanban'])->name('kanban.store');