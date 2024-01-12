<?php

namespace App\Providers;

use App\Repositories\CategoriaProdutoRepository;
use App\Repositories\Interfaces\CategoriaProdutoRepositoryInterface;
use App\Repositories\Interfaces\ProdutoRepositoryInterface;
use App\Repositories\ProdutoRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    private $repositories = [
        ProdutoRepositoryInterface::class => ProdutoRepository::class,
        CategoriaProdutoRepositoryInterface::class => CategoriaProdutoRepository::class
    ];

    public function register(): void
    {
        foreach ($this->repositories as $interface => $repository) {
            $this->app->bind($interface, $repository);
        }
    }

    public function boot(): void
    {
    }
}
