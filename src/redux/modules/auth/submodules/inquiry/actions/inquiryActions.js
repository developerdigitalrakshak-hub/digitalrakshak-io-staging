import * as types from './actionTypes';

// Countries Actions
export const fetchCountriesRequest = (payload = {}) => ({
  type: types.FETCH_COUNTRIES_REQUEST,
  payload,
});

export const fetchCountriesSuccess = (countries) => ({
  type: types.FETCH_COUNTRIES_SUCCESS,
  payload: countries,
});

export const fetchCountriesFailure = (error) => ({
  type: types.FETCH_COUNTRIES_FAILURE,
  payload: error,
});

// Inquiry Options Actions
export const fetchInquiryOptionsRequest = (payload = {}) => ({
  type: types.FETCH_INQUIRY_OPTIONS_REQUEST,
  payload,
});

export const fetchInquiryOptionsSuccess = (options) => ({
  type: types.FETCH_INQUIRY_OPTIONS_SUCCESS,
  payload: options,
});

export const fetchInquiryOptionsFailure = (error) => ({
  type: types.FETCH_INQUIRY_OPTIONS_FAILURE,
  payload: error,
});

// Add Inquiry Actions
export const submitInquiryRequest = (payload, callbacks = {}) => ({
  type: types.SUBMIT_INQUIRY_REQUEST,
  payload,
  callbacks, // Optional { onSuccess, onError }
});

export const submitInquirySuccess = (response) => ({
  type: types.SUBMIT_INQUIRY_SUCCESS,
  payload: response,
});

export const submitInquiryFailure = (error) => ({
  type: types.SUBMIT_INQUIRY_FAILURE,
  payload: error,
});

export const resetInquiryState = () => ({
  type: types.RESET_INQUIRY_STATE,
});
