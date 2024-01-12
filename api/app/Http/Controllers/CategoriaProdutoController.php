<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriaProdutoRequest;
use App\Repositories\Interfaces\CategoriaProdutoRepositoryInterface;
use Illuminate\Support\Facades\DB;

class CategoriaProdutoController extends Controller
{
    public function __construct(
        private readonly CategoriaProdutoRepositoryInterface $categoriaProdutoRepository,
    )
    {
    }

    public function index()
    {
        return response()->json($this->categoriaProdutoRepository->getAll());
    }

    /**
     * @throws \Exception
     */
    public function store(CategoriaProdutoRequest $request)
    {
        try {
            DB::beginTransaction();
            $produto = $this->categoriaProdutoRepository->create($request->validated());
            DB::commit();
            return response()->json($produto);
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    public function show($id)
    {
        $produto = $this->categoriaProdutoRepository->getOneBy(['id' => $id]);
        return response()->json($produto);
    }

    /**
     * @throws \Exception
     */
    public function update(CategoriaProdutoRequest $request, $id)
    {
        try {
            DB::beginTransaction();
            $produto = $this->categoriaProdutoRepository->update($id, $request->validated());
            DB::commit();
            return response()->json($produto);
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
            $deleted = $this->categoriaProdutoRepository->delete($id);
            DB::commit();
            return response()->json($deleted);
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }
}
