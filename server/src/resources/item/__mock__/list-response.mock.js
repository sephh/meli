export const RAW_DATA = {
  site_id: 'MLA',
  query: 'tabua',
  paging: { total: 32896, offset: 0, limit: 50, primary_results: 1000 },
  results: [
    {
      id: 'MLA758701025',
      site_id: 'MLA',
      title: 'Vela Kayak Sail 118 Cm Bolso Canoa Kayak Tabla Sup Inflable',
      seller: {
        id: 15342249,
        permalink: null,
        power_seller_status: 'platinum',
        car_dealer: false,
        real_estate_agency: false,
        tags: []
      },
      price: 1690.65,
      currency_id: 'ARS',
      available_quantity: 1,
      sold_quantity: 50,
      buying_mode: 'buy_it_now',
      listing_type_id: 'gold_special',
      stop_time: '2038-12-26T19:12:35.000Z',
      condition: 'new',
      permalink:
        'https://articulo.mercadolibre.com.ar/MLA-758701025-vela-kayak-sail-118-cm-bolso-canoa-kayak-tabla-sup-inflable-_JM',
      thumbnail:
        'http://mla-s2-p.mlstatic.com/679688-MLA31036336393_062019-I.jpg',
      accepts_mercadopago: true,
      installments: {
        quantity: 12,
        amount: 230.73,
        rate: 63.77,
        currency_id: 'ARS'
      },
      address: {
        state_id: 'AR-B',
        state_name: 'Buenos Aires',
        city_id: 'TUxBQ01FUmUyYWZl',
        city_name: 'Merlo'
      },
      shipping: {
        free_shipping: false,
        mode: 'me2',
        tags: ['fulfillment', 'self_service_in'],
        logistic_type: 'fulfillment',
        store_pick_up: true
      },
      seller_address: {
        id: '',
        comment: '',
        address_line: '',
        zip_code: '',
        country: { id: 'AR', name: 'Argentina' },
        state: { id: 'AR-B', name: 'Buenos Aires' },
        city: { id: 'TUxBQ01FUmUyYWZl', name: 'Merlo' },
        latitude: '',
        longitude: ''
      },
      attributes: [
        {
          value_name: 'Sail',
          value_struct: null,
          values: [{ id: '2672690', name: 'Sail', struct: null, source: 1572 }],
          attribute_group_name: 'Otros',
          id: 'BRAND',
          value_id: '2672690',
          source: 1572,
          name: 'Marca',
          attribute_group_id: 'OTHERS'
        },
        {
          id: 'ITEM_CONDITION',
          name: 'Condición del ítem',
          value_struct: null,
          values: [
            { id: '2230284', name: 'Nuevo', struct: null, source: 1572 }
          ],
          attribute_group_id: 'OTHERS',
          source: 1572,
          value_id: '2230284',
          value_name: 'Nuevo',
          attribute_group_name: 'Otros'
        },
        {
          name: 'Modelo',
          value_struct: null,
          values: [
            { id: null, name: 'SAIL KAYAK', struct: null, source: 1572 }
          ],
          attribute_group_name: 'Otros',
          source: 1572,
          id: 'MODEL',
          value_id: null,
          value_name: 'SAIL KAYAK',
          attribute_group_id: 'OTHERS'
        }
      ],
      original_price: null,
      category_id: 'MLA411940',
      official_store_id: null,
      catalog_product_id: null,
      tags: [
        'brand_verified',
        'good_quality_picture',
        'good_quality_thumbnail',
        'loyalty_discount_eligible',
        'immediate_payment',
        'cart_eligible'
      ]
    }
  ]
}

export const PARSED_DATA = [
  {
    author: 15342249,
    items: [
      {
        id: 'MLA758701025',
        title: 'Vela Kayak Sail 118 Cm Bolso Canoa Kayak Tabla Sup Inflable',
        price: { amount: 1690.65, currency: 'ARS'},
        picture:
          'http://mla-s2-p.mlstatic.com/679688-MLA31036336393_062019-I.jpg',
        condition: 'new',
        free_shipping: false,
        state_name: 'Buenos Aires',
      }
    ],
    categories: { MLA411940: 1 }
  }
]
