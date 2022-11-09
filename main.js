const box = document.getElementById('container');
const boxmodal = document.getElementById('modalbox');
const modalshadow = document.getElementById('modalshadow');

const url = `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`;
var currentpage = 1;
var startitems = 0;
var itemsperpage = 50;
function FetchPokemon(j) {
    
fetch(url)
    .then( function(res) {
        return res.json();
    })
    .then( function(poke) {                                                
        //let numpage = poke.results.length;
        var enditems = j + itemsperpage -1 ;
        for(j; j <=  enditems; j++) 
            { 
                //console.log(poke.results[j].url);
                
                fetch(poke.results[j].url)
                .then(
                    function(respone) {
                        return respone.json();
                    }
                )
                .then(
                    function(data) {
                        //console.log(data);
                        return pokemon = {
                            name: data.name.toUpperCase(),
                            id: data.id,
                            image: data.sprites['front_default'],
                            type: data.types.map(
                                function(type) {
                                    return type.type.name
                                }
                            ).join(', '),
                            hp: data.stats[0].base_stat,
                            at: data.stats[1].base_stat,
                            de: data.stats[2].base_stat,
                            sa: data.stats[3].base_stat,
                            sd: data.stats[4].base_stat,
                            sp: data.stats[5].base_stat,
                            ovr: Math.round((data.stats[0].base_stat + data.stats[1].base_stat+data.stats[2].base_stat+data.stats[3].base_stat+data.stats[4].base_stat+ data.stats[5].base_stat) / 6),
                            back: "",
                            exp: data.base_experience
                        }
                    }
                )
                .then(
                    function(poke) {
                        //console.log(poke);
                        let star;
                        if (poke.ovr < 70) {
                            poke.back += "background: linear-gradient(to right, rgb(196, 191, 177), rgb(235, 234, 233));";
                            star = "Common";
                        }  else if (poke.ovr < 80) {
                            poke.back += "background: linear-gradient(to right, rgb(78, 78, 211), rgb(142, 142, 250));";
                            star = "Rare";
                        } else if (poke.ovr < 95) {
                            poke.back += "background: linear-gradient(to right, rgb(255, 187, 0), rgb(245, 219, 76));";
                            star = "Super Rare";
                        } else if (poke.ovr < 110) {
                            poke.back += "background: linear-gradient(to right, orangered, orange);";
                            star = "Legendary";
                        } else {
                            poke.back += "background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red);";
                            star = "Mythic";
                        }
            
                        //console.log(poke.image);
                        const pokehtml = `
                        <div class="card" onclick="openModal(${poke.id})" style="${poke.back};">
                            <img class="card-image" src="${poke.image}"/>
                            <h2 class="card-title">${poke.id}. ${poke.name}</h2>
                            <p class="pokestar"> ${star}</p>
                            <p class="card-subtitle">Type: ${poke.type}</p>
                            <p class="overall">OVR: ${poke.ovr}</p>               
                            <div class="stats">
                                    <div class="statsright">                                                   
                                    <span>HP: ${poke.hp}</span>                                                                            
                                    <span>ATK: ${poke.at}</span>                                                                          
                                    <span>DEF: ${poke.hp}</span>                        
                                    </div>    
                                    <div class="statsleft">                                      
                                    <span>SATK: ${poke.sa}</span>                                                                           
                                    <span>SDEF: ${poke.sd}</span>                                                                            
                                    <span>SPE: ${poke.sp}</span>
                                    </div>
                            </div>
                        </div>`;
                        const pokehtmlmodal = `
                        
                        <div class="topmodal">
                        <span class="gamename">Pokemon API Game</span>
                        <button class="closemodal" onclick="closeModal()"><img src="img/close.png" alt=""></button>
                        </div>
                        <div class="cardmodal" id="pokemon${poke.id}" style="${poke.back};">
                        <button id="prevbuttonmodal" onclick="prevModal(${poke.id})">PREV</button>
                            <img class="card-image" src="${poke.image}"/>
                            <h2 class="card-title">${poke.id}. ${poke.name}</h2>
                            <p class="pokestar"> ${star}</p>
                            <p class="card-subtitle">Type: ${poke.type}</p>
                            <p class="overall">OVR: ${poke.ovr}</p>               
                            <div class="stats">
                                    <div class="statsright">                                                   
                                    <span>HP: ${poke.hp}</span>                                                                            
                                    <span>ATK: ${poke.at}</span>                                                                          
                                    <span>DEF: ${poke.hp}</span>                        
                                    </div>    
                                    <div class="statsleft">                                      
                                    <span>SATK: ${poke.sa}</span>                                                                           
                                    <span>SDEF: ${poke.sd}</span>                                                                            
                                    <span>SPE: ${poke.sp}</span>
                                    </div>
                            </div>
                            <button id="nextbuttonmodal" onclick="nextModal(${poke.id})">NEXT</button>
                        </div>
                        
                        `;
                        box.innerHTML += pokehtml;
                        boxmodal.innerHTML += pokehtmlmodal;
                        }                    
                    );                
            }
    }
    )};
    
    
    function prevPage()
    {
        if (currentpage > 1) {
            startitems -= itemsperpage;
            currentpage-- ;
            box.innerHTML = "";
            boxmodal.innerHTML = "";
            FetchPokemon(startitems);
            document.getElementById('page').innerHTML = currentpage ;
        }
    }
    
    function nextPage()
    {
        if (currentpage < 100) {
            currentpage++;
            startitems += itemsperpage;
            box.innerHTML = "";
            boxmodal.innerHTML = "";
            FetchPokemon(startitems);
            document.getElementById('page').innerHTML = currentpage;
        }
    }    
        
    window.onload = function() {
        document.getElementById('page').innerHTML = 1;
        FetchPokemon(0);
        closeModal();
    };
    function openModal(n) {
        if (n == 1) {
            let prevbuttonmodal = document.getElementById('prevbuttonmodal');
            prevbuttonmodal.style.visibility = "hidden";
        }
        let i;
        let k = document.getElementsByClassName("cardmodal");
         for (i = 0 ; i <= itemsperpage - 1 ; i++) {
             k[i].style.display = "none";}    
        console.log(k); 
        let pokemodal = document.getElementById(`pokemon${n}`);
        pokemodal.style.display = "block";
        modalshadow.style.display = "block";
        boxmodal.style.display = "block";
   }
   function prevModal(n) {
        
        n--;
        openModal(n);
   }
   function nextModal(n) {
        n++;
        openModal(n);
   }
   function closeModal() {
        boxmodal.style.display = "none";
        modalshadow.style.display = "none";

   }