<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('tb_produto', function (Blueprint $table) {
            $table->foreign('id_categoria_produto', 'IXFK_tb_produto_tb_categoria_produto')->references('id_categoria_planejamento')->on('tb_categoria_produto');
        });
    }

    public function down(): void
    {
        Schema::table('tb_produto', function (Blueprint $table) {
            $table->dropForeign('IXFK_tb_produto_tb_categoria_produto');
        });
    }
};
