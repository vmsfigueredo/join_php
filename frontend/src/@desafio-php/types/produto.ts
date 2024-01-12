import {CategoriaType} from "./categoria";

export type ProdutoType = {
  id_produto: number;
  id_categoria_produto: number;
  data_cadastro: string;
  nome_produto: string;
  valor_produto: number | string;
  categoria?: CategoriaType;
}
