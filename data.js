const main_url = 'https://pokeapi.co/api/v2/pokemon/';
let card_number = 0;
let loading_counter = 20 - 1;
let language = 'de';
let img = "";
let id = "";
let designation = [];
let bg_color = "";
let pokemon_main = [];
let typs = [];
let pokemon_species = [];
let pokemon_typ = [];
let pokemon_typs = [];
let not_found = "No translation found";

let language_other_data = [
    {
        "language": "de",
        "loading": "wir geladen",
        "speak": "Sprache",
        "typen": "Typen",
        "de": "Deutsch",
        "en": "Englisch",
        "fr": "Französisch",
        "it": "Italienisch",
        "es": "Spanisch",
        "ja": "Japanisch",
        "brand": "Pokédex",
        "load_more": "Pokémon wurde nicht gefunden. Bitte mehr Laden.",
        "about": "Übersicht",
        "base_stats": "Basisdaten",
        "evolution": "Evolution",
        "species": "Species",
        "height": "Höhe",
        "weight": "Gewicht",
        "abilities": "Fähigkeiten",
        "breeding": "Zucht",
        "gender": "Geschlecht",
        "egg_groups": "Gruppe",
        "egg_cycle": "Lebensraum",
        "hp": "Gesundheit",
        "attack": "Attacke",
        "defense": "Verteidigung",
        "sp_atk": "Sp. Att.",
        "sp_def": "Sp. Ver.",
        "speed": "Geschwindigkeit",
        "total": "Gesamt",
        "fact": "Fakten",
        "evolution_chain": "Evolutionskette",
        "level": "Lvl",
        "not_found" : "nicht gefunden",
        "search": "Suche dein Pokémon",
        "lvl": "Stufe",
        "evo_chain" :"Evolutionskette"
    },
    {
        "language": "en",
        "loading": "is loading",
        "speak": "Language",
        "typen": "Type",
        "de": "German",
        "en": "English",
        "fr": "French",
        "it": "Italian",
        "es": "Spanish",
        "ja": "Japanese",
        "brand": "Pokédex",
        "load_more": "Pokémon was not found. Please load more.",
        "about": "About",
        "base_stats": "Base Stats",
        "evolution": "Evolution",
        "species": "Species",
        "height": "Height",
        "weight": "Weight",
        "abilities": "Abilities",
        "breeding": "Breeding",
        "gender": "Gender",
        "egg_groups": "Egg Groups",
        "egg_cycle": "Egg Cycle",
        "hp": "HP",
        "attack": "Attack",
        "defense": "Defense",
        "sp_atk": "Sp. Atk",
        "sp_def": "Sp. Def",
        "speed": "Speed",
        "total": "Total",
        "fact": "Factual information",
        "not_found" : "Not found",
        "search": "Search your Pokémon",
        "lvl": "Level",
        "evo_chain" :"Evolution chain"
    },
    {
        "language": "fr",
        "loading": "est en cours de chargement",
        "speak": "Langue",
        "typen": "Type",
        "de": "Allemand",
        "en": "Anglais",
        "fr": "Français",
        "it": "Italien",
        "es": "Espagnol",
        "ja": "Japonais",
        "brand": "Pokédex",
        "load_more": "Pokémon n'a pas été trouvé. Veuillez charger davantage.",
        "about": "À propos",
        "base_stats": "Stats de base",
        "evolution": "Évolution",
        "species": "Espèce",
        "height": "Taille",
        "weight": "Poids",
        "abilities": "Capacités",
        "breeding": "Reproduction",
        "gender": "Genre",
        "egg_groups": "Groupes d'œufs",
        "egg_cycle": "Cycle d'œufs",
        "hp": "PV",
        "attack": "Attaque",
        "defense": "Défense",
        "sp_atk": "Atq. Spé.",
        "sp_def": "Déf. Spé.",
        "speed": "Vitesse",
        "total": "Total",
        "fact": "Faits",
        "search": "Cherche ton Pokémon",
        "lvl": "niveau",
        "evo_chain" :"Chaîne d'évolution"
    },
    {
        "language": "it",
        "loading": "sta caricando",
        "speak": "Lingua",
        "typen": "Tipo",
        "de": "Tedesco",
        "en": "Inglese",
        "fr": "Francese",
        "it": "Italiano",
        "es": "Spagnolo",
        "ja": "Giapponese",
        "brand": "Pokédex",
        "load_more": "Pokémon non è stato trovato. Si prega di caricare di più.",
        "about": "Informazioni",
        "base_stats": "Statistiche Base",
        "evolution": "Evoluzione",
        "species": "Specie",
        "height": "Altezza",
        "weight": "Peso",
        "abilities": "Abilità",
        "breeding": "Riproduzione",
        "gender": "Genere",
        "egg_groups": "Gruppi di Uova",
        "egg_cycle": "Ciclo delle Uova",
        "hp": "PS",
        "attack": "Attacco",
        "defense": "Difesa",
        "sp_atk": "Attacco Speciale",
        "sp_def": "Difesa Speciale",
        "speed": "Velocità",
        "total": "Totale",
        "fact": "I fatti",
        "search": "Cerca il tuo Pokémon",
        "lvl": "livello",
        "evo_chain" :"Catena di evoluzione"
    },
    {
        "language": "es",
        "loading": "se está cargando",
        "speak": "Idioma",
        "typen": "Tipo",
        "de": "Alemán",
        "en": "Inglés",
        "fr": "Francés",
        "it": "Italiano",
        "es": "Español",
        "ja": "Japonés",
        "brand": "Pokédex",
        "load_more": "Pokémon no se encontró. Por favor, cargue más.",
        "about": "Acerca de",
        "base_stats": "Estadísticas Base",
        "evolution": "Evolución",
        "species": "Especie",
        "height": "Altura",
        "weight": "Peso",
        "abilities": "Habilidades",
        "breeding": "Reproducción",
        "gender": "Género",
        "egg_groups": "Grupos de Huevo",
        "egg_cycle": "Ciclo de Huevo",
        "hp": "PS",
        "attack": "Ataque",
        "defense": "Defensa",
        "sp_atk": "Ataque Especial",
        "sp_def": "Defensa Especial",
        "speed": "Velocidad",
        "total": "Total",
        "fact": "Hechos",
        "search": "Busca tu Pokémon",
        "lvl": "nivel",
        "evo_chain" :"Cadena de evolución"
    },
    {
        "language": "ja",
        "loading": "読み込み中です",
        "speak": "言語",
        "typen": "タイプ",
        "de": "ドイツ人",
        "en": "英語",
        "fr": "フランス語",
        "it": "イタリアの",
        "es": "スペイン語",
        "ja": "言語",
        "brand": "ポケデックス",
        "load_more": "ポケモンは見つかりませんでした。もう少し読み込んでください。",
        "about": "約",
        "base_stats": "基本ステータス",
        "evolution": "進化",
        "species": "種",
        "height": "身長",
        "weight": "体重",
        "abilities": "特性",
        "breeding": "育成",
        "gender": "性別",
        "egg_groups": "卵グループ",
        "egg_cycle": "卵サイクル",
        "hp": "体力",
        "attack": "攻撃力",
        "defense": "防御力",
        "sp_atk": "特攻",
        "sp_def": "特防",
        "speed": "速さ",
        "total": "合計",
        "fact": "事実",
        "search": "あなたのポケモンを探してください",
        "lvl": "レベル",
        "evo_chain" :"進化の連鎖"
    }
];

