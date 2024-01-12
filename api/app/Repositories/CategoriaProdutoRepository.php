<?php

namespace App\Repositories;

use App\Models\CategoriaProduto;
use App\Repositories\Interfaces\CategoriaProdutoRepositoryInterface;

class CategoriaProdutoRepository extends BaseRepository implements CategoriaProdutoRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(new CategoriaProduto());
    }
}
