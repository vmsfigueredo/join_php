<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tb_categoria_produto', function (Blueprint $table) {
            $table->increments('id_categoria_planejamento');
            $table->string('nome_categoria', 150);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tb_categoria_produto');
    }
};
