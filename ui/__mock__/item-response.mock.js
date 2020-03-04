export const ITEM_RESPONSE_MOCK = {
  data: {
    results: {
      author: {
        name: 'Severino'
      },
      item: {
        id: 'MLA614344429',
        title: 'Tabla De Skate Prof. Century + Lija. Envíos A Todo El País.',
        price: {
          amount: 1499,
          currency: '$',
          decimals: 2
        },
        picture: 'http://mla-s2-p.mlstatic.com/649995-MLA32894930389_112019-O.jpg',
        condition: 'new',
        free_shipping: false,
        sold_quantity: 500,
        description: 'Produto muito bonito'
      },
      categories: ['Category 1', 'Category 2']
    }
  }
}

export const ITEM_LIST_RESPONSE_1 = {
  data: {
    results: [
      {
        author: {
          name: 'Severino'
        },
        items: [
          {
            id: 'MLA758701025',
            title: 'Carabina com pontaria certeira',
            price: { amount: 1690.65, currency: '$', decimals: 2},
            picture:
              'http://mla-s2-p.mlstatic.com/679688-MLA31036336393_062019-I.jpg',
            condition: 'new',
            free_shipping: true,
            state_name: 'Buenos Aires',
          }
        ],
        categories: ['Category 1', 'Category 2']
      }
    ]
  }
}

export const ITEM_LIST_RESPONSE_2 = {
  data: {
    results: [
      {
        author: {
          name: 'Maria Bonita'
        },
        items: [
          {
            id: 'MLA758701035',
            title: 'Peixeira bem afiada',
            price: { amount: 50.65, currency: '$', decimals: 2},
            picture:
              'http://mla-s2-p.mlstatic.com/679688-MLA31036336393_062019-I.jpg',
            condition: 'new',
            free_shipping: true,
            state_name: 'Buenos Aires',
          }
        ],
        categories: ['Category 1', 'Category 2']
      }
    ]
  }
}
