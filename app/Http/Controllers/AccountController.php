<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accounts = Account::orderBy('account_name')->paginate(10)->withQueryString();

        return Inertia::render('Harmony/Account/Index', [
            'accounts' => $accounts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Harmony/Account/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountRequest $request)
    {
        $validatedData = $request->validated();

        // Set current_balance sama dengan initial_balance saat pembuatan jika initial_balance ada
        // Jika tidak, keduanya akan mengambil default dari database (0.00)
        if (isset($validatedData['initial_balance'])) {
            $validatedData['current_balance'] = $validatedData['initial_balance'];
        } else {
            // Memastikan field ada untuk $fillable jika tidak nullable di DB dan tidak ada default eksplisit di model
            $validatedData['initial_balance'] = $validatedData['initial_balance'] ?? 0.00;
            $validatedData['current_balance'] = $validatedData['current_balance'] ?? $validatedData['initial_balance'];
        }

        Account::create($validatedData);

        return redirect()->route('accounts.index')->with('success', 'Akun berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        return Inertia::render('Harmony/Account/Show', [
            'account' => $account,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account)
    {
        return Inertia::render('Harmony/Account/Edit', [
            'account' => $account,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, Account $account)
    {
        $account->update($request->validated());
        return redirect()->route('accounts.index')->with('success', 'Akun berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        $account->delete();
        return redirect()->route('accounts.index')->with('success', 'Akun berhasil dihapus.');
    }
}
