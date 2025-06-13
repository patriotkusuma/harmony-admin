<?php

namespace App\Console\Commands;

use App\Models\Pesanan;
use App\Traits\WaSender;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class OrderNotifBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */

    use WaSender;
    protected $signature = 'order-notif-backup';

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

            $orders = Pesanan::
                where('status','selesai')
                ->whereDate('tanggal_selesai', '<=',Carbon::now())
                ->whereTime('tanggal_selesai', '<=',Carbon::now()->addHour(1))
                // ->orWhere(function($query) {
                //     $query->whereTime('tanggal_selesai', '<=', Carbon::now())
                //     ->whereDate('tanggal_selesai', '<=', Carbon::now());
                // })

                // ->orWhere('tanggal_selesai','<', Carbon::now()->toDateTimeString())
                ->where('notify_selesai', 0)
                ->get();

            // dd($orders);
            if(!empty($orders)){
                foreach($orders as $key => $value)
                {
                    if($value->status == "diambil")
                    {
                        $value->update([
                            'notify_selesai' => 1,
                            'notify_pesan' => 1
                        ]);

                    }
                    else if($value->notify_selesai != 1){

                    $phone = $value->customer->telpon;
                    if($phone != ""){
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

                        $message = $ucapan ." ".$panggilan." *". $value->customer->nama . "* 😊,\n\n";
                        if($value->antar == 1){

                            $message.= "Laundrymu sudah selesai, apakah bisa kami antar sekarang ?\n";
                        }else {
                            $message .= "Laundrymu sudah selesai dan sudah bisa diambil. \n";
                        }

                        $message .= "Terima kasih sudah menggunakan layanan laundry kami.🙏\n";
                        $message .= "\n\n";
                        $message .= "*Harmony Laundry*";

                        $notif = $this->notify($message, $phone);
                        $notif = json_decode($notif);

                        if(isset($notif->message_status)){
                            $value->update([
                                'notify_selesai' => 1,
                                'notify_selesai_error' => 0
                            ]);
                        }else{
                            $value->update([
                                'notify_selesai' => 0,
                                'notify_selesai_error' =>1
                            ]);
                        }
                    }




                        // return ;
                    }else{
                        $value->update([
                            'notify_selesai' => 1
                        ]);
                    }

                }
            }

        }catch(\Exception $ex){
            Log::info('Order Notif Log');
            Log::info($ex);
        }
    }

}
