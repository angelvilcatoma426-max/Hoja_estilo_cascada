// DATA
const juegosCatalogo = [
    {
        titulo: "Marvel'Spider-man Remaster",
        precioTexto: "S/ 177.00",
        imagen: "../../imagen/catalogo/xAg5W0iyjWabOPfKAeaL8hGr2YAGK_BrGWbX3uDWLuE.jpg",
        alt: "Juego",
        link: "../marvel-spiderman-remastered/index.html",
        generos: ["Acción", "Aventura"],
        plataforma: "PlayStation"
    },
    {
        titulo: "terraria",
        precioTexto: "S/ 24.00",
        imagen: "../../imagen/catalogo/U_ZGMfi3RFrfgOluVpTllMbQF6nybFaibnn_V0PvdjU.jpg",
        alt: "Juego",
        link: "../terraria/index.html",
        generos: ["Aventura", "Indie"],
        plataforma: "PC"
    },
    {
        titulo: "PRAGMATA",
        precioTexto: "S/ 164.00",
        imagen: "../../imagen/catalogo/MaoUc1SZqDE7TZYEFyhk7fG5e5-WwVl1AzWyesCIx58.jpg",
        alt: "Juego",
        link: "../pragmata/index.html",
        generos: ["RPG", "Acción"],
        plataforma: ["PC", "PlayStation"]
    },
    {
        titulo: "Mortal kombat 11",
        precioTexto: "S/ 13.04",
        imagen: "../../imagen/catalogo/lWww24aHAc4baWySSkvzla7Cz_5dIwrE7Hnp33QWtS4.jpg",
        alt: "Juego",
        link: "../mortal-kombat-11/index.html",
        generos: ["Acción"],
        plataforma: "PC"
    },
    {
        titulo: "No Ma's Sky",
        precioTexto: "S/ 115.00",
        imagen: "../../imagen/catalogo/ppt92xozmp6fcaxfce0h.jpg",
        alt: "Juego",
        link: "../no-mans-sky/index.html",
        generos: ["Aventura", "RPG"],
        plataforma: "PC"
    },
    {
        titulo: "Assassi's creed 4: black flag",
        precioTexto: "S/ 65.10",
        imagen: "../../imagen/catalogo/HCs7H-ouO5ztZr1VHz9vdW95E6C0idGfaupRDgms_0k.jpg",
        alt: "Juego",
        link: null,
        generos: ["Acción", "Aventura"],
        plataforma: "PlayStation"
    },
    {
        titulo: "the forest",
        precioTexto: "S/ 28.00",
        imagen: "../../imagen/catalogo/khd-YlLgq3wqgjpSauZZyXrAnm8Hrfx-zZ2myJA4-wI.jpg",
        alt: "Juego",
        link: null,
        generos: ["Aventura", "Indie"],
        plataforma: "PC"
    },
    {
        titulo: "Grass life slime",
        precioTexto: "S/ 02.00",
        imagen: "../../imagen/catalogo/descarga.jpg",
        alt: "Juego",
        link: null,
        generos: ["Indie", "RPG"],
        plataforma: "PC"
    },
    {
        titulo: "God of War",
        precioTexto: "S/ 118.00",
        imagen: "../../imagen/catalogo/NjuT6XzO0fs0Lbdbe4jBMt3m3EsGOgJh7bU9fQurfKI.jpg",
        alt: "Juego",
        link: null,
        generos: ["Acción", "Aventura"],
        plataforma: "PlayStation"
    },
    {
        titulo: "Detroit:Become Human",
        precioTexto: "S/ 108.90",
        imagen: "../../imagen/catalogo/OHwigC91bAhgTtrpogp-KSOfj9XDDBpfzrZ63FCgZ1Y.jpg",
        alt: "Juego",
        link: null,
        generos: ["Aventura"],
        plataforma: "PlayStation"
    },
    {
        titulo: "Sonic frontiers",
        precioTexto: "S/ 219.00",
        imagen: "../../imagen/catalogo/_SQep7vkWj0acwhHa-a-kBq9VyT-T2yiwcKs-qhFcnE.jpg",
        alt: "Juego",
        link: null,
        generos: ["Acción", "Aventura"],
        plataforma: "PlayStation"
    },
    {
        titulo: "Assassin's creed valhalla",
        precioTexto: "S/ 156.00",
        imagen: "../../imagen/catalogo/J7CAZPlRs2OD34hQwt89BVIh3hZMX-5D66GjfV5ZZhk.jpg",
        alt: "Juego",
        link: null,
        generos: ["Acción", "Aventura"],
        plataforma: "PlayStation"
    },
    {
        titulo: "RED DEAD REDEMPION II",
        precioTexto: "S/ 204.00",
        imagen: "../../imagen/catalogo/gJJVAws2CFzIkFt2AFK-N9zoSJ6X8O1NIAQB9nFHBzU.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "ELden Ring",
        precioTexto: "S/ 126.00",
        imagen: "../../imagen/catalogo/qx8Tbt_P4s0CUWhUi0zXERfNW1s7_qGS5WbBO_uVudI.jpg",
        alt: "Juego",
        link: null,
        generos: ["RPG", "Aventura"],
        plataforma: "PC"
    },
    {
        titulo: "Dragon ball:sparking zero",
        precioTexto: "S/ 110.00",
        imagen: "../../imagen/catalogo/r1c6snxgJFDmCL5aUd43Wvx95s_tDDc0-HaHArORRpQ.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Resident evil requiem",
        precioTexto: "S/ 134.00",
        imagen: "../../imagen/catalogo/Byh5MPnoJInGirgG_zHK9pSfIFrl0RTDxQbsiXLBLLY.jpg",
        alt: "Juego",
        link: null,
        generos: ["Acción"],
        plataforma: "PC"
    },
    {
        titulo: "Injustice 2",
        precioTexto: "S/ 75.00",
        imagen: "../../imagen/catalogo/bZaKewI.png",
        alt: "Juego",
        link: null,
        generos: ["Acción"],
        plataforma: "PlayStation"
    },
    {
        titulo: "Crimson Desert",
        precioTexto: "S/ 156.00",
        imagen: "../../imagen/catalogo/nNWKg5SRKbooP-Ex5XGAHiQWVYqw3lYN_ckD2xjfMFA.jpg",
        alt: "Juego",
        link: null,
        generos: ["RPG", "Aventura"],
        plataforma: "PC"
    },
    {
        titulo: "Battlefield I",
        precioTexto: "S/ 83.00",
        imagen: "../../imagen/catalogo/ts6ceuy9nu1sgwpeabmo.jpg",
        alt: "Juego",
        link: null,
        generos: ["Shooter"],
        plataforma: "PC"
    },
    {
        titulo: "half life 2",
        precioTexto: "S/ 05.00",
        imagen: "../../imagen/catalogo/L5rAM1Gy-akiniDUpMtk22JJ8fjp07kkDKw2iMcpK34.jpg",
        alt: "Juego",
        link: null,
        generos: ["Shooter"],
        plataforma: "PC"
    },
    {
        titulo: "Horizon Forbidden West",
        precioTexto: "S/ 179.00",
        imagen: "../../imagen/inicio/Call_of_Duty_Infinite_Warfare_cover.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "FIFA 23",
        precioTexto: "S/ 129.00",
        imagen: "../../imagen/inicio/nuvana-games-xbox-series-x-ea-sports-fc-25-standard-edition-nuvanatech-1176216290.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Cyberpunk 2077",
        precioTexto: "S/ 99.00",
        imagen: "../../imagen/inicio/apps.808.14492077886571533.be42f4bd-887b-4430-8ed0-622341b4d2b0.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "The Last of Us Part II",
        precioTexto: "S/ 159.00",
        imagen: "../../imagen/inicio/Grand_Theft_Auto_V.png",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Sekiro: Shadows Die Twice",
        precioTexto: "S/ 89.00",
        imagen: "../../imagen/catalogo/qx8Tbt_P4s0CUWhUi0zXERfNW1s7_qGS5WbBO_uVudI.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Death Stranding",
        precioTexto: "S/ 129.00",
        imagen: "../../imagen/catalogo/gJJVAws2CFzIkFt2AFK-N9zoSJ6X8O1NIAQB9nFHBzU.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Hades",
        precioTexto: "S/ 39.00",
        imagen: "../../imagen/catalogo/HADES.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Stardew Valley",
        precioTexto: "S/ 24.00",
        imagen: "../../imagen/catalogo/ts6ceuy9nu1sgwpeabmo.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Fortnite",
        precioTexto: "S/ 0.00",
        imagen: "../../imagen/catalogo/HCs7H-ouO5ztZr1VHz9vdW95E6C0idGfaupRDgms_0k.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Apex Legends",
        precioTexto: "S/ 0.00",
        imagen: "../../imagen/catalogo/OHwigC91bAhgTtrpogp-KSOfj9XDDBpfzrZ63FCgZ1Y.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Overwatch 2",
        precioTexto: "S/ 0.00",
        imagen: "../../imagen/catalogo/overwatch2.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Doom Eternal",
        precioTexto: "S/ 79.00",
        imagen: "../../imagen/catalogo/J7CAZPlRs2OD34hQwt89BVIh3hZMX-5D66GjfV5ZZhk.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Ori and the Will of the Wisps",
        precioTexto: "S/ 49.00",
        imagen: "../../imagen/catalogo/nNWKg5SRKbooP-Ex5XGAHiQWVYqw3lYN_ckD2xjfMFA.jpg",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Control",
        precioTexto: "S/ 89.00",
        imagen: "../../imagen/catalogo/control.png",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Metro Exodus",
        precioTexto: "S/ 79.00",
        imagen: "../../imagen/catalogo/bZaKewI.png",
        alt: "Juego",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Genshin Impact",
        precioTexto: "gratuito",
        imagen: "../../imagen/catalogo/genshin-impact.jpg",
        alt: "Genshin Impact",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Honkai: Star Rail",
        precioTexto: "S/ 40.00",
        imagen: "../../imagen/catalogo/bZaKewI.png",
        alt: "Honkai: Star Rail",
        link: null,
        generos: [],
        plataforma: ""
    },
    {
        titulo: "Zenless Zone Zero",
        precioTexto: "S/ 50.00",
        imagen: "../../imagen/catalogo/Byh5MPnoJInGirgG_zHK9pSfIFrl0RTDxQbsiXLBLLY.jpg",
        alt: "Zenless Zone Zero",
        link: null,
        generos: [],
        plataforma: ""
    },
];
