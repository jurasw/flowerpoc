import type { Dictionary } from '#/lib/i18n/dictionaries/en'

export const pl: Dictionary = {
  meta: {
    rootTitle: 'Cyfrowa Róża',
    homeTitle: (productName: string): string =>
      `${productName} — Wyślij różę, która trwa`,
    homeDescription:
      'Wyślij spersonalizowaną cyfrową różę z prywatną wiadomością. Jedna płatność, jeden link, pięć dni piękna.',
  },
  header: {
    nav: {
      howItWorks: 'Jak to działa',
      features: 'Funkcje',
      pricing: 'Cennik',
    },
    cta: 'Wyślij różę',
  },
  hero: {
    titleLineOne: 'Wyślij różę,',
    titleLineTwo: 'która trwa.',
    description:
      'Ręcznie wyrenderowana cyfrowa róża wraz z wiadomością przeznaczoną tylko dla tej jednej osoby. Skomponuj, zapłać raz i udostępnij prywatny link, którego nigdy nie zapomną.',
    primaryCta: 'Stwórz swoją różę',
    secondaryCta: 'Zobacz, jak to działa',
  },
  valueStrip: {
    privateLink: {
      label: 'Prywatny link',
      description: 'Otworzy go tylko ta jedna osoba',
    },
    freshness: {
      label: (days: number): string => `${days} dni świeżości`,
      description: 'Róża, która więdnie z czasem',
    },
    personalMessage: {
      label: 'Osobista wiadomość',
      description: 'Słowa przeznaczone dla jednej osoby',
    },
  },
  howItWorks: {
    eyebrow: 'Jak to działa',
    title: 'Trzy kroki do czegoś niezapomnianego',
    steps: {
      compose: {
        title: 'Skomponuj',
        description:
          'Wpisz jej lub jego imię, swoje imię oraz wiadomość, którą przeczyta tylko ta osoba.',
      },
      pay: {
        title: 'Zapłać',
        description:
          'Jedna prosta płatność. Bez subskrypcji, bez zakładania konta.',
      },
      share: {
        title: 'Udostępnij',
        description:
          'Skopiuj prywatny link i wyślij go SMS-em, e-mailem lub w dowolny inny sposób.',
      },
    },
  },
  features: {
    eyebrow: 'Funkcje',
    title: 'Coś więcej niż wiadomość',
    subtitle:
      'Cyfrowy prezent, który jest przemyślany, piękny i głęboko osobisty.',
    rose: {
      title: 'Ręcznie wyrenderowana róża 3D',
      description:
        'Piękna róża, którą można obracać i podziwiać z każdej strony w przeglądarce.',
    },
    message: {
      title: 'Wiadomość tylko dla tej osoby',
      description:
        'Twoje słowa pojawiają się na eleganckiej karcie pod różą — intymnie i osobiście.',
    },
    ephemeral: {
      title: 'Ulotna z założenia',
      description: (days: number): string =>
        `Każda róża pozostaje świeża przez ${days} dni, a potem delikatnie więdnie — jak prawdziwa.`,
    },
    link: {
      title: 'Jeden prywatny link',
      description:
        'Nie trzeba nic instalować. Wyślij jeden link, a róża pojawi się natychmiast.',
    },
  },
  pricing: {
    eyebrow: 'Cennik',
    title: 'Jedna róża. Jedna chwila.',
    oneTimePayment: 'Płatność jednorazowa',
    included: {
      rose: 'Jedna spersonalizowana cyfrowa róża 3D',
      card: 'Karta z prywatną wiadomością',
      link: 'Link do udostępnienia — bez aplikacji',
      freshness: (days: number): string => `${days} dni świeżości`,
    },
    cta: 'Stwórz swoją różę',
  },
  footer: {
    tagline: 'Cyfrowy prezent dla kogoś, kto zasługuje na więcej niż SMS.',
  },
  createForm: {
    eyebrow: 'Stwórz',
    title: 'Skomponuj swoją różę',
    subtitle:
      'Uzupełnij poniższe pola. Po płatności otrzymasz prywatny link do udostępnienia.',
    canceledNotice:
      'Płatność została anulowana. Twoja róża wciąż czeka — kontynuuj od miejsca, w którym skończono.',
    finalizingNotice: 'Finalizujemy Twoją różę…',
    senderLabel: 'Twoje imię',
    senderPlaceholder: 'Alex',
    recipientLabel: 'Imię odbiorcy',
    recipientPlaceholder: 'Ktoś wyjątkowy',
    messageLabel: 'Twoja wiadomość',
    messagePlaceholder: 'Napisz coś, co przeczyta tylko ta jedna osoba...',
    payButton: (price: string): string => `Zapłać ${price} i stwórz różę`,
    redirecting: 'Przekierowanie do płatności…',
    errors: {
      verifyFailed:
        'Nie udało się zweryfikować płatności. Skontaktuj się z pomocą techniczną.',
      stillPreparing:
        'Płatność otrzymana, ale Twoja róża jest jeszcze przygotowywana. Odśwież za chwilę.',
      checkoutFailed:
        'Nie udało się rozpocząć płatności. Spróbuj ponownie.',
    },
    preview: {
      label: 'Podgląd',
      caption: (days: number): string =>
        `Przeciągnij, aby obrócić. Każda róża pozostaje świeża przez ${days} dni od chwili utworzenia linku.`,
    },
  },
  checkoutSuccess: {
    title: 'Twoja róża jest gotowa.',
    subtitle: 'Skopiuj poniższy link i wyślij go e-mailem lub SMS-em.',
    copy: 'Kopiuj link',
    copied: 'Skopiowano',
    previewLink: 'Zobacz, co zobaczy odbiorca →',
  },
  flower: {
    forRecipient: (name: string): string => `Dla ${name}`,
    senderGaveRoseSuffix: ' podarował Ci różę',
    sendYourOwn: 'Wyślij własną różę',
    freshness: {
      wilted: 'Zwiędła',
      bloomedOn: (date: string): string => `Zakwitła ${date}`,
      daysLeft: (days: number): string =>
        days === 1 ? 'Został 1 dzień' : `Zostało ${days} dni`,
      wiltedAria: (days: number, bloomedOn: string): string =>
        `Zwiędła po ${days} dniach. Zakwitła ${bloomedOn}`,
      freshAria: (days: number, bloomedOn: string): string =>
        `Pozostało ${days} dni świeżości. Zakwitła ${bloomedOn}`,
    },
  },
  notFound: {
    title: 'Ta róża zwiędła',
    description: 'Link może być błędny albo ta róża nigdy nie została zasadzona.',
    cta: 'Wyślij nową różę',
  },
  checkout: {
    productName: 'Cyfrowa Róża',
    productDescription: (days: number): string =>
      `Spersonalizowana cyfrowa róża z prywatną wiadomością. Świeża przez ${days} dni.`,
  },
}
