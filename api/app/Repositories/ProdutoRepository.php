<?php

namespace App\Repositories;

use App\Models\Produto;
use App\Repositories\Interfaces\ProdutoRepositoryInterface;

class ProdutoRepository extends BaseRepository implements ProdutoRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(new Produto());
    }
}
