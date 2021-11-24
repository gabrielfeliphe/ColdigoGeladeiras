package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.jdbcinterface.ProdutoCompraDAO;
import br.com.coldigogeladeiras.modelo.ProdutoCompra;

public class JDBCProdutoCompraDAO implements ProdutoCompraDAO{
	
	private Connection conexao;
	
	public JDBCProdutoCompraDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir(ProdutoCompra produtoCompra) throws SQLException{
		String comando = "INSERT INTO compras_has_produtos (compras_id, produtos_id, valor, quantidade) VALUES (?,?,?,?)";
		PreparedStatement p;
		
		p = this.conexao.prepareStatement(comando);
		p.setInt(1, produtoCompra.getIdCompra());
		p.setInt(2, produtoCompra.getIdProduto());
		p.setFloat(3, produtoCompra.getValor());
		p.setInt(4, produtoCompra.getQuantidade());
		p.execute();
		
		return true;
	}
	
	public List<JsonObject> buscaPorCompra(int idCompra){
		
		List<JsonObject> listaProdutos = new ArrayList<JsonObject>();
		JsonObject produto = null;
		
		String comando = "SELECT produtos.categoria, marcas.nome, AS marca, produtos.modelo, compras_has_produtos.valor,"+
				"compras_has_produtos.quantidade FROM bdcoldigo.compras_has_produtos INNER JOIN produtos ON produtos.id=compras_has_produtos.produtos_id"+
				" INNER JOIN marcas ON marcas.id=produtos.marcas_id WHERE compras_id='"+idCompra+"'";
		
	
		try {
			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			
			while(rs.next()){
				
				String categoria = rs.getString("categoria");
				String marca = rs.getString("marca");
				String modelo = rs.getString("modelo");
				float valor = rs.getFloat("valor");
				int quantidade = rs.getInt("quantidade");
				
				if(categoria.equals("1")) {
					categoria = "Geladeira";
				}else if(categoria.equals("2")) {
					categoria = "Freezer";
				}
				
				produto = new JsonObject();
				produto.addProperty("categoria", categoria);
				produto.addProperty("marca", marca);
				produto.addProperty("modelo", modelo);
				produto.addProperty("valor", valor);
				produto.addProperty("quantidade", quantidade);
				
				listaProdutos.add(produto);
			}
			
		}catch(SQLException e) {
			e.printStackTrace();
		}
	 return listaProdutos;
	}
	
}
