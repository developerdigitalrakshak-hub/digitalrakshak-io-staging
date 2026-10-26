import * as types from '../actions/actionTypes';

const initialState = {
  // Countries
  countries: [],
  countriesLoading: false,
  countriesError: null,

  // Inquiry Options
  inquiryOptions: [],
  inquiryOptionsLoading: false,
  inquiryOptionsError: null,

  // Submit Inquiry
  submitting: false,
  submitSuccess: false,
  submitError: null,
  validationErrors: null,
  inquiryData: null,
};

export default function inquiryReducer(state = initialState, action) {
  switch (action.type) {
    // Countries List
    case types.FETCH_COUNTRIES_REQUEST:
      return {
        ...state,
        countriesLoading: true,
        countriesError: null,
      };
    case types.FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countriesLoading: false,
        countries: Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [],
        countriesError: null,
      };
    case types.FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        countriesLoading: false,
        countriesError: action.payload,
      };

    // Inquiry Options
    case types.FETCH_INQUIRY_OPTIONS_REQUEST:
      return {
        ...state,
        inquiryOptionsLoading: true,
        inquiryOptionsError: null,
      };
    case types.FETCH_INQUIRY_OPTIONS_SUCCESS:
      return {
        ...state,
        inquiryOptionsLoading: false,
        inquiryOptions: Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [],
        inquiryOptionsError: null,
      };
    case types.FETCH_INQUIRY_OPTIONS_FAILURE:
      return {
        ...state,
        inquiryOptionsLoading: false,
        inquiryOptionsError: action.payload,
      };

    // Submit Inquiry
    case types.SUBMIT_INQUIRY_REQUEST:
      return {
        ...state,
        submitting: true,
        submitSuccess: false,
        submitError: null,
        validationErrors: null,
      };
    case types.SUBMIT_INQUIRY_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitSuccess: true,
        submitError: null,
        validationErrors: null,
        inquiryData: action.payload?.data || action.payload,
      };
    case types.SUBMIT_INQUIRY_FAILURE:
      return {
        ...state,
        submitting: false,
        submitSuccess: false,
        submitError: action.payload?.message || action.payload,
        validationErrors: action.payload?.validationErrors || action.payload?.errors || null,
      };

    case types.RESET_INQUIRY_STATE:
      return {
        ...state,
        submitting: false,
        submitSuccess: false,
        submitError: null,
        validationErrors: null,
      };

    default:
      return state;
  }
}
