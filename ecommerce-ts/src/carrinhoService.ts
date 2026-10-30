import { Carrinho, ItemCarrinho } from "./types";
import { buscarProdutoPorId } from "./produtoService";
import { buscarClientePorId } from "./clienteService";

const carrinhosAtivos: Map<number, Carrinho> = new Map();

function calcularTotalCarrinho(carrinho: Carrinho): void {
  carrinho.valorTotal = carrinho.itens.reduce((total, item) => total + item.subtotal, 0);
}

export function obterOuCriarCarrinho(clienteId: number): Carrinho {
  const cliente = buscarClientePorId(clienteId);
  if (!cliente) {
    throw new Error(`Não é possível gerenciar um carrinho para um cliente inexistente (ID: ${clienteId}).`);
  }

  if (!carrinhosAtivos.has(clienteId)) {
    carrinhosAtivos.set(clienteId, {
      clienteId,
      itens: [],
      valorTotal: 0
    });
  }
  return carrinhosAtivos.get(clienteId)!;
}

export function adicionarAoCarrinho(clienteId: number, produtoId: number, quantidade: number): Carrinho {
  if (quantidade <= 0) {
    throw new Error("A quantidade a ser adicionada deve ser maior que zero.");
  }

  const produto = buscarProdutoPorId(produtoId);
  if (!produto) {
    throw new Error(`Produto com ID ${produtoId} não encontrado.`);
  }

  const carrinho = obterOuCriarCarrinho(clienteId);
  const itemExistente = carrinho.itens.find(item => item.produtoId === produtoId);
  
  const quantidadeJaNoCarrinho = itemExistente ? itemExistente.quantidade : 0;
  const quantidadeTotalSolicitada = quantidadeJaNoCarrinho + quantidade;

  if (produto.estoque < quantidadeTotalSolicitada) {
    throw new Error(`Estoque insuficiente para o produto "${produto.nome}". Disponível: ${produto.estoque}, Solicitado no carrinho: ${quantidadeTotalSolicitada}.`);
  }

  if (itemExistente) {
    itemExistente.quantidade = quantidadeTotalSolicitada;
    itemExistente.subtotal = itemExistente.quantidade * produto.preco;
  } else {
    carrinho.itens.push({
      produtoId: produto.id,
      nome: produto.nome,
      precoUnitario: produto.preco,
      quantidade,
      subtotal: quantidade * produto.preco
    });
  }

  calcularTotalCarrinho(carrinho);
  return carrinho;
}

export function limparCarrinho(clienteId: number): void {
  carrinhosAtivos.delete(clienteId);
}