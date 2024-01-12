// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import {ColumnType, Table} from "../../@desafio-php/components/Table";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import Tooltip from "@mui/material/Tooltip";
import {useCategoriaProdutoService} from "../../@desafio-php/services/useCategoriaProdutoService";
import {CategoriaProdutoDialog} from "../../@desafio-php/components/Dialogs/CategoriaProdutoDialog";
import {CategoriaType} from "../../@desafio-php/types/categoria";

const CategoriasPage = () => {
  const categoriaProdutoService = useCategoriaProdutoService();
  const [dialogCategoria, setDialogCategoria] = useState<boolean>(false);
  const [selectedCategoria, setSelectedCategoria] = useState<number | undefined>(undefined);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const produtosColumns: ColumnType[] = [
    {
      key: "id_categoria_planejamento",
      label: "#"
    },
    {
      key: "nome_categoria",
      label: "Nome da Categoria",
      render: (cell: string) => <b>{cell}</b>
    },
    {
      key: '#',
      label: 'Ações',
      render: (cell: any, row: CategoriaType) => (
        <>
          <Tooltip title={row.produtos_count > 0 ? "Impossível remover categorias com produtos cadastrados" : "Remover"}
                   placement="top">
            <span>
              <IconButton disabled={row.produtos_count > 0} color={"error"}
                          onClick={() => handleDeleteCategoria(row.id_categoria_planejamento)}><Icon
                icon={'bx:trash'}/></IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Editar" placement="top">
            <IconButton onClick={() => handleOpenDialogCategoria(row.id_categoria_planejamento)}><Icon
              icon={'bx:edit'}/></IconButton>
          </Tooltip>
        </>
      )
    }
  ]
  const getCategorias = async (controller: AbortController | undefined = undefined) => {
    const {data} = await categoriaProdutoService.get(controller?.signal);
    setLoading(false);
    setCategorias(data);
  }

  const handleCloseDialogCategoria = () => {
    setDialogCategoria(false);
    setSelectedCategoria(undefined);
    getCategorias();
  }
  const handleOpenDialogCategoria = (categoria: number | undefined) => {
    setDialogCategoria(true);
    setSelectedCategoria(categoria);
    getCategorias();
  }

  const handleDeleteCategoria = async (produtoId: number) => {
    await categoriaProdutoService.delete(produtoId);
    getCategorias();
  }
  useEffect(() => {
    const controller = new AbortController();
    getCategorias(controller);

    return () => {
      try {
        controller.abort();
      } catch (error) {

      }
    }
  }, []);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Grid container spacing={6} alignItems={"center"}>
            <Grid item xs={6}>
              <Typography variant="h5">Categorias</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'}>
              <Button variant={'contained'} onClick={() => handleOpenDialogCategoria(undefined)}>Nova Categoria</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Table columns={produtosColumns} rows={categorias} loading={loading}/>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CategoriaProdutoDialog handleClose={handleCloseDialogCategoria} open={dialogCategoria}
                              categoriaId={selectedCategoria}/>
    </>
  )
}

export default CategoriasPage
