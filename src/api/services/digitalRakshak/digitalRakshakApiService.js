import BaseApiService from '../base/BaseApiService';

export class DigitalRakshakApiService extends BaseApiService {
  /**
   * 2. Mobile Silent Verification
   * POST /api/v1/phones/phone-kyc-non-consent
   */
  async mobileSilentVerification(data, headers = {}) {
    return await this.post('/api/v1/phones/phone-kyc-non-consent', data, { headers });
  }

  /**
   * 3. Mobile Verification with OTP - Generate OTP
   * POST /api/v1/phone/generateOtp
   */
  async generateOtp(data, headers = {}) {
    return await this.post('/api/v1/phone/generateOtp', data, { headers });
  }

  /**
   * 4. Geo Fencing
   * POST /api/v1/patrons/riskscores
   */
  async geoFencing(data, headers = {}) {
    return await this.post('/api/v1/patrons/riskscores', data, { headers });
  }

  /**
   * 5. Reverse Geocode
   * POST /api/v1/geocoding/reverse-geocode
   */
  async reverseGeocode(data, headers = {}) {
    return await this.post('/api/v1/geocoding/reverse-geocode', data, { headers });
  }

  /**
   * 6. KYC OCR Plus
   * POST /api/v1/utility/single-kyc
   */
  async kycOcrPlus(data, headers = {}) {
    return await this.post('/api/v1/utility/single-kyc', data, { headers });
  }

  /**
   * 7. Dynamic Bank Account Verification — Penny Drop
   * POST /api/v1-variablepennydrop/bankaccountverifications/advancedverification
   */
  async bankPennyDrop(data, headers = {}) {
    return await this.post('/api/v1-variablepennydrop/bankaccountverifications/advancedverification', data, { headers });
  }

  /**
   * 8. Dynamic Bank Account Verification — Verify Amount
   * POST /api/v1-variablepennydrop/bankaccountverification/verifytransferadvanced
   */
  async bankVerifyAmount(data, headers = {}) {
    return await this.post('/api/v1-variablepennydrop/bankaccountverification/verifytransferadvanced', data, { headers });
  }

  /**
   * 9. Shop & Establishment Verification
   * POST /api/v1/shop-establishment
   */
  async shopEstablishment(data, headers = {}) {
    return await this.post('/api/v1/shop-establishment', data, { headers });
  }

  /**
   * 10. EPF UAN Validation
   * POST /api/v1/fetch-employment-history
   */
  async epfUanValidation(data, headers = {}) {
    return await this.post('/api/v1/fetch-employment-history', data, { headers });
  }

  /**
   * Front API 1. Countries List
   * GET /api/v1/front/countries
   */
  async getCountries(headers = {}) {
    return await this.get('/api/v1/front/countries', { headers });
  }

  /**
   * Front API 2. Inquiry Option List
   * GET /api/v1/front/inquiry-options
   */
  async getInquiryOptions(headers = {}) {
    return await this.get('/api/v1/front/inquiry-options', { headers });
  }

  /**
   * Front API 3. Add Inquiry
   * POST /api/v1/front/inquiries
   */
  async createInquiry(data, headers = {}) {
    return await this.post('/api/v1/front/inquiries', data, { headers });
  }
}

const digitalRakshakApiService = new DigitalRakshakApiService();
export default digitalRakshakApiService;
