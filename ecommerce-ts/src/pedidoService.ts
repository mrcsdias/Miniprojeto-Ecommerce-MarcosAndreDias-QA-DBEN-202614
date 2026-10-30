import { Pedido, RelatorioVendas } from "./types";
import { obterOuCriarCarrinho, limparCarrinho } from "./carrinhoService";
import { atualizarEstoque } from "./produtoService";

const pedidosEfetuados: Pedido[] = [];
let proximoId = 1;

export function fecharPedido(clienteId: number): Pedido {
  const carrinho = obterOuCriarCarrinho(clienteId);

  if (carrinho.itens.length === 0) {
    throw new Error("Não é possível fechar um pedido com o carrinho vazio.");
  }

  // Deduz as quantidades do estoque físico de cada produto
  for (const item of carrinho.itens) {
    atualizarEstoque(item.produtoId, -item.quantidade);
  }

  const novoPedido: Pedido = {
    id: proximoId++,
    clienteId,
    itens: [...carrinho.itens],
    valorTotal: carrinho.valorTotal,
    dataPedido: new Date()
  };

  pedidosEfetuados.push(novoPedido);
  limparCarrinho(clienteId);

  return novoPedido;
}

export function gerarRelatorioVendas(): RelatorioVendas {
  const faturamentoTotal = pedidosEfetuados.reduce((total, p) => total + p.valorTotal, 0);
  const totalPedidos = pedidosEfetuados.length;

  const contagemProdutos: { [nome: string]: number } = {};
  for (const pedido of pedidosEfetuados) {
    for (const item of pedido.itens) {
      contagemProdutos[item.nome] = (contagemProdutos[item.nome] || 0) + item.quantidade;
    }
  }

  const produtosMaisVendidos = Object.keys(contagemProdutos)
    .map(nome => ({ nome, quantidade: contagemProdutos[nome] }))
    .sort((a, b) => b.quantidade - a.quantidade);

  return {
    faturamentoTotal,
    totalPedidos,
    produtosMaisVendidos
  };
}