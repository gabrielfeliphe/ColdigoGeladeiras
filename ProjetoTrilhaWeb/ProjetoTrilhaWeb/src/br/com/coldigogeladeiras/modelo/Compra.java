package br.com.coldigogeladeiras.modelo;

import java.io.Serializable;
import java.util.ArrayList;

public class Compra implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int id;
	private String data;
	private String fornecedor;
	private ArrayList<ProdutoCompra> produtos = new ArrayList<ProdutoCompra>();
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getFornecedor() {
		return fornecedor;
	}
	public void setFornecedor(String fornecedor) {
		this.fornecedor = fornecedor;
	}
	public ArrayList<ProdutoCompra> getProdutos() {
		return produtos;
	}
	public void setProdutos(ArrayList<ProdutoCompra> produtos) {
		this.produtos = produtos;
	}
	
	
	

}
