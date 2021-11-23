package br.com.coldigogeladeiras.jdbcinterface;

import java.sql.SQLException;

import br.com.coldigogeladeiras.modelo.ProdutoCompra;

public interface ProdutoCompraDAO {
	
	public boolean inserir(ProdutoCompra produtoCompra) throws SQLException;

}
