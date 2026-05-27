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
    org: 'Rancho Gaspar Animal Rescue',
    tagline: 'Animal Rescue',
    motto: 'Rescue. Heal. Love. Repeat.',
    description:
      'A small family-run sanctuary in Mairiporã, Brazil, giving rescued dogs and cats a second chance at love.',
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
    body: 'We rescue animals in need, provide medical care, and help them find loving forever homes. Together, we create second chances.',
    ctaAdopt: 'Adopt a Pet',
    ctaDonate: 'Donate Now',
    ctaVolunteer: 'Volunteer',
    statValue: '500+ animals rescued',
    statSub: 'thanks to our community',
    pillars: [
      { label: 'Rescue', desc: 'We save animals from high-kill shelters and urgent situations.' },
      { label: 'Heal', desc: 'Medical care, nourishment, and a safe place to recover.' },
      { label: 'Love', desc: 'We match each pet with a loving family for life.' },
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
  },
  impact: {
    label: 'Our impact',
    title: 'Small ranch, big change',
    body: 'Since 2019, thanks to your help.',
    stats: [
      { value: '500+', label: 'Rescued', sub: 'since 2019' },
      { value: '312', label: 'Adopted', sub: 'forever homes' },
      { value: 'R$ 84k', label: 'Vet care', sub: 'this year alone' },
      { value: '48', label: 'Volunteers', sub: 'weekly heroes' },
    ],
  },
  involved: {
    label: 'Get involved',
    title: "There's more than one way to help",
    cards: [
      {
        title: 'Volunteer',
        desc: 'Give your time. Change their lives. Help with events, socialization, transport, and more.',
        cta: 'Sign up to volunteer',
      },
      {
        title: 'Foster',
        desc: 'Open your home. Save a life. Provide a temporary home and help pets heal.',
        cta: 'Become a foster',
      },
      {
        title: 'Spread the Word',
        desc: 'Share our mission and help us reach more animals in need. Every share counts.',
        cta: 'Share our mission',
      },
    ],
  },
  testimonials: [
    {
      quote:
        'Rancho Gaspar gave our family the most amazing companion. We are so grateful for the love and care they show to every animal.',
      author: 'The Martinez Family',
      role: 'Adopted Mochi · 2024',
    },
    {
      quote:
        "Maria and João don't run a shelter, they run a home. You can feel it the moment you walk in.",
      author: 'Ana & Pedro',
      role: 'Volunteers since 2022',
    },
  ],
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
    madeWith: 'Made with',
    inBrazil: 'in Brazil',
    nonprofit: '501(c)(3) Nonprofit · EIN 12-3456789',
  },
  status: {
    adoptable: 'Adoptable',
    resident: 'Resident',
    residentNote: 'Permanent resident · not for adoption',
  },
  adoptPage: {
    breadcrumb: 'Adopt',
    title: 'Find your new best friend',
    body: 'All of our animals are spayed or neutered, vaccinated, and health-checked before adoption. Adoption fees from R$ 150.',
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
    org: 'Resgate Animal Rancho Gaspar',
    tagline: 'Resgate Animal',
    motto: 'Resgatar. Curar. Amar. Repetir.',
    description:
      'Um pequeno santuário familiar em Mairiporã, Brasil, dando a cães e gatos resgatados uma segunda chance de amar.',
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
    body: 'Resgatamos animais em situação de risco, oferecemos cuidados médicos e ajudamos a encontrar lares cheios de amor. Juntos, criamos segundas chances.',
    ctaAdopt: 'Adote um Pet',
    ctaDonate: 'Doar Agora',
    ctaVolunteer: 'Seja Voluntário',
    statValue: '500+ animais resgatados',
    statSub: 'graças à nossa comunidade',
    pillars: [
      { label: 'Resgatar', desc: 'Salvamos animais de abrigos lotados e situações urgentes.' },
      {
        label: 'Curar',
        desc: 'Cuidados médicos, alimentação e um lugar seguro para se recuperar.',
      },
      { label: 'Amar', desc: 'Encontramos para cada pet uma família amorosa para a vida toda.' },
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
  },
  impact: {
    label: 'Nosso impacto',
    title: 'Rancho pequeno, grande mudança',
    body: 'Desde 2019, graças à sua ajuda.',
    stats: [
      { value: '500+', label: 'Resgatados', sub: 'desde 2019' },
      { value: '312', label: 'Adotados', sub: 'lares para sempre' },
      { value: 'R$ 84 mil', label: 'Veterinário', sub: 'só este ano' },
      { value: '48', label: 'Voluntários', sub: 'heróis semanais' },
    ],
  },
  involved: {
    label: 'Participe',
    title: 'Há mais de uma forma de ajudar',
    cards: [
      {
        title: 'Voluntariar',
        desc: 'Doe seu tempo. Mude vidas. Ajude em eventos, socialização, transporte e muito mais.',
        cta: 'Quero ser voluntário',
      },
      {
        title: 'Lar Temporário',
        desc: 'Abra sua casa. Salve uma vida. Ofereça um lar temporário e ajude os pets a se recuperarem.',
        cta: 'Seja um lar temporário',
      },
      {
        title: 'Divulgar',
        desc: 'Compartilhe nossa missão e ajude a alcançar mais animais necessitados. Cada compartilhamento conta.',
        cta: 'Compartilhe nossa missão',
      },
    ],
  },
  testimonials: [
    {
      quote:
        'O Rancho Gaspar deu à nossa família o companheiro mais incrível. Somos muito gratos pelo amor e cuidado que dedicam a cada animal.',
      author: 'Família Martinez',
      role: 'Adotaram a Mochi · 2024',
    },
    {
      quote:
        'A Maria e o João não administram um abrigo, eles administram um lar. Dá para sentir no momento em que você entra.',
      author: 'Ana & Pedro',
      role: 'Voluntários desde 2022',
    },
  ],
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
    madeWith: 'Feito com',
    inBrazil: 'no Brasil',
    nonprofit: 'Organização sem fins lucrativos · CNPJ 12.345.678/0001-90',
  },
  status: {
    adoptable: 'Para adoção',
    resident: 'Residente',
    residentNote: 'Residente permanente · não disponível para adoção',
  },
  adoptPage: {
    breadcrumb: 'Adotar',
    title: 'Encontre seu novo melhor amigo',
    body: 'Todos os nossos animais são castrados, vacinados e passam por avaliação de saúde antes da adoção. Taxas de adoção a partir de R$ 150.',
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
