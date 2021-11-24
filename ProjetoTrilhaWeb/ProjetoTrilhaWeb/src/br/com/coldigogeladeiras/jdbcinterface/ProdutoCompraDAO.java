package br.com.coldigogeladeiras.jdbcinterface;

import java.sql.SQLException;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.modelo.ProdutoCompra;

public interface ProdutoCompraDAO {
	
	public boolean inserir(ProdutoCompra produtoCompra) throws SQLException;
	public List<JsonObject> buscaPorCompra(int idCompra);
}
