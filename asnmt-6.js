// ---------- Packages Data ----------
const packages = [
  { id:1, destination:"Goa", durationDays:3, basePrice:8000, season:"high" },
  { id:2, destination:"Manali", durationDays:5, basePrice:12000, season:"mid" },
  { id:3, destination:"Rishikesh", durationDays:2, basePrice:6000, season:"low" }
];

// ---------- Packages Table ----------
function getSeasonMultiplier(season){
  switch(season){
    case "high": return 1.3;
    case "low": return 0.9;
    default: return 1;
  }
}
function renderPackages(){
  const table = document.querySelector("#packagesTable tbody");
  if(!table) return;
  table.innerHTML="";
  packages.forEach(pkg=>{
    const finalPrice = pkg.basePrice * getSeasonMultiplier(pkg.season);
    const tr = document.createElement("tr");
    tr.innerHTML=`
      <td>${pkg.id}</td>
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays}</td>
      <td>${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td>${finalPrice.toFixed(0)}</td>`;
    table.appendChild(tr);
  });
}

// ---------- Booking Estimator ----------
function nightsBetween(inDate,outDate){
  const ci = new Date(inDate), co = new Date(outDate);
  const diff = (co - ci)/(1000*60*60*24);
  return diff>0?diff:0;
}

function calcBooking(){
  const pkgSelect=document.querySelector("#pkgSelect");
  if(!pkgSelect) return;
  const pkg = packages.find(p=>p.id==pkgSelect.value);
  const checkIn=document.querySelector("#checkIn").value;
  const checkOut=document.querySelector("#checkOut").value;
  const guests=parseInt(document.querySelector("#guests").value);
  const promo=document.querySelector("#promo").value.trim().toUpperCase();
  const nights=nightsBetween(checkIn,checkOut);
  document.querySelector("#nights").textContent=nights;
  let total=pkg.basePrice * getSeasonMultiplier(pkg.season);
  if(guests>2) total*=1.2;
  switch(promo){
    case "EARLYBIRD": total*=0.9; break;
    case "SUMMER21": total*=0.95; break;
  }
  total*=nights;
  document.querySelector("#guestMultiplier").textContent=guests>2?"1.20x":"1.00x";
  document.querySelector("#total").textContent=total.toFixed(2);
  document.querySelector("#submitBtn").disabled=!(checkIn&&checkOut&&nights>0);
}

function loadBooking(){
  const sel=document.querySelector("#pkgSelect");
  if(!sel) return;
  packages.forEach(p=>{
    const opt=document.createElement("option");
    opt.value=p.id;
    opt.textContent=`${p.destination} - ₹${p.basePrice}`;
    sel.appendChild(opt);
  });
  sel.value=packages[0].id;
  ["change","input"].forEach(e=>{
    document.querySelector("#bookingForm").addEventListener(e,calcBooking);
  });
  document.querySelector("#bookingForm").addEventListener("submit",e=>{
    e.preventDefault();alert("Booking confirmed!");
  });
}

// ---------- Gallery ----------
function loadGallery(){
  const grid=document.querySelector("#galleryGrid");
  if(!grid) return;
  const pics=[
    {thumb:"https://picsum.photos/id/1015/300",large:"https://picsum.photos/id/1015/800",title:"Beach"},
    {thumb:"https://picsum.photos/id/1025/300",large:"https://picsum.photos/id/1025/800",title:"Mountains"},
    {thumb:"https://picsum.photos/id/1035/300",large:"https://picsum.photos/id/1035/800",title:"City"}
  ];
  pics.forEach(p=>{
    const img=document.createElement("img");
    img.src=p.thumb;
    img.setAttribute("data-large",p.large);
    img.setAttribute("data-title",p.title);
    grid.appendChild(img);
  });
  const modal=document.querySelector("#modal");
  const modalImg=document.querySelector("#modalImg");
  const modalTitle=document.querySelector("#modalTitle");
  grid.addEventListener("click",e=>{
    if(e.target.tagName==="IMG"){
      modalImg.src=e.target.dataset.large;
      modalTitle.textContent=e.target.dataset.title;
      modal.classList.add("open");
    }
  });
  modal.addEventListener("click",e=>{
    if(e.target.classList.contains("close-btn")||e.target===modal)
      modal.classList.remove("open");
  });
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded",()=>{
  renderPackages();
  loadBooking();
  loadGallery();
});
