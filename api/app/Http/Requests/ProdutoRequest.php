<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProdutoRequest extends FormRequest
{
    public function attributes()
    {
        return [
            "id_produto" => "ID do produto",
            "id_categoria_produto" => "categoria do produto",
            "nome_produto" => "nome do produto",
            "valor_produto" => "valor do produto"
        ];
    }

    public function rules(): array
    {
        return [
            "id_produto" => [
                "nullable",
//                Rule::unique("tb_produto")->ignore($this->route("produto") ?? 0, 'id_produto')
            ],
            "id_categoria_produto" => ["required", "integer", "exists:tb_categoria_produto,id_categoria_planejamento"],
            "nome_produto" => ["required", "max:150"],
            "valor_produto" => ["required", "numeric"],
        ];
    }

    public function messages()
    {
        return [
            "required" => "O campo :attribute é obrigatório.",
            "exists" => "Você inseriu uma :attribute inválida.",
            "date" => "O campo :attribute deve ser uma data.",
            "max" => "O campo :attribute não pode conter mais que :max caracteres.",
            "numeric" => "O campo :attribute deve ser numérico.",
            "unique" => "O campo :attribute deve ser único."
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
