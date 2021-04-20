package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

public class JDBCMarcaDAO implements MarcaDAO{
	
	private Connection conexao;
	
	public JDBCMarcaDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public List<Marca> buscar(){
		
		//Criação da instrução SQL para busca de todas as marcas
		String comando = "SELECT * FROM marcas";
		
		
		//Criação de uma lista para armazenar cada marca encontrada
		List<Marca> listMarcas = new ArrayList<Marca>();
		
		//Criação do objeto marca com valor null (ou seja, sem instanciá-lo)
		Marca marca = null;
		
		//Abertura do try-catch
		
		try {
			
			//Uso da conexão do banco para prepará-lo par auma instrução SQL
			
			Statement stmt = conexao.createStatement();
			
			//Execução da instrução criada previamente
			//e armazenamento do resultado no objeto rs
			
			ResultSet rs = stmt.executeQuery(comando);
			
			//Enquanto houver uma próxima linha no resultado
			while(rs.next()) {
				
				//Criação de instância de classe Marca
				marca = new Marca();
				
				//Recebimento dos 2 dados retornados do BD para cada linha encontrada
				int id = rs.getInt("id");
				String nome = rs.getString("nome");
				
				//Setando no objeto marca os valores encontrados
				marca.setId(id);
				marca.setNome(nome);
				
				//Adição da instância contida no objeto Marca na lista de marcas
				listMarcas.add(marca);
			}
			
			
			//Caso alguma Exception seja gerada no Try, recebe-a no objeto "ex"
		}catch(Exception ex) {
			//Exibe a exceção na console
			ex.printStackTrace();
		}
		
		
		return listMarcas;
	}

	public List<JsonObject> buscarPorNome(String nome) {
		
				//Inicia criação do comando SQL de busca
		
				String comando = "SELECT marcas.*, marcas.nome as marca FROM marcas ";
				//Se o nome não estiver vazio ...
				
				if(!nome.equals("")) {
					//concatena no comando o WHERE buscando no nome do produto
					//o texto da variável nome
					
					comando +="WHERE nome LIKE '%" + nome + "%' ";
					
				}
				
				//Finaliza o comando ordenando alfabeticamente por
				//categora, marca e depois modelo.
				comando += "ORDER BY nome ASC, marcas.nome ASC";
				
				List<JsonObject> listaMarcas = new ArrayList<JsonObject>();
				JsonObject produto = null;
				
				try {
					Statement stmt = conexao.createStatement();
					ResultSet rs = stmt.executeQuery(comando);
					
					while(rs.next()) {
						
						int id = rs.getInt("id");
						String marcaNome = rs.getString("marca");
											
						produto = new JsonObject();
						produto.addProperty("id", id);
						
						produto.addProperty("marcaNome",marcaNome);
						
						listaMarcas.add(produto);
						
					}
					
				}catch(Exception e) {
					e.printStackTrace();
				}
				
				return listaMarcas;
	}
	
}
