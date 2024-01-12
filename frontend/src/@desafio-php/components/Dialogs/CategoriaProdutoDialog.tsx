import React, {useEffect, useState} from 'react';
import {BaseDialog} from "./BaseDialog";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {formikProps} from "../../utils/FormikProps";
import {useCategoriaProdutoService} from "../../services/useCategoriaProdutoService";
import {CategoriaType} from "../../types/categoria";
import CircularProgress from "@mui/material/CircularProgress";
import {LoadingButton} from "@mui/lab";

interface CategoriaProdutoPropType {
  handleClose: () => void | any;
  open: boolean;
  categoriaId?: number
}

const initialValues: CategoriaType = {
  id_categoria_planejamento: null,
  nome_categoria: "",
  produtos_count: 0
}
export const CategoriaProdutoDialog = ({categoriaId, ...dialogProps}: CategoriaProdutoPropType) => {
  const [loading, setLoading] = useState<boolean>(true);
  const categoriaProdutoService = useCategoriaProdutoService();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (values.id_categoria_planejamento) {
        await categoriaProdutoService.update(values.id_categoria_planejamento, values);
      } else {
        await categoriaProdutoService.create(values);
      }
      dialogProps.handleClose();
    }
  });

  useEffect(() => {
    const controller = new AbortController();
    if (dialogProps.open) {
      const getResources = async () => {
        if (categoriaId) {
          const {data: produtoData} = await categoriaProdutoService.find(categoriaId, controller.signal);
          await formik.setValues(produtoData)
        }
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
      title={formik.values.id_categoria_planejamento ? "Editar Categoria" : loading ? 'Carregando...' : "Nova Categoria"} {...dialogProps}>
      {!loading ?
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...formikProps('nome_categoria', formik)}
                fullWidth size="small" label="Nome da Categoria"/>
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
