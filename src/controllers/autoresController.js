import autores from "../models/Autor.js";

class AutorController {
    static listarAutores = async (req, res) => {
      try {
        const autoresResultado = await autores.find();
        res.status(200).json(autoresResultado);
      } catch (err) {
        console.log(err);
      }
    };

    static listarAutoresPorId = async (req, res) => {
      const id = req.params.id;

      try {
        const autorEncontrado = await autores.findById(id);
    
        if (!autorEncontrado) {
          return res.status(404).send({ message: 'Autor não encontrado' });
        }
    
        res.status(200).json(autorEncontrado);
      } catch (err) {
        res.status(400).send({ message: `${err.message} - Ocorreu um erro ao buscar o Autor` });
      }
    }

    static cadastrarAutor = async (req, res) => {
      let autor = new autores(req.body);

      try {
        await autor.save()
        res.status(201).send(autor.toJSON())
      } catch(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar Autor.`})
      }
      
    }

    static atualizarAutor = async (req, res) => {
      const id = req.params.id;

      try {
       await autores.findByIdAndUpdate(id, {$set: req.body})
       res.status(200).send({message: 'Autor atualizado com sucesso!'})
      } catch(err) {
        res.status(500).send({message: err.message})
      }
      
    }

    static excluirAutor = async (req, res) => {
      const id = req.params.id;

      try {
      const autorEncontrado = await autores.findByIdAndDelete(id)
      if (autorEncontrado) {
        return res.status(200).send({ message: 'Autor removido com sucesso' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message});
    }
  }
  }

export default AutorController