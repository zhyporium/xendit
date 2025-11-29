export declare namespace XenditAPI {
  // ============================================================================
  // Common Types
  // ============================================================================

  type Country = "ID" | "PH" | "VN" | "TH" | "SG" | "MY";

  type Currency = "IDR" | "PHP" | "VND" | "THB" | "SGD" | "MYR" | "USD";

  type SessionType = "SAVE" | "PAY";

  type CustomerType = "INDIVIDUAL" | "BUSINESS";

  type AllowSavePaymentMethod = "DISABLED" | "OPTIONAL" | "FORCED";

  type CaptureMethod = "AUTOMATIC" | "MANUAL";

  type Mode = "PAYMENT_LINK" | "CARDS_SESSION_JS";

  type AllowedPaymentChannels = "CARDS" | "BRI_DIRECT_DEBIT" | "DANA";

  type ItemType =
    | "DIGITAL_PRODUCT"
    | "PHYSICAL_PRODUCT"
    | "DIGITAL_SERVICE"
    | "PHYSICAL_SERVICE"
    | "FEE";

  type SessionStatus = "ACTIVE" | "COMPLETED" | "EXPIRED" | "CANCELED";

  type BusinessType =
    | "SOLE_PROPRIETORSHIP"
    | "PARTNERSHIP"
    | "COOPERATIVE"
    | "TRUST"
    | "NON_PROFIT"
    | "GOVERNMMENT"
    | "CORPORATION";

  type AddressCategory = "HOME" | "WORK" | "PROVINCIAL";

  type Gender = "MALE" | "FEMALE" | "OTHER";

  type KYCDocumentType =
    | "BIRTH_CERTIFICATE"
    | "BANK_STATEMENT"
    | "DRIVING_LICENSE"
    | "IDENTITY_CARD"
    | "PASSPORT"
    | "VISA"
    | "BUSINESS_REGISTRATION"
    | "BUSINESS_LICENSE";

  type KYCDocumentSubType =
    | "NATIONAL_ID"
    | "CONSULAR_ID"
    | "VOTER_ID"
    | "POSTAL_ID"
    | "RESIDENCE_PERMIT"
    | "TAX_ID"
    | "STUDENT_ID"
    | "MILITARY_ID"
    | "MEDICAL_ID"
    | "OTHERS";

  // ============================================================================
  // Shared Interfaces
  // ============================================================================

  interface Session {
    payment_sessions_id: string;
    created: string;
    updated: string;
    reference_id: string;
    customer_id: string;
    session_type: SessionType;
    allow_save_payment_method: AllowSavePaymentMethod;
    currency: Currency;
    amount: number;
    country: Country;
    mode: Mode;
    capture_method: CaptureMethod;
    channel_properties: Record<string, any>;
    allowed_payment_channels: AllowedPaymentChannels[];
    expires_at: string;
    locale: "en";
    metadata: Record<string, any>;
    items:
      | {
          reference_id: string;
          type?: ItemType;
          name: string;
          net_unit_amount: number;
          quantity: number;
          url: string;
          image_url: string;
          category: string;
          subcategory: string;
          description: string;
          metadata: Record<string, any>;
        }[]
      | null;
    success_return_url: string;
    cancel_return_url: string;
    status: SessionStatus;
    payment_link_url: string | null;
    payment_token_id: string | null;
    payment_id: string | null;
    payment_request_id: string | null;
    business_id: string;
  }

  interface Customer {
    id: string;
    reference_id: string;
    type: CustomerType;
    individual_detail: {
      given_names: string;
      surname: string | null;
      nationality: string | null;
      place_of_birth: string | null;
      date_of_birth: string | null;
      gender: Gender | null;
      employment: {
        employer_name: string;
        nature_of_business: string;
        role_description: string;
      } | null;
    };
    business_detail: {
      business_name: string;
      trading_name: string | null;
      business_type: SessionStatus;
      nature_of_business: string | null;
      business_domicile: string | null;
      date_of_registration: string | null;
    };
    mobile_number: string | null;
    phone_number: string | null;
    hashed_mobile_number: string | null;
    email: string | null;
    addresses: {
      country: Country;
      street_line1: string;
      street_line2: string;
      city: string;
      province_state: string;
      postal_code: string;
      category: AddressCategory;
      is_primary: boolean;
    }[];
    identity_accounts: {
      type: "CREDIT_CARD" | "DEBIT_CARD" | "BANK_ACCOUNT";
      company: string;
      description: string;
      country: Country;
      properties: Record<string, any>;
    }[];
    kyc_documents: {
      country: Country;
      type: KYCDocumentType;
      sub_type: KYCDocumentSubType;
      document_name: string;
      document_number: string;
      expires_at: string | null;
      holder_name: string;
      document_images: string[];
    }[];
    description: string | null;
    date_of_registration: string;
    domicile_of_registration: string;
    metadata: Record<string, any>;
    created: string;
    updated: string;
  }

  // ============================================================================
  // Response Interfaces
  // ============================================================================

  // ============================================================================
  // Routes
  // ============================================================================

  interface Routes {
    GET: {
      "/sessions/[session_id]": {
        headers?: {
          "for-user-id"?: string;
        };
        params: {
          session_id: string;
        };
        response: Session;
      };
      "/customers": {
        headers?: {
          "api-version"?: "2020-10-31" | "2020-05-19";
          "for-user-id"?: string;
        };
        query: {
          reference_id: string;
        };
        response: {
          data: Customer[];
          has_more: boolean;
        };
      };
      "/customers/[customer_id]": {
        headers?: {
          "api-version"?: "2020-10-31" | "2020-05-19";
          "for-user-id"?: string;
        };
        params: {
          customer_id: string;
        };
        response: Customer;
      };
    };
    POST: {
      "/sessions": {
        headers?: {
          "for-user-id"?: string;
        };
        body: {
          reference_id: string;
          customer_id: string;
          customer: {
            type: CustomerType;
            id: string;
            email: string | null;
            mobile_number: string | null;
            phone_number: string | null;
            individual_detail: {
              given_names: string;
              surname: string | null;
            } | null;
            business_detail: {
              business_name: string;
            } | null;
          } | null;
          session_type: SessionType;
          allow_save_payment_method: AllowSavePaymentMethod;
          currency: Currency;
          amount: number;
          mode: Mode;
          capture_method?: CaptureMethod;
          country: Country;
          channel_properties?: Record<string, any>;
          allowed_payment_channels?: AllowedPaymentChannels[];
          expires_at?: string;
          locale?: "en";
          metadata?: Record<string, any>;
          description?: string;
          items?:
            | {
                reference_id: string;
                type?: ItemType;
                name: string;
                net_unit_amount: number;
                quantity: number;
                url?: string;
                image_url?: string;
                category: string;
                subcategory?: string;
                description?: string;
                metadata?: Record<string, any>;
              }[]
            | null;
          success_return_url?: string;
          cancel_return_url?: string;
        };
        response: Session;
      };
      "/sessions/[session_id]/cancel": {
        headers?: {
          "for-user-id"?: string;
        };
        params: {
          session_id: string;
        };
        response: Session;
      };
      "/customers": {
        headers?: {
          "idempotency-key"?: string;
          "api-version"?: "2020-10-31" | "2020-05-19";
          "for-user-id"?: string;
        };
        body: {
          individual_detail: {
            given_names: string;
            surname: string | null;
            nationality: string | null;
            place_of_birth: string | null;
            date_of_birth: string | null;
            gender: Gender | null;
            employment: {
              employer_name: string;
              nature_of_business: string;
              role_description: string;
            } | null;
          };
          business_detail?: {
            business_name: string;
            trading_name: string | null;
            business_type: BusinessType;
            nature_of_business: string | null;
            business_domicile: string | null;
            date_of_registration: string | null;
          };
          mobile_number?: string | null;
          phone_number?: string | null;
          email?: string | null;
          addresses?: {
            country: Country;
            street_line1: string;
            street_line2: string;
            city: string;
            province_state: string;
            postal_code: string;
            category: AddressCategory;
            is_primary: boolean;
          }[];
          kyc_documents?: {
            country: Country;
            type: KYCDocumentType;
            sub_type: KYCDocumentSubType;
            document_name: string;
            document_number: string;
            expires_at: string | null;
            holder_name: string;
            document_images: string[];
          };
          description?: string | null;
          domicile_of_registration?: string;
          metadata?: Record<string, any>;
        };
        response: Customer;
      };
    };
    PATCH: {};
    PUT: {};
    DELETE: {};
  }
}
