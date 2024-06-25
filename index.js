const express = require("express");
const routes  = require("./routes/index.routes");
const app = express();
const PORT = 8080;
const sequelize = require("./database")

app.get("/", (req, res) => {
  res.send("Hello server");
});

app.use(express.json())


app.use("/api",routes)

app.listen(PORT, () => {
    console.log("Server Running Sucessfully at port" , PORT);
});
sequelize.sync().then((result)=>{
    console.log(result);
}).catch((error)=>{
console.log(error);
});
