<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnLimitTimeTodoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('to_dos', function (Blueprint $table) {
            $table->dateTime('date_time')->default(null)->index('index_datetime')->after('description')->comment('期限（時間）');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('to_dos', function (Blueprint $table) {
            $table->dropColumn('date_time');
        });
    }
}
