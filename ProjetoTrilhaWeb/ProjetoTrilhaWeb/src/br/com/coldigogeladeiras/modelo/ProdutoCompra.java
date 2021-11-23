package br.com.coldigogeladeiras.modelo;

import java.io.Serializable;

public class ProdutoCompra implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int idCompra;
	private int idProduto;
	private int quantidade;
	private float valor;
	
	public int getIdCompra() {
		return idCompra;
	}
	public void setIdCompra(int idCompra) {
		this.idCompra = idCompra;
	}
	public int getIdProduto() {
		return idProduto;
	}
	public void setIdProduto(int idProduto) {
		this.idProduto = idProduto;
	}
	public int getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}
	public float getValor() {
		return valor;
	}
	public void setValor(float valor) {
		this.valor = valor;
	}
	
	
}
