<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

        public function __construct()
    {

        //キャッシュが残るので 毎回 view ファイルを削除する
        $success = \File::cleanDirectory(storage_path()."/framework/views/");

        if(\Request::ip() == "61.27.15.240"){

            //デバッグモード

        } else {
            \Debugbar::disable();
        }


    }
}
