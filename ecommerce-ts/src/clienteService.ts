import { Cliente } from "./types";

const clientes: Cliente[] = [];
let proximoId = 1;

export function cadastrarCliente(nome: string, email: string, cpf: string): Cliente {
  if (clientes.some(c => c.email === email)) {
    throw new Error(`Já existe um cliente cadastrado com o e-mail: ${email}`);
  }
  if (clientes.some(c => c.cpf === cpf)) {
    throw new Error(`Já existe um cliente cadastrado com o CPF: ${cpf}`);
  }

  const novoCliente: Cliente = {
    id: proximoId++,
    nome,
    email,
    cpf,
  };

  clientes.push(novoCliente);
  return novoCliente;
}

export function listarClientes(): Cliente[] {
  return [...clientes];
}

export function buscarClientePorId(id: number): Cliente | undefined {
  return clientes.find(c => c.id === id);
}