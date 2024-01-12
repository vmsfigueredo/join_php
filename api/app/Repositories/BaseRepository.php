<?php

namespace App\Repositories;

use App\Repositories\Interfaces\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class BaseRepository implements BaseRepositoryInterface
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function getAll(array $orderBy = []): Collection
    {
        $query = $this->model->newModelQuery();

        foreach ($orderBy as $column => $order) {
            $query->orderBy($column, $order);
        }

        return $query->get();
    }

    public function getBy(array $where, array $orderBy = []): Collection
    {
        $query = $this->model->newModelQuery();

        foreach ($where as $column => $value) {
            $query->where($column, $value);
        }

        foreach ($orderBy as $column => $order) {
            $query->orderBy($column, $order);
        }

        return $query->get();
    }

    public function getOneBy(array $where, array $orderBy = []): Model
    {
        $query = $this->model->newModelQuery();

        foreach ($where as $column => $value) {
            $query->where($column, $value);
        }

        foreach ($orderBy as $column => $order) {
            $query->orderBy($column, $order);
        }

        return $query->firstOrFail();
    }

    public function create(array $payload): Model
    {
        return $this->model->newModelQuery()->create($payload);
    }

    public function update(int $id, array $payload): Model
    {
        $resource = $this->getOneBy([$this->model->getKeyName() => $id]);
        $resource->update($payload);
        return $resource;
    }

    public function delete(int $id): bool
    {
        try {
            $resource = $this->getOneBy([$this->model->getKeyName() => $id]);
            $resource->delete();
            return true;
        } catch (\Exception $exception) {
            return false;
        }
    }
}
