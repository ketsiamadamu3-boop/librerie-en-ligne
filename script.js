let livres = JSON.parse(localStorage.getItem("livres")) || [
    {id:1, titre:"HTML & CSS", prix:20, stock:5},
    {id:2, titre:"JavaScript Pro", prix:25, stock:4},
    {id:3, titre:"Programmation Java", prix:30, stock:3}
];

localStorage.setItem("livres", JSON.stringify(livres));

/* ================= LIVRES ================= */

function afficherLivres(){
    let data = JSON.parse(localStorage.getItem("livres"));
    let zone = document.getElementById("zoneLivres");
    zone.innerHTML="";

    data.forEach(livre=>{
        zone.innerHTML+=`
        <div class="card">
            <h3>${livre.titre}</h3>
            <p>Prix: ${livre.prix}$</p>
            <p>Stock: ${livre.stock}</p>
            <button onclick="ajouterPanier(${livre.id})">Acheter</button>
        </div>
        `;
    });
}

function ajouterPanier(id){
    let data = JSON.parse(localStorage.getItem("livres"));
    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    let livre = data.find(l=>l.id==id);

    if(livre.stock > 0){
        panier.push(livre);
        livre.stock--;
        localStorage.setItem("panier", JSON.stringify(panier));
        localStorage.setItem("livres", JSON.stringify(data));
        alert("Livre ajouté au panier");
        afficherLivres();
    }else{
        alert("Stock épuisé !");
    }
}

/* ================= PANIER ================= */

function afficherPanier(){
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let zone = document.getElementById("zonePanier");
    let total = 0;

    zone.innerHTML="";

    panier.forEach((item,index)=>{
        total += item.prix;
        zone.innerHTML+=`
        <tr>
            <td>${item.titre}</td>
            <td>${item.prix}$</td>
            <td>
                <button onclick="supprimerPanier(${index})">Supprimer</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("total").innerText = total + "$";
}

function supprimerPanier(index){
    let panier = JSON.parse(localStorage.getItem("panier"));
    panier.splice(index,1);
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier();
}

/* ================= FACTURE ================= */

function genererFacture(){
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let total = panier.reduce((sum,item)=>sum+item.prix,0);

    let facture = "===== FACTURE =====\n\n";

    panier.forEach(item=>{
        facture += item.titre + " - " + item.prix + "$\n";
    });

    facture += "\nTotal: " + total + "$";
    facture += "\nMerci pour votre achat !";

    alert(facture);
}

/* ================= PAIEMENT ================= */

function simulerPaiement(){
    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    if(panier.length === 0){
        alert("Panier vide !");
        return;
    }

    let total = panier.reduce((sum,item)=>sum+item.prix,0);

    let methode = prompt("Choisir mode de paiement:\n1. Airtel Money\n2. Orange Money\n3. M-Pesa");

    let numero = prompt("Entrer votre numéro Mobile Money :");

    if(numero === null || numero === ""){
        alert("Paiement annulé");
        return;
    }

    alert("Paiement de " + total + "$ effectué avec succès ✅\nMerci pour votre achat !");

    localStorage.removeItem("panier");
    afficherPanier();
}


function supprimerLivre(id){
    let data = JSON.parse(localStorage.getItem("livres"));
    data = data.filter(l=>l.id!=id);
    localStorage.setItem("livres", JSON.stringify(data));
    afficherStock();
}

function modifierLivre(id){
    let data = JSON.parse(localStorage.getItem("livres"));
    let livre = data.find(l=>l.id==id);

    let nouveauPrix = prompt("Nouveau prix :", livre.prix);
    let nouveauStock = prompt("Nouveau stock :", livre.stock);

    livre.prix = parseFloat(nouveauPrix);
    livre.stock = parseInt(nouveauStock);

    localStorage.setItem("livres", JSON.stringify(data));
    afficherStock();
}


/* ================= AJOUTER LIVRE ================= */

function ajouterLivre(){
    let titre = document.getElementById("titre").value;
    let prix = document.getElementById("prix").value;
    let quantite = document.getElementById("quantite").value;

    if(titre==="" || prix==="" || quantite===""){
        alert("Veuillez remplir tous les champs");
        return;
    }

    let data = JSON.parse(localStorage.getItem("livres")) || [];

    let nouveauLivre = {
        id: Date.now(),
        titre: titre,
        prix: parseFloat(prix),
        stock: parseInt(quantite)
    };

    data.push(nouveauLivre);

    localStorage.setItem("livres", JSON.stringify(data));

    alert("Livre ajouté avec succès ✅");

    document.getElementById("titre").value="";
    document.getElementById("prix").value="";
    document.getElementById("quantite").value="";

    afficherStock();
}
