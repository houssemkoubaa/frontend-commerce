import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Article.css";
import { useParams, useNavigate } from "react-router-dom";

const Editarticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const loadarticle = async () => {
    axios
      .get(`https://backendecomgs1.vercel.app/api/api/articles/${id}`)
      .then((response) => {
        setCategorie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    loadarticle();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    //faire le put dans la BD
    axios
      .put(`https://backendecomgs1.vercel.app/api/api/articles/${id}`, article)
      .then((res) => {
        console.log(res);
        navigate("/articles");
      })
      .catch((error) => {
        console.log(error);
        alert("Erreur ! Modification non effectuée");
      });
  };
  return (
    <div className="form-container">
      <form className="categorie-form">
        <h2>Modifier Article</h2>

        <div className="form-group">
          <label htmlFor="Nom">Nom article</label>
          <input
            type="text"
            id="reference"
            value={article.name}
            onChange={(e) =>
              setCategorie({ ...article, nomarticle: e.target.value })
            }
            className="form-input"
            placeholder="Entrez nom catégorie"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            required
            id="imagecategorie"
            value={article.param}
            onChange={(e) =>
              setCategorie({ ...categorie, param: e.target.value })
            }
            className="form-input"
            placeholder="Image"
          />
          {article.imagecategorie ? (
            <img src={categorie.imagecategorie} alt="image" width="70" />
          ) : null}
        </div>
        <button
          type="button"
          className="form-submit-button"
          onClick={(e) => handleSubmit(e)}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};
export default Editarticle;
