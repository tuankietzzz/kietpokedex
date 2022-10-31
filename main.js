const box = document.getElementById('container');
for(var i = 1 ; i<= 1024 ; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
fetch(url)
    .then( function(res) {
        return res.json();
    })
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
                back: ""
            }
        }
    )
    .then(
        function(poke) {
            console.log(poke);
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

            console.log(poke.image);
            const pokehtml = `
            <div class="card" style="${poke.back};">
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
            box.innerHTML += pokehtml;
            }
            
        )};

