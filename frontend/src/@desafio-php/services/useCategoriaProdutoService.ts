import {useApi} from "./useApi";
import {GenericAbortSignal} from "axios";
import {CategoriaType} from "../types/categoria";

export const useCategoriaProdutoService = () => {
  const api = useApi();

  return {
    async get(signal: GenericAbortSignal | undefined = undefined) {
      const resp = await api.get('categoria-produtos', {
        signal
      });

      return resp.data;
    },
    async find(id: number, signal: GenericAbortSignal | undefined = undefined) {
      const resp = await api.get(`categoria-produtos/${id}`, {
        signal
      });

      return resp.data;
    },
    async create(values: CategoriaType) {
      const resp = await api.post(`categoria-produtos`, values);

      return resp.data;
    },
    async update(id: number, values: CategoriaType) {
      const resp = await api.put(`categoria-produtos/${id}`, values);

      return resp.data;
    },
    async delete(id: number) {
      const resp = await api.delete(`categoria-produtos/${id}`);

      return resp.data;
    }
  }
}
