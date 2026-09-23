const USERS=[{id:101,name:'Gokila CSE',dept:'CSE',year:2},{id:102,name:'Arun ECE',dept:'ECE',year:2},{id:103,name:'Priya IT',dept:'IT',year:3},{id:104,name:'Kavin CSE',dept:'CSE',year:1}];
const KEY='campus_thrift_data_v1', USERKEY='campus_thrift_user';
const seedListings=[
{id:1,itemName:'Engineering Drawing Kit',description:'Complete drawing kit with instruments. Used for one semester, everything works well.',category:'Stationery',image:'📐',condition:'GOOD',listingType:'SELL',price:300,department:'CSE',year:2,status:'AVAILABLE',ownerId:101,createdAt:'2026-09-08'},
{id:2,itemName:'Java Programming Book',description:'Clean copy with useful notes. Great for first and second year students.',category:'Books',image:'📚',condition:'GOOD',listingType:'SELL',price:180,department:'CSE',year:2,status:'AVAILABLE',ownerId:102,createdAt:'2026-09-07'},
{id:3,itemName:'Desk Lamp',description:'Warm LED desk lamp, perfect for hostel study nights.',category:'Hostel',image:'💡',condition:'LIKE_NEW',listingType:'SELL',price:450,department:'ECE',year:2,status:'AVAILABLE',ownerId:103,createdAt:'2026-09-06'},
{id:4,itemName:'Scientific Calculator',description:'Casio-style scientific calculator. Fully functional.',category:'Electronics',image:'🧮',condition:'GOOD',listingType:'DONATE',price:0,department:'CSE',year:3,status:'AVAILABLE',ownerId:104,createdAt:'2026-09-05'},
{id:5,itemName:'Lab Coat',description:'White lab coat, size M. Worn a few times and washed.',category:'Fashion',image:'🥼',condition:'GOOD',listingType:'DONATE',price:0,department:'IT',year:3,status:'AVAILABLE',ownerId:103,createdAt:'2026-09-04'},
{id:6,itemName:'USB-C Hub',description:'6-in-1 hub with HDMI, USB and card reader ports.',category:'Electronics',image:'🔌',condition:'LIKE_NEW',listingType:'SELL',price:650,department:'CSE',year:2,status:'RESERVED',ownerId:101,createdAt:'2026-09-03'},
{id:7,itemName:'Data Structures Notes',description:'Handwritten notes covering trees, linked lists, stacks and queues.',category:'Books',image:'📝',condition:'GOOD',listingType:'DONATE',price:0,department:'CSE',year:3,status:'AVAILABLE',ownerId:102,createdAt:'2026-09-02'},
{id:8,itemName:'Hostel Storage Box',description:'Foldable storage box, useful for books and clothes.',category:'Hostel',image:'📦',condition:'FAIR',listingType:'SELL',price:120,department:'ECE',year:2,status:'AVAILABLE',ownerId:104,createdAt:'2026-09-01'}
];
const seedRequests=[
{id:1,title:'Need Engineering Drawing materials',description:'Looking for a drawing kit or individual instruments for this semester.',category:'Stationery',department:'CSE',year:2,requesterId:103,status:'OPEN',createdAt:'2026-09-08'},
{id:2,title:'Looking for Java reference books',description:'Any beginner-friendly Java book would help for my current coursework.',category:'Books',department:'ECE',year:2,requesterId:104,status:'OPEN',createdAt:'2026-09-07'},
{id:3,title:'Need a hostel study lamp',description:'Prefer something small and affordable for my hostel table.',category:'Hostel',department:'CSE',year:1,requesterId:104,status:'OPEN',createdAt:'2026-09-06'},
{id:4,title:'Need a scientific calculator',description:'Mine stopped working before the internal assessment.',category:'Electronics',department:'IT',year:3,requesterId:103,status:'FULFILLED',createdAt:'2026-09-03'}
];
function load(){let d=localStorage.getItem(KEY);if(!d){d={listings:seedListings,requests:seedRequests,interests:[],reports:[]};save(d)}return d}
function save(d){localStorage.setItem(KEY,JSON.stringify(d))}
function currentUser(){return USERS.find(u=>u.id===+(localStorage.getItem(USERKEY)||101))||USERS[0]}
function initUser(){const s=document.getElementById('userSelect'),n=document.getElementById('userName');if(!s)return;if(!s.options.length)USERS.forEach(u=>s.add(new Option(u.name,u.id)));s.value=currentUser().id;if(n)n.textContent=currentUser().name;s.onchange=()=>{localStorage.setItem(USERKEY,s.value);location.reload()}}
function esc(x=''){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function userName(id){return USERS.find(u=>u.id===+id)?.name||'Student'}
function iconFor(c){return {Books:'📚',Electronics:'🔌',Stationery:'📐',Hostel:'🛏️',Fashion:'👕',Lab:'🥼',Other:'📦'}[c]||'📦'}
function toast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function fmtStatus(s){return s[0]+s.slice(1).toLowerCase()}
function card(l){let img=l.imageUrl?`<img src="${esc(l.imageUrl)}" onerror="this.parentElement.innerHTML='${iconFor(l.category)}'">`:esc(l.image||iconFor(l.category));return `<article class="listing-card"><a href="listing.html?id=${l.id}"><div class="thumb">${img}</div></a><div class="card-body"><div class="badges"><span class="badge ${l.listingType==='DONATE'?'green':''}">${l.listingType==='DONATE'?'FREE / DONATE':'FOR SALE'}</span><span class="badge gray">${esc(fmtStatus(l.status))}</span></div><h3>${esc(l.itemName)}</h3><div class="price">${l.listingType==='DONATE'?'Free':'₹'+Number(l.price).toLocaleString('en-IN')}</div><div class="meta">${esc(l.condition.replace('_',' '))} • ${esc(l.department)} • Year ${l.year}</div><div class="card-foot"><span class="meta">by ${esc(userName(l.ownerId))}</span><a href="listing.html?id=${l.id}">View →</a></div></div></article>`}
function requestCard(r){return `<article class="request-card"><div class="badges"><span class="badge">${esc(r.category)}</span><span class="badge ${r.status==='OPEN'?'green':'gray'}">${esc(fmtStatus(r.status))}</span></div><h3>${esc(r.title)}</h3><p>${esc(r.description)}</p><div class="bottom"><span>${esc(r.department)} • Year ${r.year} • ${esc(userName(r.requesterId))}</span><span>${r.createdAt}</span></div></article>`}
document.addEventListener('DOMContentLoaded',()=>{load();initUser()})
