// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import {ColumnType, Table} from "../../@desafio-php/components/Table";
import {useProdutoService} from "../../@desafio-php/services/useProdutoService";
import {useEffect, useState} from "react";
import {parseISO} from "date-fns";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {ProdutoType} from "../../@desafio-php/types/produto";
import IconButton from "@mui/material/IconButton";
import {Icon} from "@iconify/react";
import {ProdutoDialog} from "../../@desafio-php/components/Dialogs/ProdutoDialog";
import Tooltip from "@mui/material/Tooltip";

const ProdutosPage = () => {
  const produtoService = useProdutoService();
  const [dialogProduto, setDialogProduto] = useState<boolean>(false);
  const [selectedProduto, setSelectedProduto] = useState<number | undefined>(undefined);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const produtosColumns: ColumnType[] = [
    {
      key: "id_produto",
      label: "#"
    },
    {
      key: "nome_produto",
      label: "Nome do Produto",
      render: (cell: string) => <b>{cell}</b>
    },
    {
      key: "valor_produto",
      label: "Valor do Produto",
      render: (cell: number) => `R$ ${cell.toString().replace('.', ',')}`
    },
    {
      key: "categoria.nome_categoria",
      label: "Categoria",
    },
    {
      key: "data_cadastro",
      label: "Data de Cadastro",
      render: (cell: string) => parseISO(cell).toLocaleString()
    },
    {
      key: '#',
      label: 'Ações',
      render: (cell: any, row: ProdutoType) => (
        <>
          <Tooltip title="Remover" placement="top">
            <IconButton color={"error"} onClick={() => handleDeleteProduto(row.id_produto)}><Icon
              icon={'bx:trash'}/></IconButton>
          </Tooltip>
          <Tooltip title="Editar" placement="top">
            <IconButton onClick={() => handleOpenDialogProduto(row.id_produto)}><Icon
              icon={'bx:edit'}/></IconButton>
          </Tooltip>
        </>
      )
    }
  ]
  const getProdutos = async (controller: AbortController | undefined = undefined) => {
    const {data} = await produtoService.get(controller?.signal);
    setLoading(false);
    setProdutos(data);
  }

  const handleCloseDialogProduto = () => {
    setDialogProduto(false);
    setSelectedProduto(undefined);
    getProdutos();
  }
  const handleOpenDialogProduto = (produto: number | undefined) => {
    setDialogProduto(true);
    setSelectedProduto(produto);
    getProdutos();
  }

  const handleDeleteProduto = async (produtoId: number) => {
    await produtoService.delete(produtoId);
    getProdutos();
  }
  useEffect(() => {
    const controller = new AbortController();
    getProdutos(controller);

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
              <Typography variant="h5">Produtos</Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'}>
              <Button variant={'contained'} onClick={() => handleOpenDialogProduto(undefined)}>Novo Produto</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Table columns={produtosColumns} rows={produtos} loading={loading}/>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ProdutoDialog handleClose={handleCloseDialogProduto} open={dialogProduto}
                     produtoId={selectedProduto}/>
    </>
  )
}

export default ProdutosPage
