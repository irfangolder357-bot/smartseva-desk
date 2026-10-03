const express=require("express"), path=require("path"), fs=require("fs");
const app=express(), PORT=process.env.PORT||3000;
const DATA=path.join(__dirname,"data","orders.json");
app.use(express.json({limit:"5mb"})); app.use(express.static(path.join(__dirname,"public")));
function read(){try{return JSON.parse(fs.readFileSync(DATA,"utf8"))}catch{return[]}}
app.post("/api/orders",(req,res)=>{
 const b=req.body||{};
 if(!b.name||!b.phone||!b.service) return res.status(400).json({error:"Missing required fields"});
 const orders=read(), id="DSP-"+Date.now().toString().slice(-8);
 const order={id,...b,status:"new"};
 orders.unshift(order); fs.writeFileSync(DATA,JSON.stringify(orders,null,2));
 res.json({ok:true,id});
});
app.get("/api/orders",(req,res)=>res.json(read()));
app.get("/admin",(req,res)=>res.sendFile(path.join(__dirname,"public","admin.html")));
app.listen(PORT,()=>console.log("Running on http://localhost:"+PORT));