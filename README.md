### ProjMXs

### 👤 Identificação

* Nome : MDIAS

### 🎯 Objetivo da Aplicação

O ProjMXs é uma aplicação back-end desenvolvida com o objetivo de organizar e automatizar as operações comerciais de uma pequena loja virtual. O sistema centraliza o gerenciamento de catálogos de produtos, controle rigoroso de estoque, cadastro de clientes, manipulação de carrinhos de compras e faturamento de pedidos, mitigando erros operacionais humanos como a venda de produtos sem estoque ou cálculos incorretos de valores. 

### ✨ Funcionalidades Implementadas

* Cadastro e Gerenciamento de Produtos: Inclusão de itens no catálogo com controle ativo de quantidade.
* Cadastro e Consulta de Clientes: Registro de compradores e barramento de cadastros duplicados.
* Lógica de Carrinho de Compras: Criação automática de cestas de compras, adição de itens e cálculo em tempo real de subtotais e totais.
* Registro de Pedidos: Fechamento de compras, conversão de carrinhos em pedidos formais e atualização física do estoque.
* Relatório Analítico de Vendas: Sumarização do faturamento bruto, contagem total de pedidos e ranking de produtos mais vendidos.

### 🛠️ Tecnologias Utilizadas

* Node.js: Ambiente de execução do Javascript no servidor.
* TypeScript: Superconjunto Javascript com tipagem estática e explícita para maior segurança do código.
* ts-node: Ferramenta de execução direta de arquivos TypeScript em ambiente de desenvolvimento.

### 📂 Estrutura dos Arquivos

text

ecommerce-ts/
├── src/
│   ├── types.ts          # Definições das interfaces e tipos customizados
│   ├── produtoService.ts # Regras de catálogo e movimentação de estoque
│   ├── clienteService.ts # Regras de gerenciamento e busca de clientes
│   ├── carrinhoService.ts# Lógica de manipulação de itens no carrinho
│   ├── pedidoService.ts  # Regras de faturamento e geração de relatórios
│   └── index.ts          # Script principal com a rotina de testes do sistema
├── package.json          # Gerenciamento de dependências e scripts de execução
├── tsconfig.json         # Configurações do compilador TypeScript
└── README.md             # Documentação oficial do projeto


### ⚙️ Instruções de Compilação e Execução

1. Instalar as dependências do projeto (execute na raiz do projeto):
npm install
2. Executar em ambiente de desenvolvimento (execução direta via ts-node):
npm run dev
3. Compilar e Executar em ambiente de produção (Gera a pasta /dist em JavaScript puro):
npm run start

### 📌 Regras de Negócio Implementadas

* Validação de Preço e Estoque: Não é permitido cadastrar produtos com preço igual ou menor que zero ou estoque negativo.
* Unicidade de Clientes: O sistema impede o cadastro de dois clientes com o mesmo e-mail ou mesmo CPF.
* Bloqueio de Estoque no Carrinho: Um cliente não pode adicionar uma quantidade de produtos ao carrinho que supere o estoque disponível no catálogo.
* Trava de Pedido Vazio: É proibido finalizar um pedido se o carrinho de compras do cliente não contiver nenhum item.
* Baixa Automatizada: No momento do fechamento do pedido, o sistema deduz automaticamente as quantidades compradas do estoque central do produto.

### 📈 Exemplos das Principais Operações

### Cadastrar Produto

typescript

const produto = cadastrarProduto("Notebook Pro", 5000, 5, "Eletrônicos");

### Adicionar ao Carrinho

typescript

adicionarAoCarrinho(clienteId, produtoId, quantidade);


### Fechar Pedido

typescript

const pedido = fecharPedido(clienteId);

### ⚠️ Limitações Conhecidas do Sistema

* Persistência em Memória: Os dados não são salvos em arquivos ou bancos de dados (SQL/NoSQL). Toda a informação é perdida assim que a execução do script é encerrada.
* Concorrência Simples: Como opera em memória local por meio de arrays de forma síncrona, o sistema não está preparado para requisições assíncronas simultâneas ou múltiplos acessos paralelos de rede.
* Dados Estatísticos Fixos: O ranking de produtos mais vendidos considera apenas a quantidade absoluta de itens despachados, sem levar em conta variações de período ou margem de lucro por categoria.
