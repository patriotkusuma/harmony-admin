<?php

namespace App\Http\Middleware;

use App\Models\Outlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

use function PHPUnit\Framework\isNull;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $user = $request->user();
        $cacheName = "";
        $cacheName = !empty($user) ? $user->id . "-" . "activeOutlet" : '';
        $cacheCheck = Cache::get($cacheName);
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => fn () => [
                'success'  => $request->session()->get('success'),
            ],
            'cabangs' => fn() => [
                'data' => Outlet::latest()->get(),
                'active' => !empty($cacheCheck) ? $cacheCheck : ''
            ]
        ];
    }
}
