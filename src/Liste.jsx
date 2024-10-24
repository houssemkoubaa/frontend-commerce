import React, { useState, useEffect } from 'react'
import { fetcharticles } from './services/articleservice'
const Liste = () => {
    const [articles, setArticles] = useState([]);
    const fetchProducts = async () => {
        try {
            const res = await fetcharticles()
            setArticles(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div>
            <table >
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Référence</th>
                        <th>Désignation</th>
                        <th>Marque</th>
                        <th>Quanité</th>
                        <th>Prix</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        articles.map(article => <tr key={article.id}>

                            <td><img src={article.imageart} width={80} height={80} /></td>
                            <td>{article.reference}</td>
                            <td>{article.designation}</td>
                            <td>{article.marque}</td>
                            <td>{article.qtestock}</td>
                            <td>{article.prix}</td>
                        </tr>)

                    }
                </tbody>
            </table>
        </div>
    )
}
export default Liste