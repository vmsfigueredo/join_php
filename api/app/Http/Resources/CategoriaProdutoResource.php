<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\CategoriaProduto */
class CategoriaProdutoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id_categoria_planejamento' => $this->id_categoria_planejamento,
            'nome_categoria' => $this->nome_categoria,
            'produtos_count' => $this->produtos()->count(),
        ];
    }
}
