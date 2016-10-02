const express = require("express");
const app = express()
const mysql = require("mysql")
const bodyParser= require('body-parser')

app.use("/bootstrap",express.static(__dirname+"/bootstrap"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"myne"
});


app.listen(3000,function(){
console.log("Listening on 3000 ...");
});

app.get("/",function(req,res){
//res.send("Hola Mundo");
//res.sendFile(__dirname+"/index.html");
con.query("select * from person",function(e,r){
	res.render("index.ejs",{persons:r});
});
});

app.get("/new",function(req,res){
	res.render("new.ejs",{});
});

app.post("/save",function(req,res){
	console.log(req.body.person.name)
	var name = req.body.person.name;
	var lastname = req.body.person.lastname;
	var phone = req.body.person.phone;
	con.query("insert into person (name,lastname,phone,created_at) value (\""+name+"\",\""+lastname+"\",\""+phone+"\",NOW())",function(e,r){
	});
	res.redirect("/");
});

app.get("/edit/:personid",function(req,res){
con.query("select * from person where id="+req.params.personid,function(e,r){
	res.render("edit.ejs",{person:r[0]});
});
});

app.post("/update",function(req,res){
	console.log(req.body.person.name)
	var id = req.body.person.id;
	var name = req.body.person.name;
	var lastname = req.body.person.lastname;
	var phone = req.body.person.phone;
	con.query(" update person set name=\""+name+"\",lastname=\""+lastname+"\",phone=\""+phone+"\" where id="+id,function(e,r){
	});
	res.redirect("/edit/"+id);
});

app.get("/delete/:personid",function(req,res){
	con.query("delete from person where id="+req.params.personid,function(e,r){
	});
	res.redirect("/");
});
