import React, {useEffect, useState} from 'react';
import {BaseDialog} from "./BaseDialog";
import {useProdutoService} from "../../services/useProdutoService";
import {useFormik} from "formik";
import {ProdutoType} from "../../types/produto";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {formikProps} from "../../utils/FormikProps";
import {useCategoriaProdutoService} from "../../services/useCategoriaProdutoService";
import {CategoriaType} from "../../types/categoria";
import CircularProgress from "@mui/material/CircularProgress";
import {LoadingButton} from "@mui/lab";
import InputAdornment from "@mui/material/InputAdornment";
import NumberFormat from 'react-number-format';

interface ProdutoDialogPropType {
  handleClose: () => void | any;
  open: boolean;
  produtoId?: number
}

const initialValues: ProdutoType = {
  data_cadastro: "",
  id_categoria_produto: 0,
  id_produto: 0,
  valor_produto: '',
  nome_produto: ''

}
export const ProdutoDialog = ({produtoId, ...dialogProps}: ProdutoDialogPropType) => {
  const [loading, setLoading] = useState<boolean>(true);
  const produtoService = useProdutoService();
  const categoriaProdutoService = useCategoriaProdutoService();
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (values.id_produto) {
        await produtoService.update(values.id_produto, values);
      } else {
        await produtoService.create(values);
      }
      dialogProps.handleClose();
    }
  });

  useEffect(() => {
    const controller = new AbortController();
    if (dialogProps.open) {
      const getResources = async () => {
        if (produtoId) {
          const {data: produtoData} = await produtoService.find(produtoId, controller.signal);
          await formik.setValues(produtoData)
        }
        const {data: categoriaData} = await categoriaProdutoService.get(controller.signal);
        setCategorias(categoriaData);
        setLoading(false);
      }
      getResources();
    } else {
      controller.abort();
      setLoading(true);
      formik.resetForm();

    }
  }, [dialogProps.open]);

  return (
    <BaseDialog
      title={formik.values.id_produto ? "Editar Produto" : loading ? 'Carregando...' : "Novo Produto"} {...dialogProps}>
      {!loading ?
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...formikProps('nome_produto', formik)}
                fullWidth size="small" label="Nome do Produto"/>
            </Grid>
            <Grid item xs={6}>
              <NumberFormat
                customInput={TextField}
                fullWidth size="small" label="Valor do Produto"
                thousandSeparator={'.'}
                decimalSeparator={','}
                decimalScale={2}
                value={formik.values.valor_produto ?? ''}
                onValueChange={(values) => {
                  formik.setFieldValue('valor_produto', values.floatValue);
                }}
                InputProps={{
                  startAdornment: <InputAdornment position={'start'}>R$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={6}>

              <TextField
                {...formikProps('id_categoria_produto', formik)}
                fullWidth size="small" label="Categoria" select>
                {categorias.map((categoria) => (
                  <MenuItem key={`categoria-${categoria.id_categoria_planejamento}`}
                            value={categoria.id_categoria_planejamento}>{categoria.nome_categoria}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <LoadingButton loading={formik.isSubmitting} variant="contained" type={"submit"}>Salvar</LoadingButton>
            </Grid>
          </Grid>
        </form>
        : <CircularProgress/>}
    </BaseDialog>
  )
}
