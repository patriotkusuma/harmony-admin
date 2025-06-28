<?php

namespace App\Traits;

trait WaSender
{

    public function notify($message, $phone)
    {
        $curl = curl_init();

        $phone_number = preg_replace('/^0/','62',$phone);
        // dd($phone_number);

        // curl_setopt_array($curl, array(
        //     CURLOPT_URL => 'https://api.fonnte.com/send',
        //     CURLOPT_RETURNTRANSFER => true,
        //     CURLOPT_ENCODING => '',
        //     CURLOPT_MAXREDIRS => 10,
        //     CURLOPT_TIMEOUT => 0,
        //     CURLOPT_FOLLOWLOCATION => true,
        //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        //     CURLOPT_CUSTOMREQUEST => 'POST',
        //     CURLOPT_POSTFIELDS => array(
        //     'target' => $phone,
        //     'message' => $message,
        //     'countryCode' => '62', //optional
        //     ),
        //     CURLOPT_HTTPHEADER => array(
        //         'Authorization: 6hx1jMBFbqfmjW2fbq8!' //change TOKEN to your actual token
        //     ),
        // ));


        curl_setopt_array($curl, array(
            // CURLOPT_URL => 'https://app.saungwa.com/api/create-message',
            // CURLOPT_URL => 'http://103.76.129.93:35456/send',
            CURLOPT_URL => 'https://wa.harmonylaundry.my.id/send',
            // CURLOPT_URL => 'https://wa.harmonylaundrys.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode(array(
                'appkey' => 'c656bfb9-c13c-4f22-902c-c6b0f31e4f52',
                'authkey' => 'i7v9XcVo3el9VZ7FSFe5ljaZe3pR1G8gDaqyc8pZc78jsG4cza',
                // 'to' => $phone_number,
                'phone' => $phone_number,
                'message' => $message,
                'sandbox' => 'false'
            )),
            CURLOPT_HTTPHEADER => array(
                'Content-Type:application/json'
            )
        ));


        $response = curl_exec($curl);
        // \Log::channel('kirim_notif')->info('Response :', $response);
        if(curl_errno($curl)) {
            $error_msg = curl_error($curl);
            \Log::channel('kirim_notif')->error('Response :', $error_msg);

        }

        curl_close($curl);
        if (isset($error_msg)) {
            echo $error_msg;
        }

        return $response;

    }

    public function invoice($message, $phone)
    {

    }
}
