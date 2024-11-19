import { query } from "express";
import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;


// classe que representa um cliente
export class Cliente {
    //atributos

    private idCliente: number = 0;
    private nome: string;
    private cpf: string;
    private telefone: string;

    /**
     * Construtor da classe Cliente
     * 
     * @param nome Nome do cliente
     * @param cpf CPF do cliente
     * @param telefone Telefone do cliente
     */

    constructor(
        nome: string,
        cpf: string,
        telefone: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

     /* Métodos get e set */
    /**
     * Recupera o identificador do cliente
     * @returns o identificador do cliente
     */

    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atribui um valor ao identificador do carro
     * @param idCliente novo identificado do carro
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna a nome do cliente.
     *
     * @returns {string} O nome do cliente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do cliente.
     * 
     * @param nome - O nome do cliente a ser definido.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o cpf do cliente.
     *
     * @returns {string} O cpf do cliente.
     */
    public getCpf(): string {
        return this.cpf;
    }

    /**
     * Define o cpf do cliente.
     *
     * @param cpf - O cpf do cliente.
     */
    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o telefone do cliente.
     *
     * @returns {string} O telefone do cliente.
     */
    public getTelefone(): string {
        return this.telefone;
    }

    /**
     * Define o telefone do cliente.
     *
     * @param telefone - O telefone do cliente.
     */
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    static async listagemClientes(): Promise<Array<Cliente> | null> {
        const listaDeClientes: Array<Cliente> = [];

        try {
            const querySelectCliente = `SELECT * FROM cliente`;
            const respostaBD = await database.query(querySelectCliente);

            respostaBD.rows.forEach((linha) => {
                const novoCliente = new Cliente(
                    linha.nome,
                    linha.cpf,
                    linha.telefone
                );

                novoCliente.setIdCliente(linha.id_cliente);

                listaDeClientes.push(novoCliente);
            });
            
            return listaDeClientes;
        } catch (error) {
            console.log('Erro ao buscar lista de carros');
            return null;
        }
    }

    
    /**
     * Cadastra um novo cliente no banco de dados.
     * 
     * Esta função recebe um objeto `Cliente`, extrai as informações de nome, CPF e telefone e
     * realiza uma operação de inserção (INSERT) na tabela `cliente` do banco de dados. Se o 
     * cadastro for bem-sucedido, a função retorna `true`, caso contrário, retorna `false`.
     * 
     * @param {Cliente} cliente - Objeto contendo os dados do cliente a ser cadastrado.
     * 
     * @returns {Promise<boolean>} - Retorna `true` se o cliente for cadastrado com sucesso, 
     *                               ou `false` se ocorrer um erro ou falha na inserção.
     * 
     * @throws {Error} - Em caso de erro na consulta ao banco de dados, o erro é registrado no log.
     */
    static async cadastroCliente(cliente: Cliente): Promise<boolean> {
        try {
            const queryInsertCliente = `INSERT INTO cliente (nome, cpf, telefone)
                                        VALUES
                                        ('${cliente.getNome()}', '${cliente.getCpf()}', '${cliente.getTelefone()}')
                                        RETURNING id_cliente`;

            const respostaBD = await database.query(queryInsertCliente);

            if(respostaBD.rowCount != 0) {
                console.log(`Cliente cadastrado com sucesso. ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log('Erro ao cadastrar o cliente. Consulte os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    static async removerCliente(idCliente: number): Promise<boolean> {
        try {
            const queryDeleteCliente = `DELETE FROM cliente WHERE id_cliente = ${idCliente}`;
        
            const respostaBD = await database.query(queryDeleteCliente);

            if(respostaBD.rowCount != 0) {
                console.log(`Cliente removido com sucesso. ID removido: ${idCliente}`);
                return true;
            }

            return false;

        } catch (error) {
            console.log(`Erro ao remover cliente. Verifique os logs para mais detalhes.`);
            console.log(error);
            return false;
        }
    }
}