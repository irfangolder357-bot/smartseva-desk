const services = [
["PVC & ID Cards","PVC ID Card","PVC ID Card"],["PVC & ID Cards","Aadhaar PVC / Document Print","Document / PVC Print"],["PVC & ID Cards","Voter ID PVC Print","Voter ID PVC"],["PVC & ID Cards","Driving Licence PVC","Driving Licence PVC"],["PVC & ID Cards","PAN Card Print","PAN Card Print"],["PVC & ID Cards","Ration Card Print","Ration Card Print"],["PVC & ID Cards","School/Office ID Card","School/Office ID Card"],
["Photo & Printing","Passport Size Photo","Passport Photo"],["Photo & Printing","Photo Print","Photo Print"],["Photo & Printing","Photo Framing","Photo Framing"],["Photo & Printing","Document Scan","Document Scan"],["Photo & Printing","Colour / B&W Print","Print / Photocopy"],
["Online Forms","Government Form Fill-up","Government Form Fill-up"],["Online Forms","Exam / Admission Form","Exam / Admission Form"],["Online Forms","Job Application","Job Application"],["Online Forms","Scholarship Form","Scholarship Form"],["Online Forms","Certificate Application","Certificate Application"],
["Digital Services","PAN Application Assistance","PAN Application Assistance"],["Digital Services","Voter Service Assistance","Voter Service Assistance"],["Digital Services","Ration Card Service Assistance","Ration Card Service Assistance"],["Digital Services","Driving Licence Service Assistance","Driving Licence Service Assistance"],["Digital Services","Resume / CV","Resume / CV"],["Digital Services","Email / Document Upload","Email / Document Upload"],["Digital Services","Laminate / Binding","Laminate / Binding"]
];

const icons={"PVC & ID Cards":"🪪","Photo & Printing":"📸","Online Forms":"📝","Digital Services":"💻"};
const grid=document.getElementById("serviceGrid"), select=document.getElementById("service");
function render(list=services){
 grid.innerHTML=list.map(([cat,name,value])=>`<article class="service"><div class="icon">${icons[cat]}</div><div><span>${cat}</span><h3>${name}</h3><p>অনলাইনে অর্ডার করে বিস্তারিত তথ্য পাঠান।</p></div><button onclick="selectService('${value.replaceAll("'","\\'")}')">অর্ডার →</button></article>`).join("");
 select.innerHTML='<option value="">Service নির্বাচন করুন</option>'+services.map(x=>`<option value="${x[2]}">${x[1]}</option>`).join("");
}
function selectService(v){select.value=v;document.getElementById("order").scrollIntoView({behavior:"smooth"});}
function filterServices(){const q=document.getElementById("search").value.toLowerCase();render(services.filter(x=>(x[1]+" "+x[0]).toLowerCase().includes(q)));}
function getLocation(){
 if(!navigator.geolocation){setLoc("Browser location unavailable");return}
 setLoc("Location নেওয়া হচ্ছে...");
 navigator.geolocation.getCurrentPosition(p=>{
  document.getElementById("lat").value=p.coords.latitude.toFixed(6);
  document.getElementById("lng").value=p.coords.longitude.toFixed(6);
  setLoc("✓ Location captured: "+p.coords.latitude.toFixed(4)+", "+p.coords.longitude.toFixed(4));
 },()=>setLoc("Location permission দেওয়া হয়নি"));
}
function setLoc(t){document.getElementById("locStatus").textContent=t;document.getElementById("orderLoc").textContent=t;}
async function submitOrder(e){
 e.preventDefault();
 const order={name:name.value,phone:phone.value,service:service.value,details:details.value,latitude:lat.value,longitude:lng.value,createdAt:new Date().toISOString()};
 try{
  const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});
  if(!r.ok) throw new Error();
  const d=await r.json();
  alert("অর্ডার সফল! Order ID: "+d.id);
  e.target.reset(); document.getElementById("orderLoc").textContent="Not captured";
 }catch(err){alert("Server connection পাওয়া যাচ্ছে না। Demo mode-এ order save করা হয়নি।");}
}
render();