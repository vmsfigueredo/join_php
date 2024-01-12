<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Produto */
class ProdutoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id_produto' => $this->id_produto,
            'data_cadastro' => $this->data_cadastro,
            'nome_produto' => $this->nome_produto,
            'valor_produto' => $this->valor_produto,

            'id_categoria_produto' => $this->id_categoria_produto,

//            'categoria' => new CategoriaProdutoResource($this->whenLoaded('categoria')),
            'categoria' => new CategoriaProdutoResource($this->categoria),
        ];
    }
}
