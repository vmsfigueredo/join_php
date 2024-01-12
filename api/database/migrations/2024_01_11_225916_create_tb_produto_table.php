<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tb_produto', function (Blueprint $table) {
            $table->increments('id_produto');
            $table->unsignedInteger('id_categoria_produto');
            $table->timestamp('data_cadastro')->useCurrent();
            $table->string('nome_produto', 150);
            $table->float('valor_produto', 10, 2);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tb_produto');
    }
};
