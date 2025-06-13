<?php

namespace App\Console\Commands;

use App\Models\Pesanan;
use App\Traits\WaSender;
use Carbon\Carbon;
use Illuminate\Console\Command;

use function PHPSTORM_META\type;

class OrderCreatedBackup extends Command
{
    use WaSender;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order-created-backup';

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
                ->whereDate('tanggal_pesan', Carbon::now())
                ->where('status', '!=', 'diambil')
                ->get();


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

                        $message = $ucapan ." ".$panggilan." *". $value->customer->nama . "*,\n\n";
                        $message.= "Berikut kami informasikan detail pesanan anda\n\n";
                        $message.= "Nomor Pesanan : *" . $value->kode_pesan . "*\n";
                        $message.= "Status Pembayaran : *" . $value->status_pembayaran . "*\n";
                        $message.= "Total Bayar : *" .  "Rp ". number_format($value->total_harga,0,',','.') . "*\n";
                        $message.= "Estimasi Selesai : " . Carbon::parse($value->tanggal_selesai)->format("H:i, d F Y") . "\n";
                        $message.= "-------------------------\n\n";
                        $message .= "Info lebih detail bisa ikuti tautan berikut\n";
                        $message .= "https://harmonylaundrys.com/". $value->kode_pesan . "\n\n";
                        $message .= "Terima kasih 🙏\n";
                        $message .= "\n\n";
                        $message .= "*Harmony Laundry*";


                        $notif =  $this->notify($message, $phone);
                        $notif = json_decode($notif);

                        if(isset($notif->message_status)){
                            $value->update([
                                'notify_pesan' => 1,
                                'notify_pesan_error' => 0
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



                }

            }
        }catch(\Exception $ex){

        }
    }
}
