const express = require("express");
const routes  = require("./routes/index.routes");
const app = express();
const PORT = 8080;
const path = require('path');
const sequelize = require("./database")

app.get("/", (req, res) => {
  res.send("Hello server");
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api",routes)
app.listen(PORT, () => {
    console.log("Server Running Sucessfully at port" , PORT);
});

// syncing the data of database
sequelize.sync().then((result)=>{
  console.log("Conneted to DB sucessfully");
    // console.log(result);
}).catch((error)=>{
console.log(error);
});
