<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class CustomerController extends Controller
{
    private $customer;

    public function __construct()
    {
        // $this->customer = Customer::with('pesananPayable.detailPesanan.jenisCuci.categoryPaket' ,  'pesananPayable.detailPakaian', 'pesananTakeable.detailPesanan.jenisCuci.categoryPaket', 'pesananTakeable.detailPakaian');
        $this->customer = Customer::with('pesananPayable.detailPesanan.jenisCuci.categoryPaket' ,  'pesananPayable.detailPakaian', 'pesananTakeable.detailPesanan.jenisCuci.categoryPaket', 'pesananTakeable.detailPakaian');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $customers = $this->customer->when(
            $request->nama,
            fn($query) => $query->where('nama','like',$request->nama.'%')
        );
        $customer = $this->customer->when(
            $request->telpon,
            fn($query) => $query->orWhere('telpon', 'like', '%'. $request->telpon . '%')
        );
        $customers = $this->customer->where('telpon', '!=', "");
        $customers = $this->customer->where('telpon', '!=', '081223008363');
        $customers = $this->customer->take(10)->get();
        $customers = $customers->sortByDesc('keterangan');



        return response()->json([
            'data'=> CustomerResource::collection($customers),
            'message' => 'Fetch All Customer',
            'status' => 200
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
        $customer = $this->customer->find($id);
        return response()->json([
            'data' => new CustomerResource($customer),
            'message' => 'Customer',
            'status' => 200
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, String $id)
    {
        $customer = $this->customer->find($id);
        $nama = $request->nama;
        $telpon = $request->telpon;
        $keterangan = $request->keterangan;


        $customer->update([
            'nama' => $nama,
            'telpon' => $telpon,
            'keterangan' => $keterangan
        ]);

        return response()->json([
            'message' => 'Data berhasil diubah',
            'status' => 200
        ],200);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function customerPayable(Request $request)
    {
        $idOutlet = $this->checkActiveOutlet();


        $search = $request->query('search');

        // $customer = $this->customer->withSum(['pesanan' => fn($query) => $query->where('status_pembayaran', 'Belum Lunas')], 'total_harga');

        $customer = $this->customer;
        $customer = $customer->when(
            $search,
            fn($query) =>
            $query->where('nama', 'like', "%".$search."%")
        );

        // if($search == null){

        // $customer = $customer
        // ->orWhereRelation('pesanan', 'status', '!=','diambil')
        // ->whereRelation('pesanan','status', '!=', 'batal')
        // ->orWhereRelation('pesanan', 'status_pembayaran', '!=', 'Lunas');
        // }

        $customer = $customer->whereHas('pesanan', function ($query) use ($idOutlet){
            $query->where('id_outlet', $idOutlet)
            // ->where('status', '!=', 'diambil')
            ->where('status', '!=', 'batal')
            ->where('status_pembayaran', '!=','Lunas');
        });
        // $customer = $customer->whereRelation('pesanan','id_outlet','=', $idOutlet);
        $customer = $customer->get();
        // dd($customer);

        // dd($idOutlet);


        return response()->json([
            'customer' => CustomerResource::collection($customer),
            'status' => 200
        ],200);
    }

    public function print(Customer $customer, Request $request)
    {

        $data  = json_decode($request->data);
        // response()->json($data,200);
        $connector = new WindowsPrintConnector('pos-58c');
        $printer = new Printer($connector);


        $printer -> initialize();
        $printer -> setJustification(Printer::JUSTIFY_CENTER);
        if($data->status_pembayaran != "Lunas"){
            $printer->setTextSize(2,2);
            $printer->text("Rp " .number_format(($data->total_harga * 1000),'0',',','.'));
            $printer->feed(2);
        }else{
            $printer->setTextSize(2,2);
            $printer->text("Lunas");
            $printer->feed(2);
        }
        $printer -> setTextSize(3, 5);

        // $printer->qrCode($kode_pesan, Printer::QR_ECLEVEL_L, 7);
        // $printer->feed(1);
        $printer -> text($data->customer->nama . "\n");
        $printer -> feed(10);
        // $printer -> cut();
        $printer -> close();
    }

    public function checkActiveOutlet()
    {
        $idOutlet = '';
        $cacheName = auth()->user()->id . "-" . "activeOutlet";
        if(Cache::has($cacheName))
        {
            $cacheOutlet = Cache::get($cacheName);
            $idOutlet = $cacheOutlet['id_outlet'];

        }else{
            $idOutlet = auth()->user()->pegawai->onOutlet->id_outlet ? auth()->user()->pegawai->onOutlet->id_outlet : '';
        }

        return $idOutlet;
    }

}
