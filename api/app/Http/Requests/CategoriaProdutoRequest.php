<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoriaProdutoRequest extends FormRequest
{

    public function attributes()
    {
        return [
            "id_categoria_planejamento" => "ID da categoria do produto",
            "nome_categoria" => "Nome da categoria"
        ];
    }

    public function rules(): array
    {
        return [
            "nome_categoria" => ["required", "max:150"],
        ];
    }

    public function messages()
    {
        return [
            "required" => "O campo :attribute é obrigatório.",
            "max" => "O campo :attribute não pode conter mais que :max caracteres.",
            "unique" => "O campo :attribute deve ser único."
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
