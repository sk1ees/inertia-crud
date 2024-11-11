<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;

class ApiController extends Controller
{
    //
    public function index()
    {
        $data = Task::all(); // Ensure Table is the correct model name
        // return Inertia::render('Kanban/Api', [
        //     'data' => $data,
        // ]);

        return response()->json($data);
    }

    public function showKanban()
    {
        $data = Task::all(); // Ensure Table is the correct model name
        return Inertia::render('Kanban/Kanban', [
            'data' => $data,
        ]);
    }

    public function store(Request $request)
    {
        Task::create([
            'title' => $request->title,
            'status' => $request->status
        ]);
        return response()->json([
            'message' => 'Task created successfully',
        ]);
    }

    public function storeKanban(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'required|string',
        ]);

        // Create the new task
        Task::create([
            'title' => $validated['title'],
            'status' => $validated['status'],
        ]);

        // Redirect back to the Kanban board, causing the board to reload with new data
        return redirect()->route('kanban');
    }
}
