import { Produto } from "./types";

const catalogo: Produto[] = [];
let proximoId = 1;

export function cadastrarProduto(nome: string, preco: number, estoque: number, categoria: string): Produto {
  if (preco <= 0) {
    throw new Error(`O preço do produto "${nome}" deve ser maior que zero.`);
  }
  if (estoque < 0) {
    throw new Error(`O estoque do produto "${nome}" não pode ser negativo.`);
  }

  const novoProduto: Produto = {
    id: proximoId++,
    nome,
    preco,
    estoque,
    categoria,
  };

  catalogo.push(novoProduto);
  return novoProduto;
}

export function listarProdutos(): Produto[] {
  return [...catalogo];
}

export function buscarProdutoPorId(id: number): Produto | undefined {
  return catalogo.find(p => p.id === id);
}

export function atualizarEstoque(id: number, quantidade: number): void {
  const produto = buscarProdutoPorId(id);
  if (!produto) {
    throw new Error(`Produto com ID ${id} não encontrado.`);
  }

  const novoEstoque = produto.estoque + quantidade;
  if (novoEstoque < 0) {
    throw new Error(`Estoque insuficiente para o produto "${produto.nome}". Estoque atual: ${produto.estoque}.`);
  }

  produto.estoque = novoEstoque;
}