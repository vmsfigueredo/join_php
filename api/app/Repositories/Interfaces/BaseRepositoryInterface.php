<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface BaseRepositoryInterface
{
    public function getAll(array $orderBy): Collection;

    public function getBy(array $where, array $orderBy): Collection;

    public function getOneBy(array $where, array $orderBy): Model;

    public function create(array $payload): Model;

    public function update(int $id, array $payload): Model;

    public function delete(int $id): bool;
}
