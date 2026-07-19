<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MachineController extends Controller
{
    public function index()
    {
        $machines = Machine::orderBy('created_at', 'desc')->paginate(10);
        return inertia('Admin/Machines/Index', [
            'machines' => $machines
        ]);
    }

    public function create()
    {
        return inertia('Admin/Machines/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'work_area' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'required|boolean',
        ]);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('machines', 'public');
            $data['image_path'] = '/storage/' . $path;
        }
        Machine::create($data);
        return redirect()->route('admin.machines.index')->with('success', 'Mesin berhasil ditambahkan.');
    }

    public function show(Machine $machine)
    {
        return inertia('Admin/Machines/Show', [
            'machine' => $machine
        ]);
    }

    public function edit(Machine $machine)
    {
        return inertia('Admin/Machines/Edit', [
            'machine' => $machine
        ]);
    }

    public function update(Request $request, Machine $machine)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'work_area' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'required|boolean',
        ]);
        if ($request->hasFile('image')) {
            if ($machine->image_path) {
                $oldImagePath = str_replace('/storage/', '', $machine->image_path);
                Storage::disk('public')->delete($oldImagePath);
            }
            $path = $request->file('image')->store('machines', 'public');
            $data['image_path'] = '/storage/' . $path;
        }
        $machine->update($data);
        return redirect()->route('admin.machines.index')->with('success', 'Mesin berhasil diperbarui.');
    }

    public function destroy(Machine $machine)
    {
        if ($machine->image_path) {
            $oldImagePath = str_replace('/storage/', '', $machine->image_path);
            Storage::disk('public')->delete($oldImagePath);
        }
        $machine->delete();
        return redirect()->route('admin.machines.index')->with('success', 'Mesin berhasil dihapus.');
    }
}
