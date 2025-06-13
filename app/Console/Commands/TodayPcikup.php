<?php

namespace App\Console\Commands;

use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Http;

class TodayPcikup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pickup-today';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Carbon::setLocale('id');
        $pesanan = Pesanan::with('customer', 'detailPesanan','detailPesanan.jenisCuci');
        $pesanan = $pesanan->whereDate('tanggal_selesai','<=', Carbon::today());
        $pesanan = $pesanan->where('status', '!=','diambil');
        $pesanan = $pesanan->get();


        $message = "Diambil atau Kirim hari ini \n*". Carbon::today()->isoFormat('dddd, D MMMM Y') ."*\n\n";
        $message .= "*Diambil*\n";
        foreach ($pesanan as $key => $value) {
            // $message .= ($key+1). " " . $value->customer->nama . " " . Carbon::parse($value->tangga_selesai)->isoFormat('HH:mm, D MMMM Y') . "\n";
            if($value->antar == 0){
                $message .= ($key+1). " " . $value->customer->nama . " *" . ($value->status_pembayaran != "Lunas" ? "Rp " . number_format($value->total_harga,0,',','.') : "Lunas") . "*\n";
            }
        }
        $message .= "\n*Diantar*\n";
        foreach ($pesanan as $key => $value) {
            // $message .= ($key+1). " " . $value->customer->nama . " " . Carbon::parse($value->tangga_selesai)->isoFormat('HH:mm, D MMMM Y') . "\n";
            if($value->antar == 1){
                $message .= ($key+1). " " . $value->customer->nama . " *" . ($value->status_pembayaran != "Lunas" ? "Rp " . number_format($value->total_harga,0,',','.') : "Lunas") . "*\n";
            }
        }

        // $curl = curl_init();

        //     curl_setopt_array($curl, array(
        //     CURLOPT_URL => 'https://api.fonnte.com/send',
        //     CURLOPT_RETURNTRANSFER => true,
        //     CURLOPT_ENCODING => '',
        //     CURLOPT_MAXREDIRS => 10,
        //     CURLOPT_TIMEOUT => 0,
        //     CURLOPT_FOLLOWLOCATION => true,
        //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        //     CURLOPT_CUSTOMREQUEST => 'POST',
        //     CURLOPT_POSTFIELDS => array(
        //     'target' => '081223008363, 082324640646',
        //     'message' => $message,
        //     'countryCode' => '62', //optional
        //     ),
        //     CURLOPT_HTTPHEADER => array(
        //         'Authorization: 6hx1jMBFbqfmjW2fbq8!' //change TOKEN to your actual token
        //     ),
        // ));

        // $response = Http::post('https://app.saungwa.com/api/create-messate',[
        //     'form_params' => [

        //         'appkey' => 'c656bfb9-c13c-4f22-902c-c6b0f31e4f52',
        //         'authkey' => 'i7v9XcVo3el9VZ7FSFe5ljaZe3pR1G8gDaqyc8pZc78jsG4cza',
        //         'to' => '6281223008363',
        //         'message' => $message,
        //         'sandbox' => 'false'
        //         ]
        // ]);

        // dd($response);


        $numbers = array('6281223008363','6282324640646');
        foreach ($numbers as $key => $value) {
            $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://app.saungwa.com/api/create-message',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
            'appkey' => 'c656bfb9-c13c-4f22-902c-c6b0f31e4f52',
            'authkey' => 'i7v9XcVo3el9VZ7FSFe5ljaZe3pR1G8gDaqyc8pZc78jsG4cza',
            'to' => $value,
            'message' => $message,
            'sandbox' => 'false'
            ),
        ));

        // $response = curl_exec($curl);

        // curl_close($curl);
        // echo $response;

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
        $error_msg = curl_error($curl);
        }
        curl_close($curl);

        if (isset($error_msg)) {
        echo $error_msg;
        }
        echo $response;
            }
        }


}
