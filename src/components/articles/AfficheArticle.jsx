import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, Button } from "@mui/material";
const AfficheArticle = ({ articles, setArticles }) => {
  const deleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete")) {
      return;
    }
    axios
      .delete(`https://backendecomgs1.vercel.app/api/api/articles/${id}`)
      .then(() => {
        console.log("successfully deleted!");
        setArticles(articles.filter((cat) => cat.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        accessorKey: "designation",
        header: "Image",
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              alt=""
              width={200}
              height={80}
              src={cell.getValue()}
              loading="lazy"
              style={{ borderRadius: "5%" }}
            />
          </Box>
        ),
      },
      {
        accessorKey: "nomcategorie",
        header: "Nom Catégorie",
        size: 100,
      },

      {
        accessorKey: "_id",
        header: "actions",
        size: 10,
        Cell: ({ cell, row }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",

              gap: "0.5rem",
            }}
          >
            <Button
              onClick={() => {
                navigate(`/articles/edit/${cell.row.original.id}`);
              }}
              variant="contained"
              color="warning"
              style={{ fontSize: "20px", padding: "12px 24px" }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Button onClick={() => {}} variant="contained" color="warning">
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Button
              onClick={() => {
                deleteArticle(cell.row.original.id);
              }}
              variant="contained"
              color="error"
              style={{ fontSize: "20px", padding: "12px 24px" }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </div>
        ),
      },
    ],
    [articles]
  );
  const table = useMaterialReactTable({
    columns,
    data: articles,
  });
  return (
    <div className="container">
      {articles && articles.length > 0 && <MaterialReactTable table={table} />}
    </div>
  );
};
export default AfficheArticle;
