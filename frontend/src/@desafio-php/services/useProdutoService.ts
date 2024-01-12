import {useApi} from "./useApi";
import {GenericAbortSignal} from "axios";
import {ProdutoType} from "../types/produto";

export const useProdutoService = () => {
  const api = useApi();
  return {
    async get(signal: GenericAbortSignal | undefined = undefined) {
      const resp = await api.get('produtos', {
        signal
      });

      return resp.data;
    },
    async find(id: number, signal: GenericAbortSignal | undefined = undefined) {
      const resp = await api.get(`produtos/${id}`, {
        signal
      });

      return resp.data;
    },
    async create(values: ProdutoType) {
      const resp = await api.post(`produtos`, values);

      return resp.data;
    },
    async update(id: number, values: ProdutoType) {
      const resp = await api.put(`produtos/${id}`, values);

      return resp.data;
    },
    async delete(id: number) {
      const resp = await api.delete(`produtos/${id}`);

      return resp.data;
    }
  }
}
