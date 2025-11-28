export declare namespace XenditAPI {
  // ============================================================================
  // Common Types
  // ============================================================================

  /**
   * ISO 3166-1 alpha-2 two-letter country code for the countr.
   */
  type Country = "ID" | "PH" | "VN" | "TH" | "SG" | "MY";

  /**
   * ISO 4217 three-letter currency code for the payment.
   */
  type Currency = "IDR" | "PHP" | "VND" | "THB" | "SGD" | "MYR" | "USD";

  // ============================================================================
  // Shared Interfaces
  // ============================================================================

  // ============================================================================
  // Response Interfaces
  // ============================================================================

  // ============================================================================
  // Routes
  // ============================================================================

  interface Routes {
    GET: {
      "/v3/payment_requests/[payment_request_id]": {
        headers?: {
          "api-version"?: "2024-11-11";
        };
        params: {
          /**
           * The ID of the payment request.
           *
           * @example "pr-8877c08a-740d-4153-9816-3d744ed197a5"
           */
          payment_request_id: string;
        };
        response: {
          /**
           * Xendit-generated identifier for the business that owns the transaction
           *
           * @example "5f27a14a9bf05c73dd040bc8"
           */
          business_id: string;
          /**
           * A reference ID from merchants to identify their request. For "CARDS" channel code, reference ID must be unique.
           */
          reference_id: string;
          /**
           * Xendit unique Payment Request ID generated as reference after creation of payment request.
           *
           * @example "pr-1102feb0-bb79-47ae-9d1e-e69394d3949c"
           */
          payment_request_id: string;
          /**
           * Xendit unique Payment Token ID generated as reference for reusable payment details of the end user.
           *
           * @example "pt-cc3938dc-c2a5-43c4-89d7-7570793348c2"
           */
          payment_token_id: string;
          /**
           * Xendit unique Capture ID generated as reference for the end user
           *
           * @example "cust-b98d6f63-d240-44ec-9bd5-aa42954c4f48"
           */
          customer_id: string;
          /**
           * Latest Payment ID linked to the payment request.
           */
          latest_payment_id: string;
          /**
           * The payment collection intent type for the payment request.
           *
           * **PAY**: Create a payment request that is able to receive one payment.
           *
           * **PAY_AND_SAVE**: Create a payment request that is able to receive one payment. If the payment is successful, a reusable payment token will be returned for subsequent payment requests.
           *
           * **REUSABLE_PAYMENT_CODE**: Create a payment request that is able to receive multiple payments. This is only used for repeat use payment method like a static QR, a predefined OTC payment code or a predefined Virtual Account number.
           */
          type: "PAY" | "PAY_AND_SAVE" | "REUSABLE_PAYMENT_CODE";
          /**
           * ISO 3166-1 alpha-2 two-letter country code for the country of transaction.
           */
          country: Country;
          /**
           * ISO 4217 three-letter currency code for the payment.
           */
          currency: Currency;
          /**
           * The intended payment amount to be collected from the end user.
           */
          request_amount: number;
          /**
           * **AUTOMATIC**: payment capture will be processed immediately after payment request is created.
           *
           * **MANUAL**: payment capture requires merchant's trigger via payment capture endpoint before being processed
           */
          capture_method: "AUTOMATIC" | "MANUAL";
          /**
           * Channel code used to select the payment method provider.
           */
          channel_code: string;
          /**
           * Data required to initiate transaction with payment method provider.
           */
          channel_properties: Record<string, any>;
          /**
           * Actions object contains possible next steps merchants can take to proceed with payment collection from end user
           */
          actions: {
            /**
             * The type of action that merchant system will need to handle to complete payment.
             */
            type:
              | "PRESENT_TO_CUSTOMER"
              | "REDIRECT_CUSTOMER"
              | "API_POST_REQUEST";
            /**
             * The type of action that merchant system will need to handle to complete payment.
             */
            descriptor:
              | "CAPTURE_PAYMENT"
              | "PAYMENT_CODE"
              | "QR_STRING"
              | "VIRTUAL_ACCOUNT_NUMBER"
              | "WEB_URL"
              | "DEEPLINK_URL"
              | "VALIDATE_OTP"
              | "RESEND_OTP";
            value: string;
          }[];
          /**
           * Status of the payment request.
           */
          status:
            | "ACCEPTING_PAYMENTS"
            | "REQUIRES_ACTION"
            | "AUTHORIZED"
            | "CANCELED"
            | "EXPIRED"
            | "SUCCEEDED"
            | "FAILED";
          /**
           * Failure codes for payments.
           */
          failure_code:
            | "ACCOUNT_ACCESS_BLOCKED"
            | "INVALID_MERCHANT_SETTINGS"
            | "INVALID_ACCOUNT_DETAILS"
            | "PAYMENT_ATTEMPT_COUNTS_EXCEEDED"
            | "USER_DEVICE_UNREACHABLE"
            | "CHANNEL_UNAVAILABLE"
            | "INSUFFICIENT_BALANCE"
            | "ACCOUNT_NOT_ACTIVATED"
            | "INVALID_TOKEN"
            | "SERVER_ERROR"
            | "PARTNER_TIMEOUT_ERROR"
            | "TIMEOUT_ERROR"
            | "USER_DECLINED_PAYMENT"
            | "USER_DID_NOT_AUTHORIZE"
            | "PAYMENT_REQUEST_EXPIRED"
            | "FAILURE_DETAILS_UNAVAILABLE"
            | "EXPIRED_OTP"
            | "INVALID_OTP"
            | "PAYMENT_AMOUNT_LIMITS_EXCEEDED"
            | "OTP_ATTEMPT_COUNTS_EXCEEDED"
            | "CARD_DECLINED"
            | "DECLINED_BY_ISSUER"
            | "ISSUER_UNAVAILABLE"
            | "INVALID_CVV"
            | "DECLINED_BY_PROCESSOR"
            | "CAPTURE_AMOUNT_EXCEEDED "
            | "AUTHENTICATION_FAILED";
          /**
           * A custom description for the Payment Request.
           *
           * @example "Payment for your order #123"
           */
          description: string;
          /**
           * Key-value entries for your custom data. You can specify up to 50 keys, with key names up to 40 characters and values up to 500 characters. This is for your convenience. Xendit will not use this data for any processing.
           *
           * @example { "my_custom_id": "merchant-123", "my_custom_order_id": "order-123" }
           */
          metadata: Record<string, string>;
          /**
           * Array of objects describing the item/s attached to the payment.
           */
          items: {
            /**
             * Merchant provided identifier for the item
             */
            reference_id: string;
            /**
             * Type of item
             */
            type:
              | "DIGITAL_PRODUCT"
              | "PHYSICAL_PRODUCT"
              | "DIGITAL_SERVICE"
              | "PHYSICAL_SERVICE"
              | "FEE";
            name: string;
            /**
             * Net amount to be charged per unit
             */
            net_unit_amount: number;
            /**
             * Number of units of this item in the basket
             */
            quantity: number;
            /**
             * URL of the item. Must be HTTPS or http
             */
            url: `${"https" | "http"}://${string}`;
            /**
             * URL of the image of the item. Must be HTTPS or http
             */
            image_url: `${"https" | "http"}://${string}`;
            /**
             * Category of the item
             */
            category: string;
            /**
             * Subcategory of the item
             */
            subcategory: string;
            /**
             * Description of the item
             */
            description: string;

            /**
             * Key-value entries for your custom data. You can specify up to 50 keys, with key names up to 40 characters and values up to 500 characters. This is for your convenience. Xendit will not use this data for any processing.
             *
             * @example { "my_custom_id": "merchant-123", "my_custom_order_id": "order-123" }
             */
            metadata: Record<string, string>;
          }[];
          shipping_information: {
            /**
             * 2-letter ISO 3166-2 country code for the customer’s shipping country
             */
            country: Country;
            /**
             * Building name and apartment unit number
             */
            street_line1: string;
            /**
             * Building street address
             */
            street_line2: string;
            /**
             * City, village or town as appropriate
             */
            city: string;
            /**
             * Either one of (whichever is applicable): Geographic area, province, or region / Formal state designation within country
             */
            province_state: string;
            /**
             * Postal, zip or rural delivery code, if applicable
             */
            postal_code: string;
          };
          /**
           * ISO 8601 date-time format.
           */
          created: string;
          /**
           * ISO 8601 date-time format.
           */
          updated: string;
        };
      };
    };
    POST: {};
    PATCH: {};
    PUT: {};
    DELETE: {};
  }
}
