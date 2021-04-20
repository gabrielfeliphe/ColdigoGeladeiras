package br.com.coldigogeladeiras.rest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import bd.br.coldigogeladeiras.bd.Conexao;
import br.com.coldigogeladeiras.jdbc.JDBCMarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

@Path("marca")
public class MarcaRest extends UtilRest {

		@GET	
		@Path("/buscar")
		@Produces(MediaType.APPLICATION_JSON)
		
		public Response buscar() {
			
		try {	
			List<Marca> listaMarcas = new ArrayList<Marca>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			listaMarcas = jdbcMarca.buscar();
			conec.fecharConexao();
			return this.buildResponse(listaMarcas);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
		
		}
		
		// função criada para voltar o objeto convertido para JSON, separando do método anterior.
		
		@GET	
		@Path("/buscarMarcas")
		@Produces(MediaType.APPLICATION_JSON)
		
		public Response buscarMarcas(@QueryParam("valorBusca")String nome) {
			
		try {	
			List<JsonObject> listaMarcas = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			listaMarcas = jdbcMarca.buscarPorNome(nome);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaMarcas);
			
			return this.buildResponse(json);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
		
		}
		
	
}
