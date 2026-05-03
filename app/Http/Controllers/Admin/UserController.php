<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index(Request $request)
    {
        $users = User::query()
            ->when($request->role, fn($q) => $q->where('role', $request->role))
            ->when($request->search, fn($q) => $q->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
            }))
            ->withCount(['registrations', 'submissions'])
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users'   => $users,
            'filters' => $request->only(['role', 'search']),
        ]);
    }

    /**
     * Show user create form
     */
    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Store new user (Admin tambah Juri/Peserta)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email|max:255',
            'phone'    => 'nullable|string|max:20',
            'role'     => ['required', Rule::in(['jury', 'user'])], // HANYA jury/user
            'password' => 'required|min:8|confirmed',
        ]);

        User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'phone'    => $validated['phone'],
            'role'     => $validated['role'],
            'password' => Hash::make($validated['password']),
            'email_verified_at' => now(), // Auto verified
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Juri/Peserta berhasil ditambahkan!');
    }

    /**
     * Show user detail
     */
    public function show(User $user)
    {
        $user->load([
            'registrations.event',
            'registrations.category',
            'submissions.registration.event',
        ]);

        return Inertia::render('Admin/Users/Show', ['user' => $user]);
    }

    /**
     * Show user edit form
     */
    public function edit(User $user)
    {
        if ($user->role === 'admin' && $user->id !== Auth::id()) {
            return back()->with('error', 'Hanya bisa edit admin sendiri.');
        }

        return Inertia::render('Admin/Users/Edit', ['user' => $user]);
    }

    /**
     * Update user data
     */
    public function update(Request $request, User $user)
    {
        if ($user->role === 'admin' && $user->id !== Auth::id()) {
            return back()->with('error', 'Hanya bisa edit admin sendiri.');
        }

        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone'    => 'nullable|string|max:20',
            'role'     => ['sometimes', Rule::in(['admin', 'jury', 'user'])],
            'password' => 'nullable|min:8|confirmed',
        ]);

        $updateData = [
            'name'  => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ];

        if ($validated['role'] ?? false) {
            $updateData['role'] = $validated['role'];
        }

        if ($validated['password'] ?? false) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return redirect()->route('admin.users.index')
            ->with('success', 'Data pengguna berhasil diperbarui!');
    }

    /**
     * Update user role only
     */
    public function updateRole(Request $request, User $user)
    {
        if ($user->id === Auth::id()) {
            return back()->with('error', 'Anda tidak dapat mengubah role diri sendiri.');
        }

        $request->validate([
            'role' => ['required', Rule::in(['admin', 'jury', 'user'])],
        ]);

        $user->update(['role' => $request->role]);

        return back()->with('success', "Role {$user->name} berhasil diubah menjadi {$request->role}.");
    }

    /**
     * Delete user
     */
    public function destroy(User $user)
    {
        if ($user->id === Auth::id()) {
            return back()->with('error', 'Tidak dapat menghapus akun sendiri.');
        }

        if ($user->role === 'admin') {
            return back()->with('error', 'Tidak dapat menghapus admin lain.');
        }

        $user->delete();

        return back()->with('success', 'Pengguna berhasil dihapus.');
    }
}