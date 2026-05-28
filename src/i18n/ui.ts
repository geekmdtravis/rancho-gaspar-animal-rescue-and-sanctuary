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
    tagline: 'Animal Sanctuary & Rescue',
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
    body: "In our part of rural Brazil there is no shelter to call and no rescue network on the way. Stray and abandoned animals are on their own — until they aren't. We rescue, heal, and find loving homes. For those who can't be placed, this ranch is home for life.",
    ctaAdopt: 'Adopt a Pet',
    ctaDonate: 'Donate Now',
    ctaVolunteer: 'Volunteer',
    // Composed at render time as `{rescuedCount} {statValue}` — see Hero.astro.
    statValue: 'animals rescued',
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
    photoAlt:
      'Bruxa, one of our sanctuary cats, in the garden with two other rescues in the background',
  },
  // Homepage "why this work is different" section. We sit in the rural
  // Brazilian interior where the rescue infrastructure most US visitors take
  // for granted (municipal shelter, low-cost clinic, foster network) simply
  // does not exist. This block frames that gap honestly — factual rather
  // than catastrophizing — so the rest of the homepage reads against the
  // right backdrop.
  safetyNet: {
    label: 'Why this work',
    title: 'We are the safety net.',
    intro:
      'Animal rescue in much of the US has imperfect but real infrastructure — municipal shelters, foster networks, animal control. In the rural Brazilian interior where Rancho Gaspar sits, almost none of that exists.',
    gaps: [
      {
        title: 'No shelter to call',
        desc: 'There is no municipal animal shelter to take a stray in.',
      },
      {
        title: 'No one to bring strays in',
        desc: 'A nearby vet handles affordable spay and neuter, but no one is paid to catch and transport unowned animals. That last step falls to us.',
      },
      {
        title: 'No rescue network',
        desc: 'No other groups to absorb overflow or take an urgent case.',
      },
    ],
    close: 'The animals are on their own. We are their support system.',
  },
  adoptables: {
    label: 'Meet our adoptable animals',
    title: 'Your new best friend is waiting',
    body: "Each one of these little ones has a story — and a personality bigger than they realize. Browse who's looking for a home this week.",
    viewAll: 'View all adoptable pets',
    meet: 'Meet',
    empty: 'No adoptable animals listed right now — check back soon, or follow us for updates.',
  },
  donate: {
    title: 'Make a Difference Today',
    body: 'Your gift helps rescue, heal, and care for animals in need.',
    oneTime: 'One-time',
    monthly: 'Monthly',
    cta: 'Donate',
    other: 'Other',
    otherHint: 'Choose your amount on the next page',
    perMonth: '/mo',
    trust: 'Secure · Trusted · Tax-deductible',
    fxNote: 'Amounts in USD · ≈ {brl} today',
    // Shown when the in-browser rate fetch fails (see lib/fx-client.ts).
    fxNoteUnavailable: 'Amounts in USD · R$ unavailable',
  },
  // Standalone /donate page: the donation widget's CTA forwards the chosen
  // amount + frequency here as query params (continuity); checkout itself is
  // stubbed pending a Cloudflare Worker.
  donatePage: {
    eyebrow: 'Support the sanctuary',
    title: 'Make your gift',
    intro:
      'Every gift directly funds rescue, veterinary care, food, and shelter for animals who have nowhere else to turn. Choose an amount and how you would like to give.',
    freqOne: 'One-time',
    freqMonthly: 'Monthly',
    amountLegend: 'Choose an amount',
    other: 'Other',
    customLabel: 'Enter a custom amount (USD)',
    customPlaceholder: 'e.g. 18',
    amountError: 'Please enter an amount of $1 or more.',
    fxNote: '≈ {brl} today',
    fxUnavailable: 'BRL equivalent unavailable',
    methodLegend: 'How would you like to give?',
    givebutterTitle: 'Card or Apple Pay',
    givebutterDesc: 'Fast, secure checkout powered by Givebutter.',
    givebutterBadge: 'Recommended',
    cryptoTitle: 'Cryptocurrency',
    cryptoDesc: 'Give with Bitcoin, Ethereum, or USDC.',
    cryptoChoose: 'Choose a coin',
    pixTitle: 'Pix (Brazil)',
    pixDesc: 'Local Brazilian transfers are on the way.',
    pixBadge: 'Coming soon',
    summaryPrefix: 'Your gift',
    perMonth: '/mo',
    cta: 'Continue to give',
    stubTitle: 'Almost there.',
    stubBody:
      'Secure checkout is being connected to our payment partner. This button will soon take you to a protected page to complete your gift. Thank you for your patience — and your kindness.',
    trust: 'Secure · Trusted · Tax-deductible',
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
    // TODO(501c3): once the IRS issues the determination letter, drop the
    // "501(c)(3) pending" clause here and in the pt-br entry below, and revisit
    // the construction banner + donate "Tax-deductible" trust line.
    nonprofit: 'US nonprofit · 501(c)(3) pending · EIN 42-2779431',
  },
  status: {
    adoptable: 'Adoptable',
    resident: 'Resident',
    residentNote: 'Permanent resident · not for adoption',
    adopted: 'Adopted',
    inMemoriam: 'In loving memory',
    // CTA verb on a memorial card, rendered as "Remember {name}".
    remember: 'Remember',
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
    body: 'Every adoption starts with careful preparation. By ranch policy, animals spend at least eight weeks in quarantine so we can assess temperament, understand their needs, and build a good match profile, though exceptions may exist. Each animal is vaccinated appropriately under veterinary guidance; cats receive FIV/FELV testing, dogs are spayed or neutered and receive a veterinary checkup, and bunnies receive a veterinary checkup before they are listed.',
    // {fee} is the lowest adoptionFee, rendered USD-first; the approximate BRL
    // value is fetched in-browser (see lib/fx-client.ts + FxAmount.astro).
    feesFrom: 'Adoption fees from {fee}.',
    searchPlaceholder: 'Search by name or breed…',
    filterLabel: 'Filter',
    species: { all: 'All', dog: 'Dogs', cat: 'Cats', bunny: 'Bunnies' },
    // Toggle that reveals animals already adopted (hidden by default).
    showAdopted: 'Show adopted',
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
  aboutPage: {
    breadcrumb: 'About Us',
    eyebrow: 'Our story',
    title: 'A family sanctuary shaped by one stray cat',
    intro:
      'Around 2017, the Gaspar family brought home their first stray cat — Tito, the first cat anyone in the household had ever owned. He became part of the family, and that one rescue changed what they could see around them: cats in their part of Brazil were not just homeless, they were often misunderstood, ignored, and left without the same informal support that some street dogs receive.',
    // Long-form counterpart to the homepage `safetyNet` section. The homepage
    // names the gap in one short block; here we have room to spell out each
    // missing piece concretely so the rest of the about page lands against
    // the right backdrop.
    safetyNetTitle: 'No shelter to call, no rescue network on the way',
    safetyNet:
      'Animal rescue in much of the United States rests on infrastructure most visitors take for granted: municipal shelters, foster networks, animal control trucks that pick up unowned animals. The rural Brazilian interior where Rancho Gaspar sits has almost none of it. There is no shelter where someone can drop off a stray cat. A nearby vet does offer affordable spay and neuter, but there is no one paid to catch and transport unowned animals to that vet — that last step always falls to us. There is no rescue network with capacity to absorb a difficult case. When an animal is hungry, hurt, or carrying yet another unplanned litter, no one is on the way — which is the gap that Rancho Gaspar has chosen to fill.',
    backgroundTitle: 'Why cats became the center of the work',
    background:
      'Within that gap, cats face an additional kind of vulnerability. Myths, misinformation, and old superstitions still affect how people treat them, especially black or dark-coated cats. While some dogs may become familiar neighborhood animals — fed, watched out for, even given names — cats are often less visible, less trusted, and less likely to be fed, protected, or adopted.',
    // The personal origin: how one family pet (not a rescue, not a sanctuary
    // resident — a pet) opened the family's eyes to the wider problem and
    // grew into systematic rescue work. The pet/resident/rescue distinction
    // is deliberate: it keeps personal pet ownership cleanly separated from
    // the nonprofit's mission inventory.
    callingTitle: 'From one cat to a calling',
    calling:
      "What started with one beloved family cat — Tito — grew into a calling. He wasn't a sanctuary resident or a rescue project; he was simply theirs. But the animal who had arrived as a stray turned out to be exactly the kind of cat the local stigma denied could exist: gentle, social, and deeply affectionate. The more cats and dogs the family began to notice around them, the harder it became to walk past. Sympathy turned into resolve, and resolve turned into routine: tracking down the animal nobody else was coming for, getting them to the vet, neutering or spaying them, and finding the right next step. Addressing the stray companion animal crisis in this part of Brazil became less of a hobby and more of a life's work.",
    missionTitle: 'What Rancho Gaspar does',
    mission:
      'The ranch exists because we refuse to leave wonderful animals uncared for, suffering, or reproducing unchecked. We rescue, quarantine, assess temperament, provide veterinary care, spay or neuter when appropriate, and work toward the right forever home. For some animals, that means adoption into a loving family. For others, it means permanent sanctuary care at the ranch.',
    ranchTitle: 'A family ranch with a deeper purpose',
    ranch:
      'The sanctuary owners live between the United States and Brazil, while the Brazil ranch is dedicated primarily to the animals. The ranch was built by Julio Gaspar over roughly twenty years before he passed away, so it carries special meaning: a monument to his care and effort for the family, and now a safe home for animals in the Mendonça region who are misunderstood, hungry, at risk, or likely to continue reproducing without help.',
    scopeTitle: 'Cats first, but not cats only',
    scope:
      'Take Bart, the dog in this photo. When we first found him, he had a large puncture wound on his right hindquarter, infested with fly larvae — the kind of injury that becomes routine in a place where stray dogs spend their days fighting each other, or whatever local wildlife they happen to cross. We nursed him back to health. In that same week, we located another stray who had been in a fight with an anteater. Cats make up the majority of our rescue work, but dogs and bunnies are not excluded — when we can help safely and responsibly, we do. Some species or situations may not be compatible with a ranch full of cats, but we are always willing to hear what is happening and see whether we can help or point someone in the right direction.',
    // The community-ask beat. Wording is intentionally careful: the ask is
    // framed around the nonprofit mission (not the family), the split-country
    // structure is named up-front, and the adoptable-vs-resident policy is
    // surfaced as evidence that placements are not ad-hoc. All factual
    // claims here are already independently visible elsewhere on the site
    // (footer EIN, donate trust line, animalRoute() routing logic).
    communityTitle: 'Bigger than one family',
    community:
      'One family can only carry so much. Rancho Gaspar was built from the start to outlast a single household — registered as a US 501(c)(3) nonprofit with its financial home in Murrieta, California, while every rescue, recovery, spay or neuter, and day of sanctuary care happens at the ranch in Mendonça, São Paulo. Every animal we take in has nowhere else to turn, and every animal is placed under a clear written status: adoptable, through our application and meet-and-match process, or permanent resident, when age, health, or temperament makes adoption unsafe or unkind. The mission has outgrown what one family can do alone. If you can donate, sponsor an animal, volunteer, foster, or adopt, the sanctuary’s reach grows with you.',
    residentTitle: 'Current sanctuary residents',
    residentBody:
      'These counts are pulled from our resident inventory, so they reflect the animals currently marked as permanent residents on the site.',
    residentTotalLabel: 'total residents',
    speciesLabels: {
      cat: { singular: 'cat', plural: 'cats' },
      dog: { singular: 'dog', plural: 'dogs' },
      bunny: { singular: 'bunny', plural: 'bunnies' },
    },
    // Monospace labels naming the photo that should fill each placeholder until
    // a real image is uploaded (see PhotoSlot.astro).
    photos: {
      hero: 'Negresco and Negresca, two of the cats in our care',
      safetyNet:
        'A young woman on a stepladder reaches over a tall brick wall toward two black cats',
      calling:
        'Tito, a chocolate-point cat with bright blue eyes, curled up in a fluffy cream and pink cat bed',
      background: 'rescued cats',
      mission: 'vet care & recovery',
      ranch: 'the ranch',
      scope:
        'Bart, a brown short-haired dog with a small white chest patch, sitting on tiled floor and looking up at the camera with an open-mouth smile',
      community:
        'Gatão, an orange-and-white tabby cat sitting on terracotta tiles beside bright pink flowers',
    },
    locationsTitle: 'Where we operate',
    locationsBody:
      'Our work spans two countries — the animals are cared for in Brazil, while the nonprofit is based in the United States.',
    locationSanctuaryTitle: 'Sanctuary',
    locationSanctuaryBody:
      'Mendonça, São Paulo — where all of the rescue, recovery, and sanctuary care happens.',
    locationHqTitle: 'Headquarters',
    locationHqBody:
      'Rancho Gaspar is a US nonprofit; its financial headquarters are in Murrieta, California.',
  },
  profile: {
    aboutEyebrow: 'The story',
    aboutHeading: 'Meet', // rendered as "Meet {name}"
    quickFacts: 'Quick facts',
    fee: 'Adoption fee',
    apply: 'Apply to adopt', // rendered as "Apply to adopt {name}"
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
        q: '2. We chat by video',
        a: "A 20-minute video call to answer your questions and make sure it's the right match.",
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
    // Shown on the profile of an animal that has been adopted.
    adoptedTitle: 'Adopted into a loving home',
    adoptedBody:
      'This sweet one found their forever family. Meet the others still looking for a home.',
    // Shown on the profile of an animal that has passed away.
    memorialTitle: 'In loving memory',
    memorialBody: 'Forever part of the Rancho Gaspar family. Thank you for the joy you gave us.',
  },
  comingSoon: {
    badge: 'Coming soon',
    heading: 'This page is on its way',
    body: "We're a small family team building Rancho Gaspar's site page by page. While this one comes together, meet our animals or reach out — we'd love to hear from you.",
    ctaAnimals: 'Meet our animals',
    ctaContact: 'Email us',
  },
  // Site-wide announcement strip rendered at the very top of every page (above
  // the sticky nav). Honest, low-profile expectation-setting while the site,
  // animal profiles, 501(c)(3) approval, and donation processing come online.
  construction: {
    label: 'Heads up',
    body: "Our site is still under construction — animal profiles are being added, our 501(c)(3) approval is pending, and we can't yet accept donations. Thank you for your patience.",
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
    tagline: 'Santuário e Resgate de Animais',
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
    body: 'No interior rural do Brasil onde estamos, não há abrigo para chamar nem rede de resgate a caminho. Os animais em situação de rua e abandonados estão por conta própria — até que não estejam mais. Resgatamos, cuidamos e encontramos lares cheios de amor. Para os que não podem ser adotados, este rancho é lar para a vida toda.',
    ctaAdopt: 'Adote um Pet',
    ctaDonate: 'Doar Agora',
    ctaVolunteer: 'Seja Voluntário',
    // Composto em tempo de renderização como `{rescuedCount} {statValue}` — ver Hero.astro.
    statValue: 'animais resgatados',
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
    photoAlt:
      'Bruxa, uma das nossas gatas do santuário, no jardim com duas outras resgatadas ao fundo',
  },
  safetyNet: {
    label: 'Por que este trabalho',
    title: 'Nós somos a rede de apoio.',
    intro:
      'O resgate animal em boa parte dos EUA conta com uma infraestrutura imperfeita, mas real — abrigos municipais, redes de lares temporários, serviço de controle animal. No interior rural do Brasil, onde fica o Rancho Gaspar, quase nada disso existe.',
    gaps: [
      {
        title: 'Sem abrigo para chamar',
        desc: 'Não há abrigo municipal para acolher um animal em situação de rua.',
      },
      {
        title: 'Sem quem leve os animais até lá',
        desc: 'Um veterinário próximo faz castração a preço acessível, mas não há ninguém pago para resgatar e transportar animais sem dono. Essa última etapa cai sobre nós.',
      },
      {
        title: 'Sem rede de resgate',
        desc: 'Não há outras ONGs para absorver casos urgentes ou excedentes.',
      },
    ],
    close: 'Os animais estão por conta própria. Nós somos seu sistema de apoio.',
  },
  adoptables: {
    label: 'Conheça nossos animais para adoção',
    title: 'Seu novo melhor amigo está esperando',
    body: 'Cada um desses pequenos tem uma história — e uma personalidade maior do que imaginam. Veja quem procura um lar esta semana.',
    viewAll: 'Ver todos os pets para adoção',
    meet: 'Conhecer',
    empty: 'Nenhum animal para adoção no momento — volte em breve ou nos siga para novidades.',
  },
  donate: {
    title: 'Faça a Diferença Hoje',
    body: 'Sua doação ajuda a resgatar, curar e cuidar de animais necessitados.',
    oneTime: 'Única',
    monthly: 'Mensal',
    cta: 'Doar',
    other: 'Outro',
    otherHint: 'Escolha o valor na próxima página',
    perMonth: '/mês',
    trust: 'Seguro · Confiável · Dedutível de impostos',
    fxNote: 'Valores em USD · ≈ {brl} hoje',
    fxNoteUnavailable: 'Valores em USD · R$ indisponível',
  },
  donatePage: {
    eyebrow: 'Apoie o santuário',
    title: 'Faça sua doação',
    intro:
      'Cada doação financia diretamente o resgate, os cuidados veterinários, a alimentação e o abrigo de animais que não têm para onde ir. Escolha um valor e como deseja doar.',
    freqOne: 'Única',
    freqMonthly: 'Mensal',
    amountLegend: 'Escolha um valor',
    other: 'Outro',
    customLabel: 'Digite um valor personalizado (USD)',
    customPlaceholder: 'ex.: 18',
    amountError: 'Informe um valor de US$ 1 ou mais.',
    fxNote: '≈ {brl} hoje',
    fxUnavailable: 'Equivalente em BRL indisponível',
    methodLegend: 'Como você gostaria de doar?',
    givebutterTitle: 'Cartão ou Apple Pay',
    givebutterDesc: 'Checkout rápido e seguro com Givebutter.',
    givebutterBadge: 'Recomendado',
    cryptoTitle: 'Criptomoeda',
    cryptoDesc: 'Doe com Bitcoin, Ethereum ou USDC.',
    cryptoChoose: 'Escolha uma moeda',
    pixTitle: 'Pix (Brasil)',
    pixDesc: 'As transferências por Pix estão a caminho.',
    pixBadge: 'Em breve',
    summaryPrefix: 'Sua doação',
    perMonth: '/mês',
    cta: 'Continuar para doar',
    stubTitle: 'Quase lá.',
    stubBody:
      'O checkout seguro está sendo conectado ao nosso parceiro de pagamentos. Em breve este botão levará você a uma página protegida para concluir sua doação. Obrigado pela paciência — e pela generosidade.',
    trust: 'Seguro · Confiável · Dedutível de impostos',
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
    // TODO(501c3): see TODO on the en counterpart above.
    nonprofit: 'Organização sem fins lucrativos dos EUA · 501(c)(3) pendente · EIN 42-2779431',
  },
  status: {
    adoptable: 'Para adoção',
    resident: 'Residente',
    residentNote: 'Residente permanente · não disponível para adoção',
    adopted: 'Adotado',
    inMemoriam: 'Em memória',
    remember: 'Relembrar',
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
    body: 'Cada adoção começa com preparação cuidadosa. Pela política do rancho, os animais passam por pelo menos oito semanas de quarentena para avaliarmos temperamento, entendermos suas necessidades e montarmos um bom perfil de compatibilidade, embora possam existir exceções. Cada animal é vacinado adequadamente sob orientação veterinária; gatos recebem testes de FIV/FELV, cães são castrados e passam por avaliação veterinária, e coelhos passam por avaliação veterinária antes de serem listados.',
    feesFrom: 'Taxas de adoção a partir de {fee}.',
    searchPlaceholder: 'Busque por nome ou raça…',
    filterLabel: 'Filtrar',
    species: { all: 'Todos', dog: 'Cães', cat: 'Gatos', bunny: 'Coelhos' },
    showAdopted: 'Mostrar adotados',
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
  aboutPage: {
    breadcrumb: 'Sobre Nós',
    eyebrow: 'Nossa história',
    title: 'Um santuário familiar marcado por uma gata de rua',
    intro:
      'Por volta de 2017, a família Gaspar levou para casa seu primeiro gato de rua — Tito, o primeiro gato que alguém na casa já havia tido. Ele passou a fazer parte da família, e aquele resgate mudou o que eles conseguiam enxergar ao redor: gatos nesta parte do Brasil não estavam apenas sem lar, muitas vezes eram mal compreendidos, ignorados e deixados sem o mesmo apoio informal que alguns cães de rua recebem.',
    safetyNetTitle: 'Sem abrigo para chamar, sem rede de resgate a caminho',
    safetyNet:
      'Em boa parte dos Estados Unidos, o resgate animal se apoia numa infraestrutura que muitos consideram garantida: abrigos municipais, redes de lares temporários e serviço de controle animal que recolhe animais sem dono. No interior rural do Brasil, onde fica o Rancho Gaspar, quase nada disso existe. Não há um abrigo onde alguém possa deixar um gato em situação de rua. Há um veterinário próximo que faz castração a preço acessível, mas não há ninguém pago para resgatar e levar animais sem dono até ele — essa última etapa sempre cai sobre nós. Não há rede de resgate com capacidade para absorver um caso difícil. Quando um animal está com fome, ferido ou carregando mais uma ninhada não planejada, não há ninguém a caminho — e é exatamente esse vácuo que o Rancho Gaspar escolheu preencher.',
    backgroundTitle: 'Por que os gatos viraram o centro do trabalho',
    background:
      'Dentro desse vácuo, os gatos enfrentam um tipo adicional de vulnerabilidade. Mitos, desinformação e antigas superstições ainda afetam a forma como são tratados, especialmente os gatos pretos ou de pelagem escura. Enquanto alguns cães podem se tornar animais conhecidos da vizinhança — alimentados, observados, até batizados —, os gatos costumam ser menos visíveis, menos confiáveis aos olhos das pessoas e menos propensos a receber comida, proteção ou adoção.',
    callingTitle: 'De um gato a um chamado',
    calling:
      'O que começou com um gato querido da família — Tito — virou um chamado. Ele não era residente do santuário nem um projeto de resgate; era simplesmente da família. Mas o gato que havia chegado como abandonado se mostrou exatamente o tipo de animal que o estigma local insistia em negar: gentil, sociável e profundamente carinhoso. Quanto mais gatos e cães a família começou a notar ao redor, mais difícil ficou passar por eles sem fazer nada. A compaixão virou determinação, e a determinação virou rotina: encontrar o animal que ninguém mais ia buscar, levar ao veterinário, castrar e definir o próximo passo certo. Enfrentar a crise dos animais de companhia em situação de rua nesta parte do Brasil deixou de ser um hobby para virar trabalho de uma vida.',
    missionTitle: 'O que o Rancho Gaspar faz',
    mission:
      'O rancho existe porque nos recusamos a deixar animais maravilhosos sem cuidado, sofrendo ou se reproduzindo sem controle. Resgatamos, fazemos quarentena, avaliamos temperamento, oferecemos cuidados veterinários, castramos quando apropriado e buscamos o lar definitivo certo. Para alguns animais, isso significa adoção por uma família amorosa. Para outros, significa cuidado permanente no santuário.',
    ranchTitle: 'Um rancho de família com um propósito mais profundo',
    ranch:
      'Os responsáveis pelo santuário vivem entre os Estados Unidos e o Brasil, enquanto o rancho no Brasil é dedicado principalmente aos animais. O rancho foi construído por Julio Gaspar ao longo de cerca de vinte anos antes de seu falecimento, por isso tem um significado especial: é um monumento ao cuidado e ao esforço dele pela família, e agora também um lar seguro para animais da região de Mendonça que são mal compreendidos, passam fome, estão em risco ou podem continuar se reproduzindo sem ajuda.',
    scopeTitle: 'Gatos primeiro, mas não apenas gatos',
    scope:
      'Veja o Bart, o cão desta foto. Quando o encontramos pela primeira vez, ele tinha uma grande ferida perfurante no quarto traseiro direito, infestada por larvas de mosca — o tipo de ferida que vira rotina num lugar onde os cães de rua passam os dias brigando entre si ou com qualquer animal silvestre que cruzem. Cuidamos dele até se recuperar. Naquela mesma semana, encontramos outro animal de rua que havia se envolvido numa briga com um tamanduá. Os gatos formam a maior parte do nosso trabalho de resgate, mas cães e coelhos não são excluídos — quando podemos ajudar com segurança e responsabilidade, ajudamos. Algumas espécies ou situações podem não ser compatíveis com um rancho cheio de gatos, mas sempre estamos dispostos a ouvir o que está acontecendo e ver se podemos ajudar ou indicar um caminho.',
    communityTitle: 'Maior do que uma família',
    community:
      'Uma família só consegue carregar até certo ponto. O Rancho Gaspar foi construído desde o início para ir além de um único lar — registrado como organização sem fins lucrativos 501(c)(3) dos EUA, com sua sede financeira em Murrieta, na Califórnia, enquanto cada resgate, recuperação, castração e dia de cuidado do santuário acontece no rancho em Mendonça, São Paulo. Cada animal que recebemos não tem para onde ir, e cada animal é classificado dentro de uma política escrita: para adoção, por meio do nosso processo de solicitação e apresentação, ou residente permanente, quando idade, saúde ou temperamento tornam a adoção arriscada ou inadequada. A missão cresceu além do que uma única família consegue sustentar sozinha. Se você puder doar, apadrinhar um animal, ser voluntário, oferecer um lar temporário ou adotar, o alcance do santuário cresce com você.',
    residentTitle: 'Residentes atuais do santuário',
    residentBody:
      'Estes números vêm do nosso inventário de residentes, então refletem os animais atualmente marcados como residentes permanentes no site.',
    residentTotalLabel: 'residentes no total',
    speciesLabels: {
      cat: { singular: 'gato', plural: 'gatos' },
      dog: { singular: 'cão', plural: 'cães' },
      bunny: { singular: 'coelho', plural: 'coelhos' },
    },
    photos: {
      hero: 'Negresco e Negresca, dois dos gatos sob nossos cuidados',
      safetyNet:
        'Uma jovem em uma escada estende a mão sobre um muro alto de tijolos em direção a dois gatos pretos',
      calling:
        'Tito, um gato chocolate-point de olhos azuis brilhantes, enroscado em uma caminha felpuda creme e rosa',
      background: 'gatos resgatados',
      mission: 'cuidados veterinários',
      ranch: 'o rancho',
      scope:
        'Bart, um cão marrom de pelo curto com uma pequena mancha branca no peito, sentado em piso azulejado e olhando para a câmera com um sorriso de boca aberta',
      community:
        'Gatão, um gato laranja e branco sentado em pisos de terracota ao lado de flores rosas vibrantes',
    },
    locationsTitle: 'Onde atuamos',
    locationsBody:
      'Nosso trabalho abrange dois países — os animais são cuidados no Brasil, enquanto a organização tem base nos Estados Unidos.',
    locationSanctuaryTitle: 'Santuário',
    locationSanctuaryBody:
      'Mendonça, São Paulo — onde acontece todo o resgate, a recuperação e o cuidado do santuário.',
    locationHqTitle: 'Sede',
    locationHqBody:
      'O Rancho Gaspar é uma organização sem fins lucrativos dos EUA; sua sede financeira fica em Murrieta, Califórnia.',
  },
  profile: {
    aboutEyebrow: 'A história',
    aboutHeading: 'Conheça', // exibido como "Conheça {name}"
    quickFacts: 'Informações',
    fee: 'Taxa de adoção',
    apply: 'Quero adotar', // exibido como "Quero adotar {name}"
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
        q: '2. Conversamos por vídeo',
        a: 'Uma videochamada de 20 minutos para tirar suas dúvidas e garantir que é o par certo.',
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
    adoptedTitle: 'Adotado para um lar amoroso',
    adoptedBody:
      'Este queridinho encontrou sua família para sempre. Conheça os outros que ainda procuram um lar.',
    memorialTitle: 'Em memória',
    memorialBody:
      'Para sempre parte da família do Rancho Gaspar. Obrigado pela alegria que você nos deu.',
  },
  comingSoon: {
    badge: 'Em breve',
    heading: 'Esta página está a caminho',
    body: 'Somos uma pequena família construindo o site do Rancho Gaspar página por página. Enquanto esta fica pronta, conheça nossos animais ou fale com a gente — vamos adorar seu contato.',
    ctaAnimals: 'Conheça nossos animais',
    ctaContact: 'Envie um e-mail',
  },
  construction: {
    label: 'Atenção',
    body: 'Nosso site ainda está em construção — os perfis dos animais estão sendo adicionados, nossa aprovação 501(c)(3) está pendente e ainda não podemos receber doações. Obrigado pela paciência.',
  },
  common: {
    learnMore: 'Saiba mais',
  },
};

export const ui = { en, 'pt-br': ptBr };
export type Lang = keyof typeof ui;
