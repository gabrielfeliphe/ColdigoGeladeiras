package br.com.coldigogeladeiras.rest;

import java.sql.Connection;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import bd.br.coldigogeladeiras.bd.Conexao;
import br.com.coldigogeladeiras.jdbc.JDBCCompraDAO;
import br.com.coldigogeladeiras.modelo.Compra;
import br.com.coldigogeladeiras.modelo.ProdutoCompra;


@Path("compra")
public class CompraRest extends UtilRest{

	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String compraParam) {
		
		try {
			
			Compra compra = new Gson().fromJson(compraParam,Compra.class);
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCCompraDAO jdbcCompra = new JDBCCompraDAO(conexao);
			
			boolean retorno = jdbcCompra.inserir(compra);
			
			String msg = "Erro ao cadastrar compra.";
			if(retorno) {
				msg = "Compra cadastrada com sucesso!";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
		}catch(Exception e) {
		e.printStackTrace();
		return this.buildErrorResponse(e.getMessage());
	 }
	}
}
