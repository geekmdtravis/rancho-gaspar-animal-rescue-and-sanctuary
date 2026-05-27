// i18n/ui.ts — UI string + page-content dictionaries.
//
// English is the canonical source. The `pt-br` object mirrors the `en` shape;
// `Dictionary` is inferred from `en` so TypeScript flags any missing PT keys.
// Structured (nested / arrays) content lives here too so marketing copy stays
// translatable without touching markup. Animal *profiles* live in the
// `animals` content collection (editable via Sveltia CMS), not here.

export const defaultLang = 'en';

const en = {
  site: {
    name: 'Rancho Gaspar',
    org: 'Rancho Gaspar Animal Sanctuary & Rescue',
    tagline: 'Animal Rescue',
    motto: 'Rescue. Heal. Love. Repeat.',
    description:
      'A small family-run sanctuary in Mendonça, SP, giving rescued dogs and cats a second chance at love.',
  },
  nav: {
    adopt: 'Adopt',
    residents: 'Our Residents',
    involved: 'Get Involved',
    impact: 'Our Impact',
    about: 'About Us',
    blog: 'Stories',
    events: 'Events',
    contact: 'Contact',
    donate: 'Donate Now',
    save: 'Saved animals',
    home: 'Home',
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  hero: {
    eyebrow: 'Olá from Brazil 🇧🇷',
    titleLine1: 'Rescue. Heal.',
    titleEmphasis: 'Love.',
    body: 'We rescue animals in need, nurse them back to health, and help them find loving forever homes — and for those who can not be placed, this ranch is home for life. Together, we create second chances.',
    ctaAdopt: 'Adopt a Pet',
    ctaDonate: 'Donate Now',
    ctaVolunteer: 'Volunteer',
    statValue: '36 animals rescued',
    statSub: 'thanks to our community',
    pillars: [
      {
        label: 'Rescue',
        desc: 'We rescue animals from the streets, where support is scarce and cats are abandoned in high numbers.',
      },
      { label: 'Heal', desc: 'Medical care, nourishment, and a safe place to recover.' },
      {
        label: 'Love',
        desc: 'A loving family for most — and a forever home here for those who can not be placed.',
      },
    ],
    pillarFooter: 'Every heart counts',
  },
  adoptables: {
    label: 'Meet our adoptable animals',
    title: 'Your new best friend is waiting',
    body: "Each one of these little ones has a story — and a personality bigger than they realize. Browse who's looking for a home this week.",
    viewAll: 'View all adoptable pets',
    saveFavorites: 'Save your favorites',
    meet: 'Meet',
    empty: 'No adoptable animals listed right now — check back soon, or follow us for updates.',
  },
  donate: {
    title: 'Make a Difference Today',
    body: 'Your gift helps rescue, heal, and care for animals in need.',
    oneTime: 'One-time',
    monthly: 'Monthly',
    cta: 'Donate',
    perMonth: '/mo',
    trust: 'Secure · Trusted · Tax-deductible',
    fxNote: 'Amounts in USD · ≈ {brl} today',
    // Shown when the in-browser rate fetch fails (see lib/fx-client.ts).
    fxNoteUnavailable: 'Amounts in USD · R$ unavailable',
  },
  // Shared currency strings. `unavailable` fills a BRL parenthetical when the
  // in-browser rate fetch fails (see lib/fx-client.ts + FxAmount.astro).
  fx: {
    unavailable: 'R$ unavailable',
  },
  impact: {
    label: 'Our impact',
    title: 'Small ranch, big change',
    body: 'Since 2017, thanks to your help.',
    stats: [
      { value: '36', label: 'Rescued', sub: 'since 2017' },
      { value: '4', label: 'Adopted', sub: 'forever homes' },
      { value: '2', label: 'Volunteers', sub: 'hands-on every week' },
    ],
  },
  involved: {
    label: 'Get involved',
    title: 'Interested in getting involved?',
    body: 'Send us an email and tell us how you would like to help. We will get back to you with the best next step.',
    contactTitle: 'Start with an email',
    contactBody: 'Tell us a little about yourself and the kind of help you have in mind.',
    cta: 'Email us',
  },
  reviews: {
    // Shown when a review is displayed in a locale other than the one the
    // reviewer actually wrote in. {lang} is filled from `langNames` below.
    translatedFrom: 'Translated from {lang}',
    langNames: { en: 'English', 'pt-br': 'Portuguese' },
    showOriginal: 'Read original',
    showTranslation: 'Read translation',
  },
  newsletter: {
    title: 'Happy tails, straight to your inbox',
    body: 'Adoption updates, rescue stories, and ways to help — once a month, never spammy.',
    placeholder: 'your@email.com',
    cta: 'Subscribe',
  },
  footer: {
    quickLinks: 'Quick Links',
    aboutCol: 'About',
    contactCol: 'Contact',
    stayConnected: 'Stay Connected',
    stayBody: 'News, adoptable pets, and ways to help — direct to your inbox.',
    links: {
      adopt: 'Adopt',
      involved: 'Get Involved',
      impact: 'Our Impact',
      events: 'Events',
      story: 'Our Story',
      residents: 'Our Residents',
      stories: 'Stories',
      contact: 'Contact',
    },
    locations: {
      sanctuary: 'Sanctuary: Mendonça, SP · Brazil',
      financialHq: 'Headquarters: Murrieta, CA · USA',
    },
    madeWith: 'Made with',
    inBrazil: 'in Brazil',
    nonprofit: 'US nonprofit · EIN 42-2779431',
  },
  status: {
    adoptable: 'Adoptable',
    resident: 'Resident',
    residentNote: 'Permanent resident · not for adoption',
  },
  // Age is computed from each animal's date of birth at build time (see
  // i18n/age.ts), so these are just the unit words the formatter slots in.
  age: {
    year: 'year',
    years: 'years',
    month: 'month',
    months: 'months',
    newborn: 'newborn',
  },
  adoptPage: {
    breadcrumb: 'Adopt',
    title: 'Find your new best friend',
    body: 'All of our animals are spayed or neutered, vaccinated, and health-checked before adoption.',
    // {fee} is the lowest adoptionFee, rendered USD-first; the approximate BRL
    // value is fetched in-browser (see lib/fx-client.ts + FxAmount.astro).
    feesFrom: 'Adoption fees from {fee}.',
    searchPlaceholder: 'Search by name or breed…',
    filterLabel: 'Filter',
    species: { all: 'All', dog: 'Dogs', cat: 'Cats', bunny: 'Bunnies' },
    countSuffix: 'pets currently looking for homes',
    emptyFiltered: 'No pets match your search. Try clearing the filters.',
    empty: 'No adoptable animals listed right now — check back soon.',
    noMatchTitle: "Don't see the right match?",
    noMatchBody:
      "We have more in foster care. Tell us what you're looking for and we'll get back to you within a few days.",
    noMatchCta: 'Get in touch',
  },
  residentsPage: {
    breadcrumb: 'Our Residents',
    title: 'The ones who are here to stay',
    body: 'These animals call Rancho Gaspar home for life. They are sanctuary residents — not up for adoption. Some are seniors, some have special needs, all are family.',
    countSuffix: 'permanent residents',
    empty: 'No residents listed yet.',
  },
  profile: {
    aboutEyebrow: 'The story',
    aboutHeading: 'Meet', // rendered as "Meet {name}"
    quickFacts: 'Quick facts',
    fee: 'Adoption fee',
    apply: 'Apply to adopt', // rendered as "Apply to adopt {name}"
    save: 'Save',
    share: 'Share',
    fosterTitle: 'Foster-to-adopt available',
    fosterBody: 'Not quite ready? Try a two-week foster trial first. Same kindness, less pressure.',
    processEyebrow: 'How it works',
    processHeading: 'The adoption process',
    process: [
      {
        q: '1. Submit an application',
        a: 'A short form — about 5 minutes. We just want to know about your home and lifestyle.',
      },
      {
        q: '2. We chat (video or in person)',
        a: "A 20-minute call to answer your questions and make sure it's the right match.",
      },
      {
        q: '3. Meet your match',
        a: 'You come to the ranch — or we bring them to a neutral spot near you in São Paulo.',
      },
      {
        q: '4. Take them home',
        a: 'Same day or a few days later. The fee covers everything.',
      },
    ],
    sponsorEyebrow: 'Support',
    sponsorTitle: 'Sponsor their care',
    sponsorBody:
      "Can't adopt right now? Sponsoring covers food, vet visits, and daily care for an animal at the ranch.",
    similarEyebrow: 'You might also like',
    similarHeading: 'More animals in our care',
    backAdopt: 'All adoptable pets',
    backResidents: 'All our residents',
  },
  comingSoon: {
    badge: 'Coming soon',
    heading: 'This page is on its way',
    body: "We're a small family team building Rancho Gaspar's site page by page. While this one comes together, meet our animals or reach out — we'd love to hear from you.",
    ctaAnimals: 'Meet our animals',
    ctaContact: 'Email us',
  },
  common: {
    learnMore: 'Learn more',
  },
};

// Type derived from the canonical English shape. Note: `en` is intentionally
// *not* `as const` — property types widen to `string`, so translations can
// hold any value while TypeScript still enforces the key structure.
export type Dictionary = typeof en;

const ptBr: Dictionary = {
  site: {
    name: 'Rancho Gaspar',
    org: 'Rancho Gaspar Animal Sanctuary & Rescue',
    tagline: 'Resgate Animal',
    motto: 'Resgatar. Curar. Amar. Repetir.',
    description:
      'Um pequeno santuário familiar em Mendonça, SP, dando a cães e gatos resgatados uma segunda chance de amar.',
  },
  nav: {
    adopt: 'Adotar',
    residents: 'Nossos Residentes',
    involved: 'Participe',
    impact: 'Nosso Impacto',
    about: 'Sobre Nós',
    blog: 'Histórias',
    events: 'Eventos',
    contact: 'Contato',
    donate: 'Doar Agora',
    save: 'Animais salvos',
    home: 'Início',
    skipToContent: 'Pular para o conteúdo',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    language: 'Idioma',
  },
  hero: {
    eyebrow: 'Olá do Brasil 🇧🇷',
    titleLine1: 'Resgatar. Curar.',
    titleEmphasis: 'Amar.',
    body: 'Resgatamos animais em situação de risco, oferecemos cuidados médicos e ajudamos a encontrar lares cheios de amor — e, para os que não podem ser adotados, um lar permanente aqui. Juntos, criamos segundas chances.',
    ctaAdopt: 'Adote um Pet',
    ctaDonate: 'Doar Agora',
    ctaVolunteer: 'Seja Voluntário',
    statValue: '36 animais resgatados',
    statSub: 'graças à nossa comunidade',
    pillars: [
      {
        label: 'Resgatar',
        desc: 'Resgatamos animais das ruas, onde o apoio é escasso e gatos são abandonados em grande número.',
      },
      {
        label: 'Curar',
        desc: 'Cuidados médicos, alimentação e um lugar seguro para se recuperar.',
      },
      {
        label: 'Amar',
        desc: 'Uma família amorosa para a maioria — e um lar para sempre aqui para os que não podem ser adotados.',
      },
    ],
    pillarFooter: 'Cada coração conta',
  },
  adoptables: {
    label: 'Conheça nossos animais para adoção',
    title: 'Seu novo melhor amigo está esperando',
    body: 'Cada um desses pequenos tem uma história — e uma personalidade maior do que imaginam. Veja quem procura um lar esta semana.',
    viewAll: 'Ver todos os pets para adoção',
    saveFavorites: 'Salve seus favoritos',
    meet: 'Conhecer',
    empty: 'Nenhum animal para adoção no momento — volte em breve ou nos siga para novidades.',
  },
  donate: {
    title: 'Faça a Diferença Hoje',
    body: 'Sua doação ajuda a resgatar, curar e cuidar de animais necessitados.',
    oneTime: 'Única',
    monthly: 'Mensal',
    cta: 'Doar',
    perMonth: '/mês',
    trust: 'Seguro · Confiável · Dedutível de impostos',
    fxNote: 'Valores em USD · ≈ {brl} hoje',
    fxNoteUnavailable: 'Valores em USD · R$ indisponível',
  },
  fx: {
    unavailable: 'R$ indisponível',
  },
  impact: {
    label: 'Nosso impacto',
    title: 'Rancho pequeno, grande mudança',
    body: 'Desde 2017, graças à sua ajuda.',
    stats: [
      { value: '36', label: 'Resgatados', sub: 'desde 2017' },
      { value: '4', label: 'Adotados', sub: 'lares para sempre' },
      { value: '2', label: 'Voluntários', sub: 'presentes toda semana' },
    ],
  },
  involved: {
    label: 'Participe',
    title: 'Quer participar?',
    body: 'Envie um e-mail contando como gostaria de ajudar. Retornaremos com o melhor próximo passo.',
    contactTitle: 'Comece com um e-mail',
    contactBody: 'Conte um pouco sobre você e o tipo de ajuda que tem em mente.',
    cta: 'Envie um e-mail',
  },
  reviews: {
    translatedFrom: 'Traduzido do {lang}',
    langNames: { en: 'inglês', 'pt-br': 'português' },
    showOriginal: 'Ver original',
    showTranslation: 'Ver tradução',
  },
  newsletter: {
    title: 'Finais felizes, direto no seu e-mail',
    body: 'Novidades de adoção, histórias de resgate e formas de ajudar — uma vez por mês, sem spam.',
    placeholder: 'seu@email.com',
    cta: 'Inscrever-se',
  },
  footer: {
    quickLinks: 'Links Rápidos',
    aboutCol: 'Sobre',
    contactCol: 'Contato',
    stayConnected: 'Fique Por Dentro',
    stayBody: 'Notícias, pets para adoção e formas de ajudar — direto no seu e-mail.',
    links: {
      adopt: 'Adotar',
      involved: 'Participe',
      impact: 'Nosso Impacto',
      events: 'Eventos',
      story: 'Nossa História',
      residents: 'Nossos Residentes',
      stories: 'Histórias',
      contact: 'Contato',
    },
    locations: {
      sanctuary: 'Santuário: Mendonça, SP · Brasil',
      financialHq: 'Sede financeira: Murrieta, CA · EUA',
    },
    madeWith: 'Feito com',
    inBrazil: 'no Brasil',
    nonprofit: 'Organização sem fins lucrativos dos EUA · EIN 42-2779431',
  },
  status: {
    adoptable: 'Para adoção',
    resident: 'Residente',
    residentNote: 'Residente permanente · não disponível para adoção',
  },
  age: {
    year: 'ano',
    years: 'anos',
    month: 'mês',
    months: 'meses',
    newborn: 'recém-nascido',
  },
  adoptPage: {
    breadcrumb: 'Adotar',
    title: 'Encontre seu novo melhor amigo',
    body: 'Todos os nossos animais são castrados, vacinados e passam por avaliação de saúde antes da adoção.',
    feesFrom: 'Taxas de adoção a partir de {fee}.',
    searchPlaceholder: 'Busque por nome ou raça…',
    filterLabel: 'Filtrar',
    species: { all: 'Todos', dog: 'Cães', cat: 'Gatos', bunny: 'Coelhos' },
    countSuffix: 'pets à procura de um lar',
    emptyFiltered: 'Nenhum pet corresponde à sua busca. Tente limpar os filtros.',
    empty: 'Nenhum animal para adoção no momento — volte em breve.',
    noMatchTitle: 'Não encontrou o par ideal?',
    noMatchBody:
      'Temos mais animais em lares temporários. Conte o que você procura e retornamos em alguns dias.',
    noMatchCta: 'Fale com a gente',
  },
  residentsPage: {
    breadcrumb: 'Nossos Residentes',
    title: 'Os que vieram para ficar',
    body: 'Estes animais têm o Rancho Gaspar como lar para a vida toda. São residentes do santuário — não estão disponíveis para adoção. Alguns são idosos, alguns têm necessidades especiais, todos são família.',
    countSuffix: 'residentes permanentes',
    empty: 'Nenhum residente cadastrado ainda.',
  },
  profile: {
    aboutEyebrow: 'A história',
    aboutHeading: 'Conheça', // exibido como "Conheça {name}"
    quickFacts: 'Informações',
    fee: 'Taxa de adoção',
    apply: 'Quero adotar', // exibido como "Quero adotar {name}"
    save: 'Salvar',
    share: 'Compartilhar',
    fosterTitle: 'Apadrinhamento temporário disponível',
    fosterBody:
      'Ainda não tem certeza? Experimente um lar temporário por duas semanas primeiro. O mesmo carinho, menos pressão.',
    processEyebrow: 'Como funciona',
    processHeading: 'O processo de adoção',
    process: [
      {
        q: '1. Envie uma solicitação',
        a: 'Um formulário curto — cerca de 5 minutos. Só queremos conhecer sua casa e seu estilo de vida.',
      },
      {
        q: '2. Conversamos (vídeo ou presencial)',
        a: 'Uma ligação de 20 minutos para tirar suas dúvidas e garantir que é o par certo.',
      },
      {
        q: '3. Conheça seu novo amigo',
        a: 'Você vem ao rancho — ou levamos o animal a um ponto neutro perto de você, em São Paulo.',
      },
      {
        q: '4. Leve para casa',
        a: 'No mesmo dia ou alguns dias depois. A taxa cobre tudo.',
      },
    ],
    sponsorEyebrow: 'Apoie',
    sponsorTitle: 'Apadrinhe os cuidados',
    sponsorBody:
      'Não pode adotar agora? O apadrinhamento cobre alimentação, consultas veterinárias e o cuidado diário de um animal no rancho.',
    similarEyebrow: 'Você também pode gostar',
    similarHeading: 'Mais animais sob nossos cuidados',
    backAdopt: 'Todos os pets para adoção',
    backResidents: 'Todos os nossos residentes',
  },
  comingSoon: {
    badge: 'Em breve',
    heading: 'Esta página está a caminho',
    body: 'Somos uma pequena família construindo o site do Rancho Gaspar página por página. Enquanto esta fica pronta, conheça nossos animais ou fale com a gente — vamos adorar seu contato.',
    ctaAnimals: 'Conheça nossos animais',
    ctaContact: 'Envie um e-mail',
  },
  common: {
    learnMore: 'Saiba mais',
  },
};

export const ui = { en, 'pt-br': ptBr };
export type Lang = keyof typeof ui;
