<?php

namespace App\Console;

use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $hours=["08:00","12:05"];
        foreach($hours as$hour){
            $schedule->command('pickup-today')->dailyAt($hour)->appendOutputTo(storage_path('logs/pickup_today.log'));
        }

        // $orderNotifHours = ["11:45", "16:45"];
        // foreach($orderNotifHours as $hour){

        // }

        $now = Carbon::now()->format("H:i:s");
        if($now > "08:00:00" && $now <= "21:00:00" )
        {
            $today = Carbon::now();
            if($today->dayOfWeek == Carbon::FRIDAY && $now > "11:00:00" && $now <= "13:30:00"){
                echo "Waktu Jumatan Notif selesai tidak aktif \n";
            }else{
                $schedule->command('order-notif')->everyFiveMinutes()->appendOutputTo(storage_path('logs/order_notif.log'))
                ->onSuccess(function(){
                    echo "Kirim Notifikasi Berhasil \n";
                });
                echo "Kirim Notifikasi";
            }
            // $schedule->command('order-notif')->everyFiveMinutes()->appendOutputTo(storage_path('logs/order_notif.log'))
            //     ->onSuccess(function(){
            //         echo "Kirim Notifikasi Berhasil \n";
            //     });
                // echo "Kirim Notifikasi";
            $schedule->command('order-created')->everyMinute()->appendOutputTo(storage_path('logs/order_created.log'))
                ->onSuccess(function(){
                    echo "Kirim Invoice berhasil \n";
                });
            // echo "Kirim Invoice ";
        }

    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
