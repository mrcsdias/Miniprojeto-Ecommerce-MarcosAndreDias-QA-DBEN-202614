import { cadastrarProduto, listarProdutos } from "./produtoService";
import { cadastrarCliente } from "./clienteService";
import { adicionarAoCarrinho } from "./carrinhoService";
import { fecharPedido, gerarRelatorioVendas } from "./pedidoService";

function executarTestes() {
  console.log("==============================================");
  console.log("🚀 INICIANDO TESTES DO SISTEMA DE E-COMMERCE");
  console.log("==============================================\n");

  // ---------------------------------------------------------
  // 1. FLUXO VÁLIDO: Executando operações corretas
  // ---------------------------------------------------------
  try {
    console.log("--- [PASSO 1] Cadastrando Produtos ---");
    const p1 = cadastrarProduto("Notebook Pro", 5000, 5, "Eletrônicos");
    const p2 = cadastrarProduto("Mouse Vertical", 200, 10, "Acessórios");
    const p3 = cadastrarProduto("Teclado Mecânico", 400, 3, "Acessórios");
    console.log("Catálogo inicial cadastrado com sucesso.");
    console.table(listarProdutos());

    console.log("\n--- [PASSO 2] Cadastrando Clientes ---");
    const cliente1 = cadastrarCliente("Carlos Henrique", "carlos@email.com", "111.222.333-44");
    const cliente2 = cadastrarCliente("Mariana Costa", "mariana@email.com", "555.666.777-88");
    console.log(`Clientes cadastrados: ${cliente1.nome} (ID: ${cliente1.id}) e ${cliente2.nome} (ID: ${cliente2.id}).`);

    console.log("\n--- [PASSO 3] Operações de Carrinho (Cliente 1) ---");
    adicionarAoCarrinho(cliente1.id, p1.id, 1); // 1 Notebook (R$ 5000)
    const carrinhoAtualizado = adicionarAoCarrinho(cliente1.id, p2.id, 2); // 2 Mouses (R$ 400)
    console.log(`Carrinho do ${cliente1.nome} estruturado.`);
    console.log(`Subtotal Calculado: R$ ${carrinhoAtualizado.valorTotal}`);
    console.table(carrinhoAtualizado.itens);

    console.log("\n--- [PASSO 4] Finalizando Pedido (Cliente 1) ---");
    const pedido1 = fecharPedido(cliente1.id);
    console.log(`✅ Pedido #${pedido1.id} gerado com sucesso para o cliente ${cliente1.id}! Total: R$ ${pedido1.valorTotal}`);

    console.log("\n--- [PASSO 5] Compra de outro cliente (Cliente 2) ---");
    adicionarAoCarrinho(cliente2.id, p2.id, 1); // 1 Mouse (R$ 200)
    adicionarAoCarrinho(cliente2.id, p3.id, 2); // 2 Teclados (R$ 800)
    const pedido2 = fecharPedido(cliente2.id);
    console.log(`✅ Pedido #${pedido2.id} gerado com sucesso para o cliente ${cliente2.id}! Total: R$ ${pedido2.valorTotal}`);

    console.log("\n--- [PASSO 6] Estado do Estoque Após Pedidos Faturados ---");
    console.table(listarProdutos());

    console.log("\n--- [PASSO 7] Relatório Consolidado de Vendas ---");
    const relatorio = gerarRelatorioVendas();
    console.log(`Faturamento Total: R$ ${relatorio.faturamentoTotal}`);
    console.log(`Total de Pedidos Concluídos: ${relatorio.totalPedidos}`);
    console.log("Ranking de Produtos Vendidos:");
    console.table(relatorio.produtosMaisVendidos);

  } catch (error: any) {
    console.error("❌ Ocorreu um erro inesperado no fluxo válido:", error.message);
  }

  // ---------------------------------------------------------
  // 2. FLUXO DE VALIDAÇÃO: Forçando erros de regra de negócio
  // ---------------------------------------------------------
  console.log("\n==============================================");
  console.log("⚠️ INICIANDO TESTES DE VALIDAÇÕES DE ERRO");
  console.log("==============================================\n");

  // Teste de Erro A: Estourar o Estoque
  try {
    console.log("Tentando adicionar 10 Notebooks ao carrinho (Estoque atual é menor)...");
    // ID 1 é o Notebook Pro, que agora só possui 4 unidades em estoque
    adicionarAoCarrinho(1, 1, 10); 
  } catch (error: any) {
    console.log(`📌 Validação de Estoque Funcionando: "${error.message}"`);
  }

  // Teste de Erro B: Fechar pedido vazio
  try {
    console.log("\nTentando fechar pedido com carrinho vazio para Cliente 1...");
    fecharPedido(1);
  } catch (error: any) {
    console.log(`📌 Validação de Carrinho Vazio Funcionando: "${error.message}"`);
  }
}

executarTestes();