<?php

namespace App\Console\Commands;

use App\Models\Pesanan;
use App\Traits\WaSender;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

use function PHPSTORM_META\type;

class OrderCreated extends Command
{
    use WaSender;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order-created';

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
        try{
            $orders = Pesanan::where('notify_pesan', 0)
                ->where('status', '!=', 'diambil')
                ->whereDate('tanggal_pesan', Carbon::now())
                ->get();
            // dd($orders);



            if(!empty($orders)){
                foreach ($orders as $key => $value) {
                    $phone = !empty($value->customer->telpon)? $value->customer->telpon : '' ;
                if($phone != "" || $phone != 0){
                        $arrayNama = explode(" ",strtolower($value->customer->nama));
                        $panggilan = null;
                        if($arrayNama[0] == "bu" || $arrayNama[0] == "pak"){
                            $panggilan = "";
                        }else{$panggilan = "kak";}

                        $waktu=gmdate("H:i",time()+7*3600);
                        $t=explode(":",$waktu);
                        $jam=$t[0];
                        $menit=$t[1];

                        if ($jam >= 00 and $jam < 11 ){
                            if ($menit >00 and $menit<60){
                                $ucapan="Selamat Pagi";
                            }
                        }else if ($jam >= 11 and $jam < 15 ){
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

                        $waktuSelesai = Carbon::parse($value->tanggal_selesai);
                        $estimasi = null;

                        $waktuTutup = "21:30:00";

                        // if($waktuSelesai->toTimeString() > $waktuTutup){
                        //     $estimasi = $waktuSelesai->addDays(1)->hour(8)->minute(0);
                        //     $estimasi = $estimasi->translatedFormat('H:i l, j F Y');
                        // }else{
                        $estimasi = $waktuSelesai->locale('id')->translatedFormat('H:i l, j F Y');
                        // }




                        $message = $ucapan ." ".$panggilan." *". $value->customer->nama . "*,\n\n";
                        $message.= "Berikut kami informasikan detail pesanan anda\n\n";
                        $message.= "Nomor Pesanan : *" . $value->kode_pesan . "*\n";
                        $message.= "Status Pembayaran : *" . $value->status_pembayaran . "*\n";
                        $message.= "Total Bayar : *" .  "Rp ". number_format($value->total_harga,0,',','.') . "*\n";
                        $message.= "Estimasi Selesai : " . $estimasi . "\n";
                        $message.= "-------------------------\n\n";
                        $message .= "Info lebih detail bisa ikuti tautan berikut\n";
                        $message .= "https://harmonylaundrys.com/". $value->kode_pesan . "\n\n";
                        $message .= "Terima kasih 🙏\n";
                        $message .= "\n\n";
                        $message .= "*Harmony Laundry*";


                        $notif =  $this->notify($message, $phone);
                        $notif = json_decode($notif);

                        // dd($notif);
                        // if(isset($notif->message_status)){
                        // Log::useDailyFiles(storage_path('logs/order_try.log'));
                        // echo($notif);
                        if($notif->error === false)
                        {
                            $value->update([
                                'notify_pesan' => 1,
                                'notify_pesan_error' => 0,
                            ]);
                        }else{
                            $value->update([
                                'notify_pesan' => 0,
                                'notify_pesan_error' =>1
                            ]);
                        }

                    } else {
                        $value->update([
                            'notify_pesan' => 1
                        ]);
                    }


                    //$cekPesan = $value->customer->pesananPayable()->where('kode_pesan', '!=', $value->kode_pesan)->get();
                    $kodePesan = $value->kode_pesan;
                    $waktuPesanSekarang = Carbon::parse($value->tanggal_pesan)->locale('id')->translatedFormat('H:i l, j F Y');
                    $pesanPayable = $value->customer->pesananPayable($kodePesan)->get();
                    $tagihanSekarang = number_format($value->total_harga, '0', ',','.');
                    $totalPesananSekarang = $value->total_harga;
                    if(!empty($pesanPayable) && count($pesanPayable)){
                        $messageTagihan = "";
                        $messageTagihan .="Berikut kami informasikan juga untuk tagihan sebelumnya\n\n";
                        $messageTagihan .= "Tagihan Sebelumnya :\n\n";
                        foreach ($value->customer->pesananPayable as $key => $payable) {
                            $number = $key+1;

                            if($payable->kode_pesan === $value->kode_pesan){
                                continue;
                            }
                            $waktu = Carbon::parse($payable->tangal_pesan);
                            $tanggalpesan = $waktu->locale('id')->translatedFormat('H:i l, j F Y');
                            $tagihan = number_format(($payable->total_harga - $payable->paid),0, ',','.');
                            $messageTagihan .="{$number}. {$payable->kode_pesan} pada tanggal . {$tanggalpesan}. sebesar *Rp {$tagihan}*\n";
                        }

                        $messageTagihan .= "Ditambah dengan tagihan sekarang\n";
                        $messageTagihan .= "1. {$kodePesan} pada tanggal . {$waktuPesanSekarang} . sebesar *Rp {$tagihanSekarang}\n";
                        $totalTagihan = $value->customer->pesananPayable->sum('total_harga');
                        $totalDibayar = $value->customer->pesananPayable->sum('paid');
                        $sisaTagihan = number_format(($totalTagihan - $totalDibayar),0,',','.');
                        $messageTagihan.= "--------------------------------------------------\n\n";
                        $messageTagihan .= "*Total Tagihan* = *Rp {$sisaTagihan}*\n\n";
                        $messageTagihan .= "Terima kasih 🙏\n";
                        $messageTagihan .= "\n\n";
                        $messageTagihan .= "*Harmony Laundry*";

                        $kirimTagihan = $this->notify($messageTagihan, $value->customer->telpon);
                    }

                }

            }
        }catch(\Exception $ex){

        }
    }
}
