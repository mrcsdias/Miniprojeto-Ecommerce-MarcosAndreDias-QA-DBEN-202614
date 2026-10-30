export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

export interface ItemCarrinho {
  produtoId: number;
  nome: string;
  precoUnitario: number;
  quantidade: number;
  subtotal: number;
}

export interface Carrinho {
  clienteId: number;
  itens: ItemCarrinho[];
  valorTotal: number;
}

export interface Pedido {
  id: number;
  clienteId: number;
  itens: ItemCarrinho[];
  valorTotal: number;
  dataPedido: Date;
}

export interface RelatorioVendas {
  faturamentoTotal: number;
  totalPedidos: number;
  produtosMaisVendidos: { nome: string; quantidade: number }[];
}