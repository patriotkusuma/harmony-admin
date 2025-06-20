<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter  = $request->only(['search', 'account_type', 'per_page', 'page']);

        $perPage = $request->input('per_page', 10); // default 10 jika tidak ada

        $accounts = Account::filter($filter)
            ->orderBy('account_name')
            ->paginate($perPage)
            ->withQueryString();
        // $accounts = Account::orderBy('account_name')->paginate(10)->withQueryString();
        $balanceByTypes = DB::table('accounts')
            ->select('account_type', DB::raw('SUM(current_balance) as total_balance'))
            ->groupBy('account_type')
            ->pluck('total_balance', 'account_type');

        return Inertia::render('Harmony/Account/Index', [
            'accounts' => $accounts,
            'filters' => $filter,
            'balanceByTypes' => $balanceByTypes,
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

        return redirect()->route('account.index')->with('success', 'Akun berhasil ditambahkan.');
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
        // $account->update($request->validated());
        $account->update([
            'account_name' => $request->account_name,
            'account_type' => $request->account_type,
            'initial_balance' => $request->initial_balance,
            'current_balance' => $request->current_balance,
            'description' => $request->description,
        ]);

        return redirect()->route('account.index')->with('success', 'Akun berhasil diperbarui.');
        //  session()->flash('flash', [
        //     'type' => 'success',
        //     'message' => 'Data akun berhasil diperbarui!',
        // ]);
        // return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        $account->delete();
        return redirect()->route('account.index')->with('success', 'Akun berhasil dihapus.');
    }
}
