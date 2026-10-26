import BaseApiService from '../base/BaseApiService';

/**
 * FrontApiService
 * Integrates DigitalRakshak Front APIs:
 * 1. Countries List: GET /api/v1/front/countries
 * 2. Inquiry Option List: GET /api/v1/front/inquiry-options
 * 3. Add Inquiry: POST /api/v1/front/inquiries
 */
export class FrontApiService extends BaseApiService {
  /**
   * 2. Countries List
   * Returns all countries whose status is active.
   * GET /api/v1/front/countries
   * @param {Object} config Optional axios request config (headers, params, etc.)
   * @returns {Promise<Object>} API response with active countries array in data
   */
  async getCountries(config = {}) {
    return await this.get('/api/v1/front/countries', config);
  }

  /**
   * 3. Inquiry Option List
   * Returns the available active inquiry options that can be selected when submitting an inquiry.
   * GET /api/v1/front/inquiry-options
   * @param {Object} config Optional axios request config
   * @returns {Promise<Object>} API response with inquiry options array in data
   */
  async getInquiryOptions(config = {}) {
    return await this.get('/api/v1/front/inquiry-options', config);
  }

  /**
   * 4. Add Inquiry
   * Creates a new business / professional inquiry.
   * POST /api/v1/front/inquiries
   * @param {Object} payload Inquiry data
   * @param {string} payload.type Inquiry type (e.g. 'business', 'professional')
   * @param {string} payload.name Submitter's full name
   * @param {string} payload.business_email Business / contact email
   * @param {string} [payload.company_name] Company/business name
   * @param {string} [payload.gst_number] GST number (optional)
   * @param {string} payload.mobile_number Mobile contact number
   * @param {number} [payload.country_id] Selected country ID from GET /countries
   * @param {number} [payload.option_id] Selected inquiry option ID from GET /inquiry-options
   * @param {Object} [payload.consent] Consent object
   * @param {boolean} [payload.consent.terms] Consent for terms & privacy policy
   * @param {boolean} [payload.consent.marketing] Consent for marketing updates
   * @param {Object} config Optional axios request config
   * @returns {Promise<Object>} API response with created inquiry object in data
   */
  async createInquiry(payload, config = {}) {
    return await this.post('/api/v1/front/inquiries', payload, config);
  }
}

const frontApiService = new FrontApiService();
export default frontApiService;
