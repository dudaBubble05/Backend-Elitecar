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

    
    /**
     * Busca e retorna uma lista de clientes do banco de dados.
     * @returns Um array de objetos do tipo `Cliente` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todos os registros da tabela "cliente".
     * - Os dados retornados são utilizados para instanciar objetos da classe `Cliente`.
     * - Cada cliente instanciado é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
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
     * * Realiza o cadastro de um cliente no banco de dados.
     * 
     * Esta função recebe um objeto do tipo Cliente e insere seus dados (nome, cpf, telefonee)
     * na tabela cliente do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Cliente} cliente - Objeto contendo os dados do cliente que será cadastrado. O objeto Cliente
     *                        deve conter os métodos getNome(), getCpf(), getTelefone() 
     *                        que retornam os respectivos valores do cliente.
     * @returns {Promise<boolean>} - Retorna true se o cliente foi cadastrado com sucesso e false caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna false.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */

    static async cadastrocliente(cliente: Cliente): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertCliente = `INSERT INTO carro (nome, cpf, telefone)
                                        VALUES
                                        ('${cliente.getNome()}', 
                                        ${cliente.getNome()}, 
                                        ${cliente.getTelefone()}, 
                                        RETURNING id_cliente;`;
    
            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertCliente);
    
            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Cliente cadastrado com sucesso! ID do cliente: ${respostaBD.rows[0].id_cliente}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;
    
            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o cliente. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}