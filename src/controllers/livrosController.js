import livros from "../models/Livro.js";

class LivroController {
    static listarLivros = async (req, res) => {
      try {
        const livrosResultado = await livros.find().populate('autor').exec()
        res.status(200).json(livrosResultado);
      } catch (err) {
        console.log(err);
      }
    };

    static listarLivrosPorId = async (req, res) => {
      const id = req.params.id;

      try {
        const livroEncontrado = await livros.findById(id).populate('autor', 'nome').exec()
    
        if (!livroEncontrado) {
          return res.status(404).send({ message: 'Livro não encontrado' });
        }
    
        res.status(200).json(livroEncontrado);
      } catch (err) {
        res.status(400).send({ message: `${err.message} - Ocorreu um erro ao buscar o livro` });
      }
    }

    static cadastrarLivro = async (req, res) => {
      let livro = new livros(req.body);

      try {
        await livro.save()
        res.status(201).send(livro.toJSON())
      } catch(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
      }
      
    }

    static atualizarLivro = async (req, res) => {
      const id = req.params.id;

      try {
       await livros.findByIdAndUpdate(id, {$set: req.body})
       res.status(200).send({message: 'Livro atualizado com sucesso!'})
      } catch(err) {
        res.status(500).send({message: err.message})
      }
      
    }

    static excluirLivro = async (req, res) => {
      const id = req.params.id;

      try {
      const livroEncontrado = await livros.findByIdAndDelete(id)
      if (livroEncontrado) {
        return res.status(200).send({ message: 'Livro removido com sucesso' });
      }
  
    } catch (err) {
      res.status(500).send({ message: err.message});
    }
  }

  static listarLivroPorEditora = async (req, res) => {
    const editora = req.query.editora;

    try {
    const livrosEncontrados = await livros.find({editora})
    if (livrosEncontrados) {
     return res.status(200).send(livrosEncontrados)
    }
    } catch(err) {
      res.status(500).send({message: err.message})
    }
    
  }
  }

export default LivroController