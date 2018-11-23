<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnLimitTodosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('to_dos', function (Blueprint $table) {
            $table->integer('limit')->index('index_limit')->after('description')->comment('期限');
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
            $table->dropColumn('limit');
        });
    }
}
