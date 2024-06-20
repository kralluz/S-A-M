const received = `
===========================
===========================
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "360613873791501",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "15556037613",
              "phone_number_id": "271738132700382"
            },
            "contacts": [
              {
                "profile": {
                  "name": "Carlos"
                },
                "wa_id": "556285401969"
              }
            ],
            "messages": [
              {
                "from": "556285401969",
                "id": "wamid.HBgMNTU2Mjg1NDAxOTY5FQIAEhgUM0FDQzcxRTBEMDFFNkU0NjlFMjkA",
                "timestamp": "1717273047",
                "text": {
                  "body": "Olá"
                },
                "type": "text"
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
===========================
===========================`



const send = `
===========================
===========================
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "360613873791501",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "15556037613",
              "phone_number_id": "271738132700382"
            },
            "statuses": [
              {
                "id": "wamid.HBgMNTU2Mjg1NDAxOTY5FQIAERgSNUNFRkEyMzM2OUU1RkU2OEZCAA==",
                "status": "delivered",
                "timestamp": "1717273328",
                "recipient_id": "556285401969",
                "conversation": {
                  "id": "bb4ee1567f9e07f12b25bc2402b03f47",
                  "origin": {
                    "type": "service"
                  }
                },
                "pricing": {
                  "billable": true,
                  "pricing_model": "CBP",
                  "category": "service"
                }
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
===========================
===========================
`

const desconhecido = `
===========================
===========================
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "360613873791501",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "15556037613",
              "phone_number_id": "271738132700382"
            },
            "statuses": [
              {
                "id": "wamid.HBgMNTU2Mjg1NDAxOTY5FQIAERgSNUNFRkEyMzM2OUU1RkU2OEZCAA==",
                "status": "read",
                "timestamp": "1717273329",
                "recipient_id": "556285401969"
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
===========================
===========================
`


const desconhecido2 = `

===========================
===========================
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "360613873791501",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "15556037613",
              "phone_number_id": "271738132700382"
            },
            "statuses": [
              {
                "id": "wamid.HBgMNTU2Mjg1NDAxOTY5FQIAERgSNUNFRkEyMzM2OUU1RkU2OEZCAA==",
                "status": "sent",
                "timestamp": "1717273328",
                "recipient_id": "556285401969",
                "conversation": {
                  "id": "bb4ee1567f9e07f12b25bc2402b03f47",
                  "expiration_timestamp": "1717277220",
                  "origin": {
                    "type": "service"
                  }
                },
                "pricing": {
                  "billable": true,
                  "pricing_model": "CBP",
                  "category": "service"
                }
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
===========================
===========================
`

const button_reply = `
===========================
===========================
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "360613873791501",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "15556037613",
              "phone_number_id": "271738132700382"
            },
            "contacts": [
              {
                "profile": {
                  "name": "Carlos"
                },
                "wa_id": "556285401969"
              }
            ],
            "messages": [
              {
                "context": {
                  "from": "15556037613",
                  "id": "wamid.HBgMNTU2Mjg1NDAxOTY5FQIAERgSNUNFRkEyMzM2OUU1RkU2OEZCAA=="
                },
                "from": "556285401969",
                "id": "wamid.HBgMNTU2Mjg1NDAxOTY5FQIAEhgUM0E2QUZFOUZEQUZBQkE1QTgwREIA", 
                "timestamp": "1717273490",
                "type": "interactive",
                "interactive": {
                  "type": "button_reply",
                  "button_reply": {
                    "id": "botao1",
                    "title": "Opção 1"
                  }
                }
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
===========================
===========================
`

const list_reply = `
===========================
===========================
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "360613873791501",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "15556037613",
              "phone_number_id": "271738132700382"
            },
            "contacts": [
              {
                "profile": {
                  "name": "Carlos"
                },
                "wa_id": "556285401969"
              }
            ],
            "messages": [
              {
                "context": {
                  "from": "15556037613",
                  "id": "wamid.HBgMNTU2Mjg1NDAxOTY5FQIAERgSQUUyQTUzNUUyQjRFRUYzNDIyAA=="
                },
                "from": "556285401969",
                "id": "wamid.HBgMNTU2Mjg1NDAxOTY5FQIAEhgUM0E2NEIyMTVDQTA4Q0I2RTA0NzgA", 
                "timestamp": "1717273594",
                "type": "interactive",
                "interactive": {
                  "type": "list_reply",
                  "list_reply": {
                    "id": "opcao1",
                    "title": "Opção 1",
                    "description": "Descrição da Opção 1"
                  }
                }
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
===========================
===========================
`