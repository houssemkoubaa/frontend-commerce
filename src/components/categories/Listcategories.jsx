import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Listcategories = () => {
  const [categories, setCategories] = useState([]);
  const getcategories = async () => {
    await axios
      .get("https://backendecomgs1.vercel.app/api/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getcategories();
  }, []);
  return (
    <div>
      <Button variant="contained" style={{ backgroundColor: "black" }}>
        <Link
          to="/categories/add"
          style={{
            color: "white",

            textDecoration: "none",
          }}
        >
          <i className="fa-solid fa-plus-square"></i> Nouveau
        </Link>
      </Button>
      <h2>Liste des catégories </h2>
      <Affichecategories
        categories={categories}
        setCategories={setCategories}
      />
      <table className="table table table-striped">
        <thead>
          <tr>
            <td>Nom catégorie</td>
            <td>Image categorie</td>
            <td>Update</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((cat, index) => (
              <tr key={index}>
                <td>{cat.nomcategorie}</td>
                <td>
                  <img src={cat.imagecategorie} width={100} height={100} />
                </td>
                <td>
                  <button className="btn btn-warning btn-sm">Update</button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Listcategories;
