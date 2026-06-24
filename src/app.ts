import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoutes } from "./modules/users/user.router";

 export const app: Application = express();


// Middlewares
app.use(express.text()); // plain text
app.use(express.json()); // json format
app.use(express.urlencoded({ extended: true })); // extended means it will take the nested object also

// routes:
app.use("/api/users",userRoutes)


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    Author: "Nishat Jahan",
  });
});

/* 
** http method 
*/
// Post


// Get all users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const getAllUsers = await pool.query(`
        SELECT * FROM users`);
    // console.log(getAllUsers)
    if (getAllUsers.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "Users retrieve successfully",
      data: getAllUsers.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});
// Get single user
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const getSingleUser = await pool.query(
      `
        SELECT * FROM users WHERE id=$1`,
      [id],
    );

    if (getSingleUser.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    // console.log(getSingleUser)
    res.status(200).json({
      message: `user ${id} is retrieve successfully`,
      data: getSingleUser.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});
// update whole user with put
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, age, is_active } = req.body;

  try {
    const updateUser = await pool.query(
      `
          UPDATE users SET name=$1 ,   age=$2 , is_active=$3 WHERE id=$4 RETURNING *
            `,
      [name, age, is_active, id],
    );
    res.status(200).json({
      message: "Users retrieve successfully",
      data: updateUser.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});
// update single field with patch
app.patch("/api/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, age, is_active } = req.body;

  try {
    const updateUser = await pool.query(
      `
          UPDATE users SET name=$1=CON=COALESCE($1,name), age=$2=COALESCE($2,age) , is_active=$3=COALESCE($3,is_active) WHERE id=$4 RETURNING *
            `,
      [name, age, is_active, id],
    );
    res.status(200).json({
      message: "Users retrieve successfully",
      data: updateUser.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});
//delete user
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteUser = await pool.query(
      `
    DELETE FROM users WHERE id=$1  
      `,
      [id],
    );

    // console.log(deleteUser);
    if (deleteUser.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});


