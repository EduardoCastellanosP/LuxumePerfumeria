/**
 * 🧴 CATÁLOGO LUXUME · 55 perfumes
 *
 * CÓMO EDITAR
 *  - price: precio en pesos (ej. 130000). Si lo pones en 0, la web muestra "Consultar precio".
 *  - gender: 'Mujer' | 'Hombre' | 'Unisex'. Los Unisex aparecen en Hombre Y en Mujer.
 *  - line: 'Árabe' | 'Diseñador' | 'Nicho'  → la colección /perfumes/nicho muestra los de línea Nicho.
 *  - featured: true → aparece en "Los más deseados" del inicio (máximo 4).
 *
 * FOTOS
 *  1. Pon las fotos en /fotos con el slug del perfume: khamrah-1.jpg, khamrah-2.jpg
 *  2. Ejecuta `npm run images`
 *  3. En el perfume escribe: images: ['perfumes/khamrah-1', 'perfumes/khamrah-2']
 *  Mientras images esté vacío se muestra una foto de muestra.
 */

export type Gender = 'Hombre' | 'Mujer' | 'Unisex'
export type FamilyGroup = 'Amaderado' | 'Oriental' | 'Floral' | 'Cítrico' | 'Fresco' | 'Dulce'
export type Occasion = 'Día' | 'Noche' | 'Oficina' | 'Cita'
export type Line = 'Árabe' | 'Diseñador' | 'Nicho'

export type Perfume = {
  slug: string
  name: string
  /** Casa / marca de la fragancia */
  brand: string
  type: 'ORIGINAL' | 'INSPIRACIÓN'
  gender: Gender
  line: Line
  family: string
  groups: FamilyGroup[]
  occasions: Occasion[]
  season: string
  sizes: { ml: number; price: number }[]
  images: string[]
  short: string
  description: string
  /** Pirámide (salida/corazón/fondo) o, si no hay, notas principales en "main" */
  notes: { top?: string; heart?: string; base?: string; main?: string }
  featured?: boolean
  inStock?: boolean
}

const U = 'https://images.unsplash.com/photo-'
export const photos = {
  silk: `${U}1518893063132-36e46dbe2428`,
  hero: `${U}1608528577891-eb055944f2e7`,
  noir: `${U}1585218334450-afcf929da36e`,
  black: `${U}1594035910387-fea47794261f`,
  blue: `${U}1615160460366-2c9a41771b51`,
  red: `${U}1720423738890-37689a6f6b95`,
  glass: `${U}1598634222670-87c5f558119c`,
  gold: `${U}1588405748880-12d1d2a59f75`,
}
const sample = [photos.noir, photos.red, photos.black, photos.blue, photos.glass, photos.gold, photos.hero]

type Base = Omit<Perfume, 'sizes' | 'images'> & { ml?: number; price?: number; images?: string[] }
const P = ({ ml = 100, price = 0, images = [], ...p }: Base): Perfume => ({ ...p, sizes: [{ ml, price }], images })

export const perfumes: Perfume[] = [
  // ─────────────── DAMA ───────────────
  P({
    slug: 'eclaire', images: ['perfumes/eclaire-1', 'perfumes/eclaire-2'], price: 130000, name: 'Eclaire', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Mujer', line: 'Árabe',
    family: 'Gourmand dulce', groups: ['Dulce'], occasions: ['Cita', 'Noche'], season: 'Clima fresco',
    short: 'Caramelo, leche y vainilla: un postre cremoso convertido en perfume.',
    description: 'Una fragancia gourmand, dulce y envolvente, con acordes cremosos que recuerdan a un postre de caramelo y vainilla.',
    notes: { top: 'Caramelo · Leche · Azúcar', heart: 'Flores blancas · Miel', base: 'Vainilla · Praliné · Almizcle' },
    featured: true,
  }),
  P({
    slug: 'bharara-rose', images: ['perfumes/bharara-rose-1', 'perfumes/bharara-rose-2'], price: 200000, name: 'Bharara Rose', brand: 'Bharara', type: 'INSPIRACIÓN', gender: 'Mujer', line: 'Nicho',
    family: 'Floral frutal ambarado', groups: ['Floral', 'Dulce'], occasions: ['Cita', 'Noche'], season: 'Todo el año',
    short: 'Rosa, frutos dulces y ámbar con carácter elegante.',
    description: 'Una fragancia femenina de carácter elegante, con un perfil floral y dulce que aporta una sensación sofisticada y envolvente.',
    notes: { main: 'Rosa · Frutos dulces · Almizcle · Ámbar' },
  }),
  P({
    slug: 'valentino-donna', images: ['perfumes/valentino-donna-1', 'perfumes/valentino-donna-2'], price: 130000, name: 'Valentino Donna', brand: 'Valentino', type: 'INSPIRACIÓN', gender: 'Mujer', line: 'Diseñador',
    family: 'Floral oriental amaderado', groups: ['Floral', 'Oriental', 'Amaderado'], occasions: ['Oficina', 'Cita'], season: 'Todo el año',
    short: 'Rosa e iris sobre cuero y vainilla: delicada y sensual.',
    description: 'Un aroma refinado y femenino que combina la delicadeza de las flores con un fondo cálido, elegante y sensual.',
    notes: { top: 'Bergamota', heart: 'Rosa · Iris', base: 'Cuero · Pachulí · Vainilla' },
  }),
  P({
    slug: 'mod-blush', images: ['perfumes/mod-blush-1', 'perfumes/mod-blush-2'], price: 120000, name: 'Mod Blush', brand: 'Ariana Grande', type: 'INSPIRACIÓN', gender: 'Mujer', line: 'Diseñador',
    family: 'Floral frutal gourmand', groups: ['Floral', 'Dulce'], occasions: ['Día', 'Cita'], season: 'Clima cálido',
    short: 'Maracuyá, frambuesa y magnolia: moderna, juvenil y coqueta.',
    description: 'Una fragancia moderna, femenina y juvenil que combina matices frutales con acordes florales y un fondo suave y sensual.',
    notes: { main: 'Maracuyá · Frambuesa · Pera · Magnolia · Almizcle · Maderas suaves' },
  }),
  P({
    slug: 'prada-paradoxe', images: ['perfumes/prada-paradoxe-1', 'perfumes/prada-paradoxe-2'], price: 130000, name: 'Prada Paradoxe', brand: 'Prada', type: 'INSPIRACIÓN', gender: 'Mujer', line: 'Diseñador',
    family: 'Floral ámbar', groups: ['Floral', 'Dulce'], occasions: ['Oficina', 'Cita'], season: 'Todo el año',
    short: 'Flor de azahar y neroli sobre vainilla bourbon y ámbar.',
    description: 'Una fragancia contemporánea que combina flores blancas y cítricos luminosos con un fondo cálido, dulce y elegante.',
    notes: { top: 'Pera · Mandarina · Bergamota', heart: 'Flor de azahar · Jazmín · Neroli', base: 'Vainilla bourbon · Ámbar · Benjuí · Almizcle blanco' },
  }),
  P({
    slug: 'escada-sorbetto-rosso', images: ['perfumes/escada-sorbetto-rosso-1', 'perfumes/escada-sorbetto-rosso-2'], price: 120000, name: 'Escada Sorbetto Rosso', brand: 'Escada', type: 'INSPIRACIÓN', gender: 'Mujer', line: 'Diseñador',
    family: 'Frutal acuático', groups: ['Fresco', 'Dulce'], occasions: ['Día'], season: 'Clima cálido',
    short: 'Sandía jugosa y brisa marina: fresca, ligera y alegre.',
    description: 'Un aroma fresco y veraniego que evoca la sandía, las frutas jugosas y la brisa marina. Ideal para quienes prefieren fragancias ligeras y alegres.',
    notes: { top: 'Pera · Calone · Cítricos', heart: 'Sandía · Notas acuáticas', base: 'Praliné · Ámbar · Almizcle' },
  }),

  // ─────────────── CABALLERO ───────────────
  P({
    slug: 'asad', images: ['perfumes/asad-1', 'perfumes/asad-2'], price: 120000, name: 'Asad', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Ámbar especiado amaderado', groups: ['Oriental', 'Amaderado'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Pimienta negra, tabaco y café sobre vainilla y ámbar.',
    description: 'Un perfume intenso y cálido, con especias y acordes amaderados que crean una presencia elegante y marcada.',
    notes: { top: 'Pimienta negra · Piña · Tabaco', heart: 'Café · Pachulí · Iris', base: 'Vainilla · Ámbar · Maderas secas · Benjuí' },
  }),
  P({
    slug: 'bharara-king', images: ['perfumes/bharara-king-1', 'perfumes/bharara-king-2'], price: 150000, name: 'Bharara King', brand: 'Bharara', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Nicho',
    family: 'Cítrico frutal ambarado', groups: ['Cítrico', 'Dulce'], occasions: ['Día', 'Cita'], season: 'Todo el año',
    short: 'Cítricos vibrantes con un fondo dulce y duradero.',
    description: 'Una fragancia llamativa que combina cítricos vibrantes con un corazón frutal y un fondo cálido, dulce y duradero.',
    notes: { top: 'Naranja · Limón · Bergamota', heart: 'Acordes frutales', base: 'Vainilla · Almizcle blanco · Ámbar' },
  }),
  P({
    slug: 'odyssey-mandarin-sky', price: 120000, images: ['perfumes/odyssey-mandarin-sky-1', 'perfumes/odyssey-mandarin-sky-2'], name: 'Odyssey Mandarin Sky', brand: 'Armaf', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Cítrico dulce amaderado', groups: ['Cítrico', 'Dulce', 'Amaderado'], occasions: ['Día', 'Cita'], season: 'Todo el año',
    short: 'Mandarina jugosa y caramelo sobre una base amaderada.',
    description: 'Una mezcla de cítricos jugosos y caramelo sobre una base amaderada. Dulce, moderna y con personalidad.',
    notes: { top: 'Mandarina · Naranja · Azafrán · Salvia', heart: 'Caramelo · Haba tonka · Tagete', base: 'Ambroxan · Cedro · Vetiver' },
  }),
  P({
    slug: 'valentino-uomo', images: ['perfumes/valentino-uomo-1', 'perfumes/valentino-uomo-2'], price: 150000, name: 'Valentino Uomo', brand: 'Valentino', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Diseñador',
    family: 'Fresco amaderado especiado', groups: ['Fresco', 'Amaderado'], occasions: ['Día', 'Oficina'], season: 'Todo el año',
    short: 'Fresca, limpia y masculina, con salvia, jengibre y vetiver.',
    description: 'Una combinación fresca, amaderada y ligeramente especiada con un toque moderno y juvenil. Abre limpia y vibrante, se vuelve aromática con salvia y jengibre, y termina con una estela cálida y elegante.',
    notes: { top: 'Notas minerales · Hojas de violeta · Sal', heart: 'Salvia · Jengibre', base: 'Maderas · Vetiver' },
  }),
  P({
    slug: 'hawas-for-him', price: 150000, images: ['perfumes/hawas-for-him-1', 'perfumes/hawas-for-him-2'], name: 'Hawas for Him', brand: 'Rasasi', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Fresco frutal especiado', groups: ['Fresco', 'Dulce'], occasions: ['Día', 'Cita'], season: 'Clima cálido',
    short: 'Manzana, ciruela y canela con alta potencia y duración.',
    description: 'Un perfume fresco, frutal, dulce y especiado, con alta potencia y duración. Abre con una explosión jugosa de manzana y cítricos, evoluciona con ciruela y cardamomo, y seca en un fondo cálido, almizclado y ligeramente salino.',
    notes: { top: 'Manzana · Bergamota · Limón · Canela', heart: 'Acordes acuosos · Ciruela · Flor de azahar · Cardamomo', base: 'Ámbar gris · Almizcle · Pachulí · Madera flotante' },
  }),
  P({
    slug: 'odyssey-mega', price: 120000, images: ['perfumes/odyssey-mega-1', 'perfumes/odyssey-mega-2'], name: 'Odyssey Mega', brand: 'Armaf', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Cítrico aromático', groups: ['Cítrico', 'Fresco'], occasions: ['Día', 'Oficina'], season: 'Clima cálido',
    short: 'Limón, jengibre y menta: fresca, limpia y vibrante.',
    description: 'Una fragancia fresca, vibrante y limpia, con un toque especiado y frutal. Abre muy cítrica con jengibre y menta, gira hacia piña y salvia, y termina en un acabado cálido de cedro y vetiver, elegante y masculino.',
    notes: { top: 'Limón · Bergamota · Naranja · Jengibre · Menta', heart: 'Piña · Salvia · Enebro · Geranio', base: 'Cedro · Vetiver · Almizcle · Haba tonka' },
  }),
  P({
    slug: 'odyssey-aoud', price: 120000, images: ['perfumes/odyssey-aoud-1', 'perfumes/odyssey-aoud-2'], name: 'Odyssey Aoud', brand: 'Armaf', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Amaderado oriental especiado', groups: ['Amaderado', 'Oriental'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Oud, azafrán y nuez moscada con estela varonil.',
    description: 'Una fragancia de inspiración oriental, con matices amaderados intensos y una presencia sofisticada. Abre especiada y aromática, se profundiza con madera de oud y deja una estela duradera y almizclada.',
    notes: { top: 'Azafrán · Nuez moscada · Lavanda', heart: 'Madera de oud · Notas amaderadas', base: 'Pachulí · Ambroxan · Almizcle' },
  }),
  P({
    slug: 'hawas-ice', price: 150000, images: ['perfumes/hawas-ice-1', 'perfumes/hawas-ice-2'], name: 'Hawas Ice', brand: 'Rasasi', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Fresco frutal aromático', groups: ['Fresco', 'Cítrico'], occasions: ['Día', 'Oficina'], season: 'Clima cálido',
    short: 'Manzana, limón italiano y anís: refrescante y energética.',
    description: 'Una fragancia refrescante y energética que combina frutas y cítricos con un fondo limpio y amaderado.',
    notes: { top: 'Manzana · Limón italiano · Bergamota · Anís estrellado', heart: 'Ciruela · Cardamomo · Flor de azahar', base: 'Almizcle · Ámbar · Musgo · Maderas' },
  }),
  P({
    slug: 'club-de-nuit-intense-man', images: ['perfumes/club-de-nuit-intense-man-1', 'perfumes/club-de-nuit-intense-man-2'], price: 150000, name: 'Club de Nuit Intense Man', brand: 'Armaf', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Frutal cítrico ahumado', groups: ['Cítrico', 'Amaderado'], occasions: ['Noche', 'Oficina', 'Cita'], season: 'Todo el año',
    short: 'Piña, limón y abedul ahumado: intenso y de carácter.',
    description: 'Un perfume de carácter intenso que combina una salida cítrica y frutal con matices ahumados y un fondo amaderado.',
    notes: { top: 'Limón · Piña · Bergamota · Grosella negra · Manzana', heart: 'Abedul · Jazmín · Rosa', base: 'Almizcle · Ámbar gris · Pachulí · Vainilla' },
    featured: true,
  }),
  P({
    slug: 'hawas-fire', price: 150000, images: ['perfumes/hawas-fire-1', 'perfumes/hawas-fire-2'], name: 'Hawas Fire', brand: 'Rasasi', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Aromático marino ambarado', groups: ['Fresco', 'Oriental'], occasions: ['Noche', 'Cita'], season: 'Todo el año',
    short: 'Salvia, notas marinas y ámbar gris de carácter intenso.',
    description: 'Una fragancia masculina con un perfil aromático y marino, acompañada de un fondo ambarado de carácter intenso.',
    notes: { top: 'Salvia esclarea', heart: 'Jazmín egipcio · Notas marinas', base: 'Ámbar gris · Ámbar · Notas minerales' },
  }),

  // ─────────────── UNISEX (aparecen en Hombre y en Mujer) ───────────────
    P({
    slug: 'hawas-kobra', images: ['perfumes/hawas-kobra-1', 'perfumes/hawas-kobra-2'], price: 260000, name: 'Hawas Kobra', brand: 'Rasasi', type: 'ORIGINAL', gender: 'Hombre', line: 'Árabe',
    family: 'Oriental amaderado cítrico', groups: ['Cítrico', 'Amaderado', 'Fresco'], occasions: ['Día', 'Oficina', 'Cita'], season: 'Todo el año',
    short: 'Jengibre, mandarina y té verde sobre ámbar: fresco con carácter.',
    description: 'La nueva joya de la línea Hawas: abre eléctrica con jengibre, bergamota y mandarina, pasa a un corazón refinado de canela, neroli y té verde, y se asienta en un fondo cálido de ámbar, almizcle y maderas.',
    notes: { top: 'Jengibre · Bergamota · Mandarina', heart: 'Canela · Neroli · Té verde', base: 'Ámbar · Almizcle · Maderas' },
  }),
  P({
    slug: 'erba-gold', images: ['perfumes/erba-gold-1', 'perfumes/erba-gold-2'], price: 150000, name: 'Erba Gold', brand: 'Xerjoff', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Nicho',
    family: 'Cítrico frutal ambarado', groups: ['Cítrico', 'Dulce'], occasions: ['Día', 'Oficina', 'Cita'], season: 'Todo el año',
    short: 'Cítricos de Sicilia y frutas mediterráneas con vainilla.',
    description: 'Una fragancia luminosa y sofisticada que mezcla cítricos y frutas con un fondo dulce, suave y elegante.',
    notes: { top: 'Naranja · Limón de Sicilia · Bergamota de Calabria', heart: 'Frutas mediterráneas', base: 'Almizcle blanco · Vainilla de Madagascar · Ámbar' },
  }),
  P({
    slug: 'beach-party', images: ['perfumes/beach-party-1', 'perfumes/beach-party-2'], price: 130000, name: 'Beach Party', brand: 'Armaf', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Fresco cítrico acuático', groups: ['Fresco', 'Cítrico'], occasions: ['Día'], season: 'Clima cálido',
    short: 'Brisa de mar y cítricos tropicales: ligera y vibrante.',
    description: 'Un aroma fresco y veraniego que evoca la brisa del mar y un ambiente tropical, ideal para quienes prefieren perfumes ligeros y vibrantes.',
    notes: { main: 'Cítricos · Acordes marinos · Matices tropicales' },
  }),
  P({
    slug: '9pm-elixir', images: ['perfumes/9pm-elixir-1', 'perfumes/9pm-elixir-2'], price: 120000, name: '9PM Elixir', brand: 'Afnan', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Especiado ambarado dulce', groups: ['Oriental', 'Dulce'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Especias, cuero y vainilla: intensa y envolvente.',
    description: 'Una fragancia intensa y envolvente que combina especias y cuero con un fondo cálido, dulce y ambarado.',
    notes: { top: 'Nuez moscada · Elemí · Cardamomo', heart: 'Pimienta de Jamaica · Lavandín · Cuero', base: 'Jara · Ládano · Pachulí · Vainilla' },
  }),
  P({
    slug: 'ajwad', images: ['perfumes/ajwad-1', 'perfumes/ajwad-2', 'perfumes/ajwad-3'], price: 200000, name: 'Ajwad', brand: 'Lattafa', type: 'ORIGINAL', gender: 'Unisex', line: 'Árabe', ml: 60,
    family: 'Frutal floral amaderado', groups: ['Floral', 'Dulce', 'Amaderado'], occasions: ['Día', 'Oficina', 'Cita'], season: 'Todo el año',
    short: 'Original de Lattafa: frutas, rosa y jazmín sobre cedro.',
    description: 'Una fragancia equilibrada que mezcla matices frutales y florales con un fondo cálido y amaderado, ideal para quienes buscan un aroma versátil.',
    notes: { main: 'Frutas · Rosa · Jazmín · Vainilla · Almizcle · Ámbar · Cedro' },
  }),
  P({
    slug: '9pm-rebel', images: ['perfumes/9pm-rebel-1', 'perfumes/9pm-rebel-2'], price: 130000, name: '9PM Rebel', brand: 'Afnan', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Frutal amaderado ambarado', groups: ['Dulce', 'Amaderado'], occasions: ['Día', 'Noche'], season: 'Todo el año',
    short: 'Piña y manzana verde que evolucionan a caramelo y maderas.',
    description: 'Una combinación frutal y fresca que evoluciona hacia notas dulces y amaderadas, con un carácter moderno y versátil.',
    notes: { top: 'Mandarina · Piña · Manzana verde', heart: 'Cedro · Musgo de roble · Vainilla', base: 'Caramelo · Maderas secas · Ámbar gris · Almizcle' },
  }),
  P({
    slug: 'afeef', images: ['perfumes/afeef-1', 'perfumes/afeef-2'], price: 200000, name: 'Afeef', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Floral frutal amaderado', groups: ['Floral', 'Amaderado'], occasions: ['Oficina', 'Cita'], season: 'Todo el año',
    short: 'Durazno, flores blancas y sándalo: cremosa y sofisticada.',
    description: 'Una fragancia elegante que combina frutas suaves y flores blancas con un fondo cálido, cremoso y sofisticado.',
    notes: { top: 'Bergamota · Pimienta rosa · Durazno', heart: 'Jazmín · Flor de azahar · Tuberosa', base: 'Sándalo · Ámbar · Praliné · Pachulí' },
  }),
  P({
    slug: 'arabians-tonka', images: ['perfumes/arabians-tonka-1', 'perfumes/arabians-tonka-2'], price: 120000, name: 'Arabians Tonka', brand: 'Montale', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Nicho',
    family: 'Oriental amaderado especiado', groups: ['Oriental', 'Amaderado', 'Dulce'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Rosa de Bulgaria, oud y haba tonka: opulenta y profunda.',
    description: 'Una fragancia intensa y opulenta que combina especias, rosa y oud con un fondo dulce, ambarado y profundo.',
    notes: { top: 'Bergamota · Azafrán', heart: 'Rosa de Bulgaria · Oud', base: 'Haba tonka · Ámbar · Musgo de roble · Cuero · Azúcar · Almizcle blanco' },
  }),
  P({
    slug: 'starry-nights', images: ['perfumes/starry-nights-1', 'perfumes/starry-nights-2'], price: 120000, name: 'Starry Nights', brand: 'Montale', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Nicho',
    family: 'Floral cítrico ambarado', groups: ['Floral', 'Cítrico'], occasions: ['Noche', 'Cita'], season: 'Todo el año',
    short: 'Bergamota, rosa y jazmín para ocasiones especiales.',
    description: 'Una fragancia elegante que combina frescura cítrica y flores con un fondo cálido y sensual, ideal para ocasiones especiales.',
    notes: { main: 'Bergamota · Manzana · Rosa · Jazmín · Pachulí · Ámbar · Almizcle' },
  }),
  P({
    slug: 'khamrah-qahwa', price: 130000, images: ['perfumes/khamrah-qahwa-1', 'perfumes/khamrah-qahwa-2', 'perfumes/khamrah-qahwa-3'], name: 'Khamrah Qahwa', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Gourmand especiado', groups: ['Dulce', 'Oriental'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Café, canela y praliné: cálida y adictiva.',
    description: 'Una fragancia cálida y adictiva que combina especias, dulzura gourmand y café, dejando una sensación intensa y acogedora.',
    notes: { top: 'Canela · Cardamomo · Jengibre', heart: 'Praliné · Frutas confitadas · Flores blancas', base: 'Café · Vainilla · Haba tonka · Benjuí · Almizcle' },
  }),
  P({
    slug: 'khamrah', price: 130000, images: ['perfumes/khamrah-1', 'perfumes/khamrah-2', 'perfumes/khamrah-3'], name: 'Khamrah', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Gourmand especiado dulce', groups: ['Dulce', 'Oriental'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Dátiles, praliné y canela: el gourmand árabe más deseado.',
    description: 'Un perfume dulce y especiado con matices de frutas, praliné y vainilla, ideal para quienes prefieren aromas cálidos y envolventes.',
    notes: { top: 'Canela · Nuez moscada · Bergamota', heart: 'Dátiles · Praliné · Tuberosa · Mahonial', base: 'Vainilla · Haba tonka · Ámbar · Mirra · Benjuí' },
    featured: true,
  }),
  P({
    slug: 'khamrah-dukhan', price: 130000, images: ['perfumes/khamrah-dukhan-1', 'perfumes/khamrah-dukhan-2', 'perfumes/khamrah-dukhan-3'], name: 'Khamrah Dukhan', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Ahumado especiado', groups: ['Oriental', 'Amaderado'], occasions: ['Noche'], season: 'Clima fresco',
    short: 'Incienso, tabaco y especias ahumadas sobre praliné.',
    description: 'Una fragancia profunda que mezcla especias, incienso y notas ahumadas con un fondo dulce y ambarado. De carácter intenso, más inclinada a lo masculino.',
    notes: { top: 'Mandarina · Pimienta de Jamaica · Especias ahumadas', heart: 'Jara · Flor de azahar · Incienso · Pachulí', base: 'Tabaco · Ámbar · Haba tonka · Benjuí · Praliné' },
  }),
  P({
    slug: 'amber-oud-aqua-dubai', images: ['perfumes/amber-oud-aqua-dubai-1', 'perfumes/amber-oud-aqua-dubai-2'], price: 140000, name: 'Amber Oud Aqua Dubai', brand: 'Al Haramain', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Cítrico aromático amaderado', groups: ['Cítrico', 'Fresco', 'Amaderado'], occasions: ['Día', 'Oficina'], season: 'Clima cálido',
    short: 'Bergamota y notas verdes sobre ámbar: limpia y moderna.',
    description: 'Una fragancia fresca y elegante que combina notas cítricas y aromáticas con un fondo amaderado, ideal para quienes prefieren aromas limpios y modernos.',
    notes: { main: 'Bergamota · Mandarina · Notas verdes · Acordes aromáticos · Ámbar · Maderas' },
  }),
  P({
    slug: 'erba-pura', images: ['perfumes/erba-pura-1', 'perfumes/erba-pura-2'], price: 150000, name: 'Erba Pura', brand: 'Xerjoff', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Nicho',
    family: 'Cítrico frutal almizclado', groups: ['Cítrico', 'Dulce'], occasions: ['Día', 'Oficina', 'Cita'], season: 'Todo el año',
    short: 'Frutas jugosas y cítricos de Sicilia con almizcle blanco.',
    description: 'Una fragancia vibrante y sofisticada que destaca por sus frutas jugosas y cítricos, acompañados de un fondo dulce y almizclado.',
    notes: { top: 'Naranja de Sicilia · Bergamota de Calabria · Limón', heart: 'Frutas mediterráneas', base: 'Almizcle blanco · Ámbar · Vainilla de Madagascar' },
    featured: true,
  }),
  P({
    slug: 'club-de-nuit-untold', images: ['perfumes/club-de-nuit-untold-1', 'perfumes/club-de-nuit-untold-2'], price: 130000, name: 'Club de Nuit Untold', brand: 'Armaf', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Ambarado floral amaderado', groups: ['Oriental', 'Floral', 'Amaderado'], occasions: ['Noche', 'Cita'], season: 'Todo el año',
    short: 'Azafrán, jazmín y madera ambarada: sofisticada y profunda.',
    description: 'Una fragancia sofisticada con acordes ambarados y florales, acompañados de maderas que aportan profundidad y elegancia.',
    notes: { top: 'Azafrán · Jazmín', heart: 'Madera ambarada · Ámbar gris', base: 'Resina de abeto · Cedro' },
  }),
  P({
    slug: '9pm-night-out', images: ['perfumes/9pm-night-out-1', 'perfumes/9pm-night-out-2'], price: 150000, name: '9PM Night Out', brand: 'Afnan', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Frutal especiado dulce', groups: ['Dulce', 'Amaderado'], occasions: ['Noche', 'Cita'], season: 'Todo el año',
    short: 'Pitahaya, coñac y toffee para la noche.',
    description: 'Una fragancia moderna para quienes disfrutan los aromas frutales y cálidos, con matices de coñac, toffee y maderas. Ideal para la noche y ocasiones especiales.',
    notes: { top: 'Pitahaya · Lavanda · Coñac · Manzana · Bergamota', heart: 'Toffee · Gamuza · Cardamomo · Cedro · Mahonial', base: 'Haba tonka · Akigalawood · Ambrofix · Pachulí' },
  }),
  P({
    slug: 'club-de-nuit-oud', images: ['perfumes/club-de-nuit-oud-1', 'perfumes/club-de-nuit-oud-2'], price: 130000, name: 'Club de Nuit Oud', brand: 'Armaf', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Amaderado especiado oriental', groups: ['Amaderado', 'Oriental', 'Dulce'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Frutas jugosas que se funden con oud camboyano y vainilla.',
    description: 'Un aroma profundo y elegante, pensado para quienes prefieren perfumes con carácter amaderado y un estilo distintivo. Abre muy frutal y jugoso, y seca cálido y exótico con oud camboyano.',
    notes: { top: 'Durazno · Maracuyá · Pera · Piña · Ciruela · Bergamota', heart: 'Jazmín · Madera de cachemira · Fresia · Hojas de violeta', base: 'Oud camboyano · Vainilla · Almizcle · Ámbar cristalino' },
  }),
  P({
    slug: 'art-of-universe', images: ['perfumes/art-of-universe-1', 'perfumes/art-of-universe-2'], price: 150000, name: 'Art of Universe', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Aromático cítrico amaderado', groups: ['Cítrico', 'Fresco', 'Amaderado'], occasions: ['Día', 'Oficina'], season: 'Todo el año',
    short: 'Mandarina, menta y pera: limpia, energizante y contemporánea.',
    description: 'Un aroma limpio y energizante, con un dulzor frutal equilibrado por la frescura de los cítricos y un fondo amaderado y almizclado. Muy contemporáneo.',
    notes: { top: 'Mandarina · Bergamota · Jengibre · Menta', heart: 'Pera · Flor de azahar', base: 'Almizcle · Ámbar · Cedro' },
  }),
  P({
    slug: 'al-nashama', images: ['perfumes/al-nashama-1', 'perfumes/al-nashama-2', 'perfumes/al-nashama-3'], price: 200000, name: 'Al Nashama', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Frutal especiado amaderado', groups: ['Dulce', 'Amaderado'], occasions: ['Oficina', 'Cita', 'Noche'], season: 'Todo el año',
    short: 'Ciruela madura, pimienta y cuero saffiano: muy elegante.',
    description: 'Un aroma afrutado, dulce, especiado y amaderado, muy elegante. La ciruela es la protagonista, acompañada de pimienta y jazmín, sobre un fondo lujoso de cuero, ámbar y pachulí.',
    notes: { top: 'Salvia · Pimienta rosa · Bergamota', heart: 'Ciruela · Pimienta negra · Jazmín', base: 'Cuero saffiano · Ámbar · Pachulí · Musgo' },
  }),
  P({
    slug: 'fakhar-gold', images: ['perfumes/fakhar-gold-1', 'perfumes/fakhar-gold-2'], price: 140000, name: 'Fakhar Gold', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Aromático especiado amaderado', groups: ['Amaderado', 'Dulce'], occasions: ['Día', 'Cita'], season: 'Clima cálido',
    short: 'Solar y especiada, con un cuero suave: dulce sin empalagar.',
    description: 'Un aroma dulce pero no empalagoso, con un carácter solar y ligeramente amaderado-ambarado que recuerda a un bronceador elegante, combinado con especias y un cuero muy suave.',
    notes: { top: 'Toronja · Pimienta rosa · Cardamomo', heart: 'Notas solares · Abrótano · Ámbar · Cachemira · Haba tonka', base: 'Cuero · Ámbar · Ládano · Cedro · Vetiver' },
  }),
  P({
    slug: 'mallow-madness', images: ['perfumes/mallow-madness-1', 'perfumes/mallow-madness-2', 'perfumes/mallow-madness-3'], price: 150000, name: 'Mallow Madness', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Mujer', line: 'Árabe', ml: 75,
    family: 'Gourmand frutal', groups: ['Dulce'], occasions: ['Día', 'Cita'], season: 'Todo el año',
    short: 'Fresa, frambuesa y malvavisco: dulce, cremosa y delicada.',
    description: 'Una fragancia dulce, frutal y cremosa que combina frutos rojos con un fondo suave de vainilla y almizcle. Ideal para quienes disfrutan los aromas dulces y delicados.',
    notes: { top: 'Fresa · Frambuesa', heart: 'Malvavisco · Fresia', base: 'Vainilla · Crema · Almizcle' },
  }),
  // ─────────────── NUEVOS (nov 2026) ───────────────
  P({
    slug: 'sweet-tooth', images: ['perfumes/sweet-tooth-1', 'perfumes/sweet-tooth-2', 'perfumes/sweet-tooth-3'], price: 130000, name: 'Sweet Tooth', brand: 'Sabrina Carpenter', type: 'INSPIRACIÓN', gender: 'Mujer', line: 'Diseñador',
    family: 'Gourmand avainillado', groups: ['Dulce'], occasions: ['Día', 'Cita'], season: 'Todo el año',
    short: 'Vainilla, chocolate y malvavisco: un postre dulce y divertido.',
    description: 'Una fragancia dulce, cremosa y divertida que recuerda a un postre de vainilla, chocolate y malvaviscos. Su aroma gourmand transmite una sensación acogedora y juvenil, ideal para quienes aman los perfumes dulces, suaves y deliciosos.',
    notes: { top: 'Bergamota · Jengibre confitado · Malvavisco de chocolate', heart: 'Jazmín · Leche de coco · Vainilla de Madagascar', base: 'Madera de cachemira · Crema Chantilly · Almizcles azucarados' },
  }),
  P({
    slug: 'sehr', images: ['perfumes/sehr-1', 'perfumes/sehr-2'], price: 150000, name: 'Sehr', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Unisex', line: 'Árabe',
    family: 'Ámbar avainillado especiado', groups: ['Oriental', 'Dulce'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Canela, almendra y vainilla absoluta: envolvente y sensual.',
    description: 'Una fragancia envolvente y sensual que combina el toque especiado de la canela y la almendra con un corazón floral y una base cremosa de vainilla, ámbar y tonka. Su perfil cálido y dulce es una excelente opción para quienes disfrutan los aromas intensos y elegantes.',
    notes: { top: 'Canela · Almendra amarga', heart: 'Jazmín · Pomarose · Akigalawood', base: 'Vainilla absoluta · Ámbar · Haba tonka' },
  }),
  P({
    slug: 'pisa', images: ['perfumes/pisa-1', 'perfumes/pisa-2'], price: 180000, name: 'Pisa', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Aromático cítrico amaderado', groups: ['Cítrico', 'Amaderado', 'Fresco'], occasions: ['Día', 'Oficina'], season: 'Clima cálido',
    short: 'Mandarina, limón y cedro: limpia, moderna y versátil.',
    description: 'Una fragancia fresca, cítrica y elegante que combina la energía de los cítricos con la calidez de las maderas y el ámbar. Ideal para hombres que buscan un aroma limpio, moderno y versátil, perfecto para el día a día, la oficina y los climas cálidos.',
    notes: { top: 'Mandarina · Bergamota · Limón', heart: 'Cedro', base: 'Sándalo · Ámbar' },
  }),
  P({
    slug: 'his-confession', images: ['perfumes/his-confession-1', 'perfumes/his-confession-2'], price: 150000, name: 'His Confession', brand: 'Lattafa', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Amaderado ambarado especiado', groups: ['Amaderado', 'Oriental', 'Dulce'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Canela, iris e incienso sobre vainilla y ámbar.',
    description: 'Una composición masculina cálida y elegante que mezcla especias, notas aromáticas y maderas con un fondo dulce de vainilla y ámbar. Ideal para quienes prefieren aromas sofisticados, con personalidad y un carácter especial para la tarde y la noche.',
    notes: { top: 'Mandarina · Canela · Lavanda', heart: 'Iris · Ciprés · Benjuí · Mahonial', base: 'Vainilla · Haba tonka · Pachulí · Cedro · Incienso · Ámbar' },
  }),
  P({
    slug: 'supremacy-collectors-edition', images: ['perfumes/supremacy-collectors-edition-1', 'perfumes/supremacy-collectors-edition-2'], price: 150000, name: "Supremacy Collector's Edition", brand: 'Afnan', type: 'INSPIRACIÓN', gender: 'Hombre', line: 'Árabe',
    family: 'Frutal amaderado ambarado', groups: ['Amaderado', 'Cítrico'], occasions: ['Noche', 'Cita'], season: 'Todo el año',
    short: 'Piña, abedul y ámbar gris para destacar de noche.',
    description: 'Una fragancia masculina sofisticada que combina la frescura de las frutas con notas amaderadas y un fondo ambarado. Su aroma elegante y envolvente es ideal para quienes buscan destacar tanto en ocasiones especiales como en salidas nocturnas.',
    notes: { top: 'Piña · Bergamota · Manzana · Flores blancas', heart: 'Flor de azahar · Abedul · Ámbar', base: 'Musgo de roble · Almizcle · Ámbar gris' },
  }),

  // ─────────────── ORIGINALES NUEVOS (nov 2026) ───────────────
  P({
    slug: 'vulcan-feu', images: ['perfumes/vulcan-feu-1', 'perfumes/vulcan-feu-2'], price: 260000, name: 'Vulcan Feu', brand: 'French Avenue', type: 'ORIGINAL', gender: 'Unisex', line: 'Árabe',
    family: 'Frutal amaderado ambarado', groups: ['Dulce', 'Amaderado', 'Cítrico'], occasions: ['Día', 'Cita', 'Noche'], season: 'Todo el año',
    short: 'Mango, jengibre y oud: una explosión tropical con fondo cálido.',
    description: 'Una fragancia intensa y magnética que abre con una explosión jugosa de mango, limón y frutos rojos, avanza hacia un corazón floral y amaderado, y termina en un fondo cálido de oud, ámbar y almizcle. Llamativa, duradera y con mucha personalidad.',
    notes: { top: 'Mango · Jengibre · Limón · Frutos rojos', heart: 'Cumarina · Jazmín · Cedro', base: 'Almizcle · Ámbar · Oud · Cipriol' },
  }),
  P({
    slug: 'liquid-brun', images: ['perfumes/liquid-brun-1', 'perfumes/liquid-brun-2'], price: 250000, name: 'Liquid Brun', brand: 'French Avenue', type: 'ORIGINAL', gender: 'Hombre', line: 'Árabe',
    family: 'Ámbar gourmand especiado', groups: ['Dulce', 'Oriental', 'Amaderado'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Canela, vainilla bourbon y praliné: cálido, dulce y elegante.',
    description: 'Un perfume masculino cálido y sofisticado: la canela y el cardamomo abren paso a un corazón cremoso de vainilla bourbon y elemí, que se asienta sobre praliné, maderas de guayaco y ambroxan. Ideal para la noche y los climas frescos.',
    notes: { top: 'Canela · Cardamomo · Flor de azahar · Bergamota', heart: 'Vainilla bourbon · Elemí', base: 'Praliné · Ambroxan · Almizcle · Madera de guayaco' },
  }),
  P({
    slug: 'nitro-red', images: ['perfumes/nitro-red-1', 'perfumes/nitro-red-2'], price: 220000, name: 'Nitro Red', brand: 'Dumont', type: 'ORIGINAL', gender: 'Hombre', line: 'Árabe',
    family: 'Aromático frutal', groups: ['Fresco', 'Dulce', 'Amaderado'], occasions: ['Día', 'Cita'], season: 'Todo el año',
    short: 'Manzana, lavanda y sandía sobre ámbar y sándalo.',
    description: 'Una fragancia masculina vibrante y versátil: manzana jugosa, lavanda y bergamota en la salida, un corazón fresco de sandía y cedro, y un fondo cálido de ámbar, sándalo y pachulí que deja una estela muy agradable.',
    notes: { top: 'Manzana · Lavanda · Bergamota', heart: 'Sandía · Cedro · Cálamo', base: 'Ámbar · Sándalo · Pachulí' },
  }),
  P({
    slug: 'asad-bourbon', images: ['perfumes/asad-bourbon-1', 'perfumes/asad-bourbon-2'], price: 220000, name: 'Asad Bourbon', brand: 'Lattafa', type: 'ORIGINAL', gender: 'Hombre', line: 'Árabe',
    family: 'Oriental especiado gourmand', groups: ['Oriental', 'Dulce', 'Amaderado'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Cacao, nuez moscada y vainilla bourbon: la versión más golosa de Asad.',
    description: 'El tercer capítulo de la línea Asad: abre con pimienta rosa, lavanda y ciruela mirabel, se vuelve cálido con cacao, nuez moscada y davana, y termina en un fondo suave de vainilla bourbon, ámbar y vetiver. Elegante, dulce y muy duradero.',
    notes: { top: 'Pimienta rosa · Lavanda · Ciruela mirabel', heart: 'Cacao · Nuez moscada · Davana', base: 'Vainilla bourbon · Ámbar · Vetiver' },
  }),
  P({
    slug: 'odyssey-aqua', images: ['perfumes/odyssey-aqua-1', 'perfumes/odyssey-aqua-2'], price: 230000, name: 'Odyssey Aqua', brand: 'Armaf', type: 'ORIGINAL', gender: 'Hombre', line: 'Árabe',
    family: 'Aromático cítrico fresco', groups: ['Fresco', 'Cítrico'], occasions: ['Día', 'Oficina'], season: 'Clima cálido',
    short: 'Toronja, menta y lavanda: fresco, limpio y deportivo.',
    description: 'Una fragancia fresca y verde para el día a día: toronja, naranja y artemisa en la salida, un corazón refrescante de menta y lavanda, y un fondo seco y elegante de ambroxan, ciprés y pachulí. Perfecto para el calor y la oficina.',
    notes: { top: 'Toronja · Naranja · Artemisa', heart: 'Menta · Lavanda', base: 'Ambroxan · Ciprés · Pachulí' },
  }),
  P({
    slug: 'rave-now-pink', images: ['perfumes/rave-now-pink-1', 'perfumes/rave-now-pink-2'], price: 200000, name: 'Rave Now Pink', brand: 'Lattafa', type: 'ORIGINAL', gender: 'Mujer', line: 'Árabe',
    family: 'Frutal floral gourmand', groups: ['Dulce', 'Floral'], occasions: ['Día', 'Cita'], season: 'Todo el año',
    short: 'Frutos rojos, malvavisco y vainilla: dulce, alegre y femenino.',
    description: 'Una fragancia femenina, juguetona y dulce de la línea Rave de Lattafa: frutos rojos y naranja en la salida, un corazón suave de malvavisco, lirio del valle y jazmín, y un fondo cálido de vainilla, musgo y almizcle.',
    notes: { top: 'Frutos rojos · Naranja', heart: 'Malvavisco · Lirio del valle · Jazmín', base: 'Vainilla · Musgo · Almizcle' },
  }),
  P({
    slug: 'club-de-nuit-woman', images: ['perfumes/club-de-nuit-woman-1', 'perfumes/club-de-nuit-woman-2'], price: 210000, name: 'Club de Nuit Woman', brand: 'Armaf', type: 'ORIGINAL', gender: 'Mujer', line: 'Árabe', ml: 105,
    family: 'Floral frutal chipre', groups: ['Floral', 'Cítrico'], occasions: ['Día', 'Oficina', 'Cita'], season: 'Todo el año',
    short: 'Cítricos, rosa y jazmín sobre pachulí y vainilla: elegante y atemporal.',
    description: 'Un clásico femenino de Armaf: abre luminoso con naranja, toronja, bergamota y durazno, florece con rosa, jazmín, geranio y lichi, y se asienta en un fondo elegante de pachulí, vainilla, almizcle y vetiver.',
    notes: { top: 'Naranja · Toronja · Bergamota · Durazno', heart: 'Rosa · Jazmín · Geranio · Lichi', base: 'Pachulí · Vainilla · Almizcle · Vetiver' },
  }),
  P({
    slug: 'mayar', images: ['perfumes/mayar-1', 'perfumes/mayar-2'], price: 200000, name: 'Mayar', brand: 'Lattafa', type: 'ORIGINAL', gender: 'Mujer', line: 'Árabe',
    family: 'Floral frutal', groups: ['Floral', 'Dulce'], occasions: ['Día', 'Oficina'], season: 'Clima cálido',
    short: 'Lichi, frambuesa y peonía: fresco, dulce y luminoso.',
    description: 'Una fragancia floral frutal fresca y luminosa: lichi, frambuesa y hojas de violeta en la salida, un corazón de rosa blanca, peonía y jazmín, y un fondo suave de vainilla y almizcle. Ideal para el día y los climas cálidos.',
    notes: { top: 'Lichi · Frambuesa · Hoja de violeta', heart: 'Rosa blanca · Peonía · Jazmín', base: 'Vainilla · Almizcle' },
  }),
  P({
    slug: 'club-de-nuit-maleka', images: ['perfumes/club-de-nuit-maleka-1', 'perfumes/club-de-nuit-maleka-2'], price: 250000, name: 'Club de Nuit Maleka', brand: 'Armaf', type: 'ORIGINAL', gender: 'Mujer', line: 'Árabe', ml: 105,
    family: 'Floral frutal atalcado', groups: ['Floral', 'Dulce'], occasions: ['Cita', 'Noche', 'Oficina'], season: 'Todo el año',
    short: 'Lichi, iris y praliné: refinado, cremoso y de presencia real.',
    description: 'Una creación original del perfumista Olivier Cresp para Armaf: abre jugosa con lichi, bergamota y pimienta rosa, se vuelve elegante y atalcada con iris, y termina en un fondo dulce y cálido de praliné, sándalo y ambroxan.',
    notes: { top: 'Lichi · Bergamota · Pimienta rosa', heart: 'Iris', base: 'Praliné · Sándalo · Ambroxan' },
  }),
  P({
    slug: 'sceptre-malachite', images: ['perfumes/sceptre-malachite-1', 'perfumes/sceptre-malachite-2'], price: 230000, name: 'Sceptre Malachite', brand: 'Maison Alhambra', type: 'ORIGINAL', gender: 'Unisex', line: 'Árabe',
    family: 'Oriental amaderado cítrico', groups: ['Cítrico', 'Amaderado', 'Fresco'], occasions: ['Día', 'Oficina', 'Cita'], season: 'Todo el año',
    short: 'Mandarina verde, grosella negra y vetiver: fresco y sofisticado.',
    description: 'Una fragancia equilibrada y versátil: mandarina verde, bergamota y grosella negra en la salida, un corazón aromático de jazmín, lavanda y pimienta rosa, y un fondo cálido de ámbar, almizcle, vetiver y maderas.',
    notes: { top: 'Mandarina verde · Bergamota · Grosella negra', heart: 'Jazmín · Lavanda · Pimienta rosa · Notas aromáticas', base: 'Ámbar · Almizcle · Vetiver · Maderas' },
  }),
  P({
    slug: 'you-are-my-fire', images: ['perfumes/you-are-my-fire-1', 'perfumes/you-are-my-fire-2'], price: 240000, name: 'You Are My Fire', brand: 'Zakat', type: 'ORIGINAL', gender: 'Unisex', line: 'Árabe',
    family: 'Frutal especiado amaderado', groups: ['Dulce', 'Amaderado', 'Cítrico'], occasions: ['Día', 'Cita', 'Noche'], season: 'Todo el año',
    short: 'Mango, frutos rosados y oud: tropical, intenso y apasionado.',
    description: 'Una fragancia vibrante y apasionada: mango, limón, bayas rosadas y jengibre en la salida, un corazón de cumarina, jazmín y maderas secas, y un fondo profundo de oud, nagarmotha, almizcle y ámbar.',
    notes: { top: 'Mango · Limón · Bayas rosadas · Jengibre', heart: 'Cumarina · Jazmín · Maderas secas', base: 'Oud · Nagarmotha · Almizcle · Ámbar' },
  }),
  P({
    slug: 'afnan-9pm', images: ['perfumes/afnan-9pm-1', 'perfumes/afnan-9pm-2'], price: 200000, name: '9PM', brand: 'Afnan', type: 'ORIGINAL', gender: 'Hombre', line: 'Árabe',
    family: 'Ámbar vainilla especiado', groups: ['Dulce', 'Oriental'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Manzana, canela y vainilla: el clásico nocturno de Afnan.',
    description: 'El perfume que dio origen a la línea 9PM: abre con manzana, canela, lavanda y bergamota, florece con flor de azahar y lirio del valle, y termina en un fondo dulce y envolvente de vainilla, haba tonka, ámbar y pachulí. De gran duración y proyección.',
    notes: { top: 'Manzana · Canela · Lavanda silvestre · Bergamota', heart: 'Flor de azahar · Lirio del valle', base: 'Vainilla · Haba tonka · Ámbar · Pachulí' },
  }),
    P({
    slug: 'ana-al-awwal', images: ['perfumes/ana-al-awwal-1', 'perfumes/ana-al-awwal-2'], price: 180000, name: 'Ana Al Awwal', brand: 'Nusuk', type: 'ORIGINAL', gender: 'Mujer', line: 'Árabe',
    family: 'Oriental dulce amaderado', groups: ['Oriental', 'Dulce', 'Amaderado'], occasions: ['Noche', 'Cita'], season: 'Clima fresco',
    short: 'Original de Nusuk: frutas, especias, ámbar y vainilla.',
    description: 'Un perfume de inspiración oriental con matices cálidos y dulces, pensado para quienes disfrutan fragancias con presencia y personalidad.',
    notes: { main: 'Frutas · Especias · Acordes florales · Ámbar · Vainilla · Maderas' },
  }),
]

export const familyGroups: FamilyGroup[] = ['Amaderado', 'Oriental', 'Floral', 'Cítrico', 'Fresco', 'Dulce']
export const genders = ['Mujer', 'Hombre'] as const
export const lines: Line[] = ['Árabe', 'Diseñador', 'Nicho']
export const occasions: Occasion[] = ['Día', 'Noche', 'Oficina', 'Cita']

/** Unisex cuenta como Hombre y como Mujer */
export const isFor = (p: Perfume, g: 'Hombre' | 'Mujer') => p.gender === g || p.gender === 'Unisex'
export const genderLabel = (p: Perfume) => (p.gender === 'Unisex' ? 'Hombre y mujer' : p.gender)

/** Precio más bajo con valor (0 = sin precio aún) */
export const fromPrice = (p: Perfume) => {
  const v = p.sizes.map((s) => s.price).filter((x) => x > 0)
  return v.length ? Math.min(...v) : 0
}
/** Fotos reales o, mientras llegan, fotos de muestra */
export const pics = (p: Perfume) => {
  if (p.images.length) return p.images
  const i = perfumes.indexOf(p)
  return [sample[i % sample.length], sample[(i + 3) % sample.length]]
}
export const bySlug = (slug: string) => perfumes.find((p) => p.slug === slug)
export const inspiredLabel = (p: Perfume) => (p.type === 'ORIGINAL' ? `Original · ${p.brand}` : `Versión 1.1 premium · ${p.brand}`)

export const related = (p: Perfume, n = 4) =>
  perfumes
    .filter((x) => x.slug !== p.slug)
    .map((x) => ({ x, score: x.groups.filter((g) => p.groups.includes(g)).length * 2 + (x.gender === p.gender ? 1 : 0) + (x.brand === p.brand ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((r) => r.x)
