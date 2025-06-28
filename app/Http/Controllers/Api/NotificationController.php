<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use App\Traits\WaSender;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use function PHPUnit\Framework\isNull;

class NotificationController extends Controller
{
    use WaSender;
    protected $log;
    public function __construct(){
        $this->log = \Log::channel('kirim_notif');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function invoice(Request $request, Pesanan $pesanan)
    {
        $jsonMessage = '';
        $dataMessage = null;
        try{
            if(isset($pesanan)){
                if(!empty($pesanan->customer->telpon) && $pesanan->customer->telpon !== 0){
                    $arrayNama = explode(" ",strtolower($pesanan->customer->nama));
                    $panggilan = null;

                    if($arrayNama[0] == "bu" || $arrayNama[0] == "pak"){
                        $panggilan = "";
                    }else{$panggilan = "kak";}

                    $waktu=gmdate("H:i",time()+7*3600);
                    $t=explode(":",$waktu);
                    $jam=$t[0];
                    $menit=$t[1];

                    if ($jam >= 00 and $jam < 10 ){
                        if ($menit >00 and $menit<60){
                            $ucapan="Selamat Pagi";
                        }
                    }else if ($jam >= 10 and $jam < 15 ){
                        if ($menit >00 and $menit<60){
                            $ucapan="Selamat Siang";
                        }
                    }else if ($jam >= 15 and $jam < 18 ){
                        if ($menit >00 and $menit<60){
                            $ucapan="Selamat Sore";
                        }
                    }else if ($jam >= 18 and $jam <= 24 ){
                        if ($menit >00 and $menit<60){
                            $ucapan="Selamat Malam";
                        }
                    }else {
                        $ucapan="Error";

                    }

                    $waktuTutup = "21:30:00";
                    $waktuSelesai = Carbon::parse($pesanan->tanggal_selesai);
                    $estimasi = null;

                    if($waktuSelesai->toTimeString() > $waktuTutup){
                        $estimasi = $waktuSelesai->addDays(1)->hour(8)->minute(0);
                        // $estimasi = $estimasi->setLocale('id');
                        $estimasi = $estimasi->translatedFormat('H:i l, j F Y');
                    }else{
                        $estimasi = $waktuSelesai->locale('id')->translatedFormat('H:i l, j F Y');
                    }

                    // dd($estimasi);
                    $message = $ucapan. " ".$panggilan." *". $pesanan->customer->nama . "*,\n\n";
                    $message.= "Berikut kami informasikan E-Reciept pesanan anda\n\n";
                    $message.= "Nomor Pesanan : *" . $pesanan->kode_pesan . "*\n";
                    $message.= "Status Pembayaran : *" . $pesanan->status_pembayaran . "*\n";
                    $message.= "Total Bayar : " .  "Rp ". number_format($pesanan->total_harga,0,',','.') . "\n";
                    $message.= "Sudah Dibayar : Rp ". number_format($pesanan->paid,0, ",",'.') . "\n";
                    // $message.= "--------------------------------------------------\n";
                    $message.= "Sisa Tagihan : *Rp " . number_format(abs($pesanan->total_harga - $pesanan->paid), 0, ',', '.') . "*\n";
                    $message.= "--------------------------------------------------\n";
                    $message.= "Estimasi Selesai : *" . $estimasi . "*\n";
                    $message.= "--------------------------------------------------\n\n";



                    $message .= "Info lebih detail bisa ikuti tautan berikut\n";
                    $message .= "https://harmonylaundrys.com/". $pesanan->kode_pesan . "\n\n";
                    $message .= "Terima kasih 🙏\n";
                    $message .= "\n\n";
                    $message .= "*Harmony Laundry*";

                    $this->log->info(Carbon::now()->toDateTimeLocalString() . " - Mencoba kirim Invoice");
                    $notif = $this->notify($message, $pesanan->customer->telpon);

                    $notif = json_decode($notif);
                    $this->log-info(Carbon::now()->toDateTimeLocalString() . " - Reponse Invoice", $notif);
                    // dd($notif);

                    // if(isset($notif->message_status) )
                    if($notif->error == false)
                    {
                        // $jsonMessage = "Invoice Berhasil Dikirim ";
                        $jsonMessage = array([
                            "keterangan" => "Invoice Berhasil Dikirim",
                            "respon" => $notif
                        ]);
                        $pesanan->update([
                            'notify_pesan' => 1,
                            'notify_pesan_error' => 0,
                        ]);
                    }else{
                        // $jsonMessage = "Invoice Gagal Dikirim";
                        $jsonMessage = array([
                            "keterangan" => "Invoice Gagal Dikirim",
                            "respon" => $notif
                        ]);
                        $pesanan->update([
                            'notify_pesan' => 0,
                            'notify_pesan_error' => 1
                        ]);
                    }

                    $dataMessage = json_encode($notif);
                    $cekPesan = $pesanan->customer->pesananPayable()->where('kode_pesan', '!=', $pesanan->kode_pesan)->get();
                    // dd(!empty($cekPesan) && count($cekPesan) > 0);
                    $kodePesan = $pesanan->kode_pesan;
                    $waktuPesanSekarang = Carbon::parse($pesanan->tanggal_pesan)->locale('id')->translatedFormat('H:i l, j F Y');
                    $tagihanSekarang = number_format($pesanan->total_harga, '0', ',','.');
                    // dd(count($pesanan->customer->pesananPayable($pesanan->kode_pesan)->get()));
                    if(!empty($pesanan->customer->pesananPayable($kodePesan)->get()) && count($pesanan->customer->pesananPayable($kodePesan)->get()) > 0){
                        $messageTagihan = "";
                        $messageTagihan .="Berikut kami informasikan juga untuk tagihan sebelumnya\n\n";
                        $messageTagihan .= "Tagihan Sebelumnya :\n\n";
                        foreach ($pesanan->customer->pesananPayable as $key => $payable) {
                            $number = $key+1;

                            if($payable->kode_pesan === $pesanan->kode_pesan){
                                continue;
                            }
                            $waktu = Carbon::parse($payable->tangal_pesan);
                            $tanggalpesan = $waktu->locale('id')->translatedFormat('H:i l, j F Y');
                            $tagihan = number_format(($payable->total_harga - $payable->paid),0, ',','.');
                            $messageTagihan .="{$number}. {$payable->kode_pesan} pada tanggal . {$tanggalpesan}. sebesar *Rp {$tagihan}*\n";
                        }
                        $messageTagihan.= "--------------------------------------------------\n\n";
                        $messageTagihan .= "Ditambah dengan tagihan sekarang\n";
                        $messageTagihan .= "1. {$kodePesan} pada tanggal . {$waktuPesanSekarang} . sebesar *Rp {$tagihanSekarang}*\n";
                        $totalTagihan = $pesanan->customer->pesananPayable->sum('total_harga');
                        $totalDibayar = $pesanan->customer->pesananPayable->sum('paid');
                        $sisaTagihan = number_format(($totalTagihan - $totalDibayar),0,',','.');
                        $messageTagihan.= "--------------------------------------------------\n\n";
                        $messageTagihan .= "*Total Tagihan* = *Rp {$sisaTagihan}*\n\n";
                        $messageTagihan .= "Terima kasih 🙏\n";
                        $messageTagihan .= "\n\n";
                        $messageTagihan .= "*Harmony Laundry*";

                        $kirimTagihan = $this->notify($messageTagihan, $pesanan->customer->telpon);
                    }


                }else{
                    $jsonMessage = "Nomor kosong atau 0";
                    $pesanan->update([
                        'notify_pesan' => 1
                    ]);
                }
            }else{
                $jsonMessage = 'Pesanan Tidak Ditemukan';
            }

            return response()->json([
                'response' => !isNull($dataMessage) ? $dataMessage : '',
                'message' => $jsonMessage,
                'status' => 200,
            ],200);
        }catch(\Exception $ex){
            return json_encode($ex);
        }

    }

    public function notif(Request $request, Pesanan $pesanan)
    {
        $jsonMessage = '';
        $dataMessage = null;
        try{
            if(isset($pesanan)){
                if(!empty($pesanan->customer->telpon) && $pesanan->customer->telpon !== 0){
                    $arrayNama = explode(" ",strtolower($pesanan->customer->nama));
                    $panggilan = null;

                    if($arrayNama[0] == "bu" || $arrayNama[0] == "pak"){
                        $panggilan = "";
                    }else{$panggilan = "kak";}

                    $waktu=gmdate("H:i",time()+7*3600);
                    $t=explode(":",$waktu);
                    $jam=$t[0];
                    $menit=$t[1];

                    if ($jam >= 00 and $jam < 10 ){
                        if ($menit >00 and $menit<60){
                            $ucapan="Selamat Pagi";
                        }
                    }else if ($jam >= 10 and $jam < 15 ){
                        if ($menit >00 and $menit<60){
                            $ucapan="Selamat Siang";
                        }
                    }else if ($jam >= 15 and $jam < 18 ){
                        if ($menit >00 and $menit<60){
                            $ucapan="Selamat Sore";
                        }
                    }else if ($jam >= 18 and $jam <= 24 ){
                        if ($menit >00 and $menit<60){
                            $ucapan="Selamat Malam";
                        }
                    }else {
                        $ucapan="Error";

                    }

                    $message = $ucapan. " ".$panggilan." *". $pesanan->customer->nama . "* 😊,\n\n";
                    if($pesanan->antar == 1){

                        $message.= "Laundry dengan kode pesan *".$pesanan->kode_pesan."* sudah selesai, apakah bisa kami antar sekarang ?\n\n\n";
                    }else {
                        $message .= "Laundry dengan kode pesan *".$pesanan->kode_pesan."* sudah selesai dan sudah bisa diambil. \n\n\n";
                    }

                    // $message .= "*Pengumuman ℹ️*\n";
                    //     $message .= "_Mulai tanggal *30 Maret - 6 April 2025* laundry akan *libur*, buka kembali tanggal *7 April 2025*_\n";
                    $message .= "Terima kasih sudah menggunakan layanan laundry kami.🙏\n";
                    $message .= "\n\n";
                    $message .= "*Harmony Laundry*";

                    $this->log->info(Carbon::now()->toDateTimeLocalString() . " - Mencoba kirim notifikasi ke pelanggan");
                    $notif = $this->notify($message, $pesanan->customer->telpon);
            
                    
                    $notif = json_decode($notif);
                    $this->log->info(Carbon::now()->toDateTimeLocalString() . " - Respon Notifikasi : ");

                    // if(isset($notif->message_status) )
                    if($notif->error == false)
                    {
                        $pesanan->update([
                            'notify_selesai' => 1,
                            'notify_selesai_error' => 0
                        ]);
                        $jsonMessage = array([
                            "keterangan" => "Notif Berhasil Dikirim",
                            "respon" => $notif
                        ]);
                    }else{
                        $pesanan->update([
                            'notify_selesai' => 0,
                            'notify_selesai_error' =>1
                        ]);
                        $jsonMessage = array([
                            "keterangan" => "Notif Gagal dikirim",
                            "respon" => $notif
                        ]);
                    }

                    $dataMessage = $notif;


                }else{
                    $pesanan->update([
                        'notify_selesai' => 1
                    ]);
                    $jsonMessage = "Nomor kosong atau 0";
                }
            }else{
                $jsonMessage = 'Pesanan Tidak Ditemukan';
            }

            return response()->json([
                'response' => !isNull($dataMessage) ? $dataMessage : '',
                'message' => $jsonMessage,
                'status' => 200,
            ],200);
        }catch(\Exception $ex){
            return json_encode($ex);
        }
    }
}
