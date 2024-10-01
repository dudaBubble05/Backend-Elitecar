// Classe que representa um pedido/venda

export class Pedido {
    
    //Atributos
    private idPedido: number = 0;
    private idCarro: number = 0;
    private idCliente: number = 0;
    private dataPedido: Date;
    private valorPedido: number = 0;

    /**
     * Construtor da classe Carro
     * 
     * @param dataPedido Data do pedido
     * @param valorPedido Valor do pedido
     */
    
    constructor(
        dataPedido: Date,
        valorPedido: number,
    ) {
        this.valorPedido = valorPedido;
        this.dataPedido = dataPedido;
    }

     /* Métodos get e set */
      /**
     * Recupera o identificador do pedido
     * @returns o identificador do pedido
     */

    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Atribui um valor ao identificador do carro
     * @param idPedido novo identificado do carro
     */
    public setIdPedido(idPedido: number): void {
        this.idCliente = idPedido;
    }


    /**
     * Recupera o identificador do carro
     * @returns o identificador do carro
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Atribui um valor ao identificador do carro
     * @param idCarro novo identificado do carro
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

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
     * Retorna a data do pedido.
     *
     * @returns {Date} A data do pedido.
     */
    public getDataPedido(): Date {
        return this.dataPedido;
    }

    /**
     * Define a data do pedido.
     *
     * @param dataPedido - data do pedido.
     */
    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    /**
     * @returns o valor do pedido
     */
    public getValorPedido(): number {
        return this.valorPedido;
    }

    /**
     * @param valorPedido - valor do pedido
     */
    public setValorPedido(valorPedido: number): void {
        this.idCarro = valorPedido;
    }
}

