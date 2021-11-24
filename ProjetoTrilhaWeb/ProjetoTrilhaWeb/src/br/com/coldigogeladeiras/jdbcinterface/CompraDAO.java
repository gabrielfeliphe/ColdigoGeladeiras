package br.com.coldigogeladeiras.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.modelo.Compra;

public interface CompraDAO {

	public boolean inserir (Compra compra);
	public List<JsonObject> gerarRelatorio();
}
