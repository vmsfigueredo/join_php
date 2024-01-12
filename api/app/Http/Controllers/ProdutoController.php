<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdutoRequest;
use App\Http\Resources\ProdutoResource;
use App\Repositories\Interfaces\ProdutoRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ProdutoController extends Controller
{
    public function __construct(
        private readonly ProdutoRepositoryInterface $produtoRepository,
    )
    {
    }

    public function index()
    {
        return ProdutoResource::collection($this->produtoRepository->getAll());
    }

    /**
     * @throws \Exception
     */
    public function store(ProdutoRequest $request)
    {
        try {
            DB::beginTransaction();
            $produto = $this->produtoRepository->create($request->validated());
            DB::commit();
            return new ProdutoResource($produto);
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    public function show($id)
    {
        $produto = $this->produtoRepository->getOneBy(['id_produto' => $id]);
        return new ProdutoResource($produto);
    }

    /**
     * @throws \Exception
     */
    public function update(ProdutoRequest $request, $id)
    {
        try {
            DB::beginTransaction();
            $produto = $this->produtoRepository->update($id, $request->validated());
            DB::commit();
            return new ProdutoResource($produto);
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * @throws \Exception
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $deleted = $this->produtoRepository->delete($id);
            DB::commit();
            return response()->json($deleted);
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }
}
