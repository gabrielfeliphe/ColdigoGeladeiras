package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

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
	
}
