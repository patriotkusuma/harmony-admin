<?php


namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Http\Resources\CategoryPaketResource;
use App\Http\Resources\PesananResource;
use App\Models\CategoryPaket;
use App\Models\Pesanan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Validator;


class CategoryController extends BaseController
{
    private $category;
    public function __construct()
    {
        $this->category = CategoryPaket::query();
    }

    public function index(Request $request)
    {
        $searchData = $request->query('searchData');

        $category = $this->category->whereHas('paketCuci', function($query) use ($searchData){
            $query->where('nama','like', '%'. $searchData . '%');
        })->with(['paketCuci' => function($query) use($searchData) {
            $query->where('nama', 'like', '%' . $searchData . '%');
        }])->orderBy('id')->get();

        $category = CategoryPaketResource::collection($category);


        return response()->json([
            'data' => $category,
            'message' => 'Semua Data Category Paket',
            'success'   => true
        ],200);

        // $category = $this->category
    }
}
