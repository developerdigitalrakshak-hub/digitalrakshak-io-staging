'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Users,
  ChevronDown,
  AlertCircle,
  Sparkles,
  Mail,
  Phone,
  ExternalLink,
  User,
  Building2,
  FileText,
  Briefcase,
  X,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import frontApiService from '@/api/services/front/frontApiService';
import {
  fetchCountriesRequest,
  fetchInquiryOptionsRequest,
  submitInquirySuccess,
  submitInquiryFailure,
} from '@/redux/modules/auth/submodules/inquiry/actions/inquiryActions';
import styles from './RegisterModal.module.scss';

// Fallback active countries if network/token is not yet provisioned in environment
const DEFAULT_COUNTRIES = [
  { id: 2, name: 'India', iso_code_2: 'IN', phone_code: '91', is_default: 1 },
  { id: 1, name: 'United States', iso_code_2: 'US', phone_code: '1', is_default: 0 },
  { id: 4, name: 'United Kingdom', iso_code_2: 'GB', phone_code: '44', is_default: 0 },
  { id: 5, name: 'Australia', iso_code_2: 'AU', phone_code: '61', is_default: 0 },
  { id: 6, name: 'United Arab Emirates', iso_code_2: 'AE', phone_code: '971', is_default: 0 },
  { id: 7, name: 'Singapore', iso_code_2: 'SG', phone_code: '65', is_default: 0 },
  { id: 8, name: 'Germany', iso_code_2: 'DE', phone_code: '49', is_default: 0 },
  { id: 9, name: 'Canada', iso_code_2: 'CA', phone_code: '1', is_default: 0 },
  { id: 3, name: 'Afghanistan', iso_code_2: 'AF', phone_code: '93', is_default: 0 },
];

// Fallback inquiry options
const DEFAULT_INQUIRY_OPTIONS = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
];

/**
 * Returns flag emoji for any ISO 3166-1 alpha-2 code
 */
function getCountryFlag(isoCode) {
  if (!isoCode || typeof isoCode !== 'string' || isoCode.length !== 2) return '🌐';
  try {
    const codePoints = isoCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
}

// Forbidden personal email domains for Business Entity validation
const forbiddenDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'yandex.com',
  'protonmail.com',
  'zoho.com',
  'mail.com',
  'gmx.com',
];

// Zod validation schema for Business Entity
const businessSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .refine(
      (val) => {
        const domain = val.split('@')[1]?.toLowerCase();
        return domain ? !forbiddenDomains.includes(domain) : true;
      },
      { message: 'Please use your corporate/business email address. Personal email domains are not allowed.' }
    ),
  companyName: z.string().min(1, { message: 'Company name is required' }),
  countryId: z.union([z.string(), z.number()]).optional(),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\d{7,15}$/, { message: 'Phone number must be between 7 and 15 digits (numbers only)' }),
  gstNo: z.string().optional(),
  dropdownValue: z.string().min(1, { message: 'Please select an inquiry option' }),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'You must consent to the privacy policy and terms to proceed' }),
  agreeToMarketing: z
    .boolean()
    .refine((val) => val === true, { message: 'You must agree to the marketing and opt-out terms to proceed' }),
  selectAll: z.boolean().optional(),
});

// Zod validation schema for Professionals
const professionalSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  countryId: z.union([z.string(), z.number()]).optional(),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\d{7,15}$/, { message: 'Phone number must be between 7 and 15 digits (numbers only)' }),
  dropdownValue: z.string().min(1, { message: 'Please select an inquiry option' }),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'You must consent to the privacy policy and terms to proceed' }),
  agreeToMarketing: z
    .boolean()
    .refine((val) => val === true, { message: 'You must agree to the marketing and opt-out terms to proceed' }),
  selectAll: z.boolean().optional(),
});

// ----------------------------------------------------
// 1st Tab: Business Entity Form
// ----------------------------------------------------
function BusinessEntityForm({ countries, inquiryOptions, onSuccess, onToast }) {
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState(null);

  const defaultCountry =
    countries.find((c) => c.is_default === 1 || c.iso_code_2 === 'IN') || countries[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting, touchedFields, isValid },
  } = useForm({
    resolver: zodResolver(businessSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      countryId: defaultCountry?.id ? String(defaultCountry.id) : '2',
      phoneNumber: '',
      gstNo: '',
      dropdownValue: '',
      agreeToTerms: false,
      agreeToMarketing: false,
      selectAll: false,
    },
  });

  const agreeToTerms = watch('agreeToTerms');
  const agreeToMarketing = watch('agreeToMarketing');
  const selectAll = watch('selectAll');

  useEffect(() => {
    if (agreeToTerms && agreeToMarketing && !selectAll) {
      setValue('selectAll', true, { shouldValidate: true });
    } else if ((!agreeToTerms || !agreeToMarketing) && selectAll) {
      setValue('selectAll', false, { shouldValidate: true });
    }
  }, [agreeToTerms, agreeToMarketing, selectAll, setValue]);

  const onSubmit = async (data) => {
    setServerError(null);

    const payload = {
      type: 'business',
      name: data.name.trim(),
      business_email: data.email.trim(),
      company_name: data.companyName.trim(),
      mobile_number: data.phoneNumber.trim(),
      country_id: Number(data.countryId) || (defaultCountry?.id ? Number(defaultCountry.id) : 2),
      option_id: Number(data.dropdownValue) || (inquiryOptions[0]?.id ? Number(inquiryOptions[0].id) : 1),
      consent: {
        terms: Boolean(data.agreeToTerms),
        marketing: Boolean(data.agreeToMarketing),
      },
    };

    if (data.gstNo && data.gstNo.trim()) {
      payload.gst_number = data.gstNo.trim();
    }

    try {
      const response = await frontApiService.createInquiry(payload);
      dispatch(submitInquirySuccess(response));

      const returnedData = response.data || response;
      onToast('Inquiry submitted successfully.');
      onSuccess({
        email: data.email,
        id: returnedData?.id || 1,
        status: returnedData?.status || 'pending',
        inquiryData: returnedData,
      });
    } catch (err) {
      dispatch(submitInquiryFailure(err));
      console.warn('Inquiry submission API response:', err);

      // Handle HTTP 422 Validation Error per PDF specification
      if (err.status === 422 && (err.errors || err.validationErrors)) {
        const errMap = err.errors || err.validationErrors;

        if (errMap.name?.[0]) setError('name', { type: 'server', message: errMap.name[0] });
        if (errMap.business_email?.[0]) setError('email', { type: 'server', message: errMap.business_email[0] });
        if (errMap.mobile_number?.[0]) setError('phoneNumber', { type: 'server', message: errMap.mobile_number[0] });
        if (errMap.company_name?.[0]) setError('companyName', { type: 'server', message: errMap.company_name[0] });
        if (errMap.gst_number?.[0]) setError('gstNo', { type: 'server', message: errMap.gst_number[0] });
        if (errMap.country_id?.[0]) setError('countryId', { type: 'server', message: errMap.country_id[0] });
        if (errMap.option_id?.[0]) setError('dropdownValue', { type: 'server', message: errMap.option_id[0] });

        const messages = Object.values(errMap).flat();
        setServerError({
          message: err.message || 'Validation error: Please correct the highlighted fields.',
          list: messages,
        });
      } else if (err.status === 401) {
        // Handle HTTP 401 Unauthenticated per PDF specification
        setServerError({
          message: 'Authentication error (401): Missing or invalid X-API-TOKEN.',
          list: ['Please verify that your active X-API-TOKEN is set in your environment configuration (.env.local).'],
        });
      } else {
        setServerError({
          message: err.message || 'Unable to submit inquiry at this time. Please try again.',
          list: [],
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      {/* Server Error Alert Banner */}
      {serverError && (
        <div className={styles.serverErrorBanner}>
          <div className={styles.serverErrorHeader}>
            <AlertTriangle size={16} />
            <span>{serverError.message}</span>
          </div>
          {serverError.list?.length > 0 && (
            <ul className={styles.serverErrorList}>
              {serverError.list.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className={styles.formGrid}>
        {/* Name */}
        <div className={styles.formGroup}>
          <label htmlFor="bus-name" className={styles.formLabel}>
            Name*
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="bus-name"
              placeholder="John Doe"
              {...register('name')}
              className={`${styles.inputField} ${errors.name ? styles.error : touchedFields.name ? styles.valid : ''
                }`}
            />
            <User className={styles.leftIcon} />
            {touchedFields.name && !errors.name && (
              <CheckCircle className={`${styles.rightIcon} ${styles.valid}`} />
            )}
            {errors.name && (
              <AlertCircle className={`${styles.rightIcon} ${styles.error}`} />
            )}
          </div>
          {errors.name && (
            <p className={styles.errorMessage}>
              <AlertCircle size={14} />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Business Email */}
        <div className={styles.formGroup}>
          <label htmlFor="bus-email" className={styles.formLabel}>
            Business Email*
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="bus-email"
              placeholder="alex@company.com"
              {...register('email')}
              className={`${styles.inputField} ${errors.email ? styles.error : touchedFields.email ? styles.valid : ''
                }`}
            />
            <Mail className={styles.leftIcon} />
            {touchedFields.email && !errors.email && (
              <CheckCircle className={`${styles.rightIcon} ${styles.valid}`} />
            )}
            {errors.email && (
              <AlertCircle className={`${styles.rightIcon} ${styles.error}`} />
            )}
          </div>
          {errors.email && (
            <p className={styles.errorMessage}>
              <AlertCircle size={14} />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div className={styles.formGroup}>
          <label htmlFor="bus-companyName" className={styles.formLabel}>
            Company Name*
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="bus-companyName"
              placeholder="Acme Corp"
              {...register('companyName')}
              className={`${styles.inputField} ${errors.companyName ? styles.error : touchedFields.companyName ? styles.valid : ''
                }`}
            />
            <Building2 className={styles.leftIcon} />
            {touchedFields.companyName && !errors.companyName && (
              <CheckCircle className={`${styles.rightIcon} ${styles.valid}`} />
            )}
            {errors.companyName && (
              <AlertCircle className={`${styles.rightIcon} ${styles.error}`} />
            )}
          </div>
          {errors.companyName && (
            <p className={styles.errorMessage}>
              <AlertCircle size={14} />
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* GST No */}
        <div className={styles.formGroup}>
          <label htmlFor="bus-gstNo" className={styles.formLabel}>
            GST Number (Optional)
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="bus-gstNo"
              placeholder="22AAAAA0000A1Z5"
              {...register('gstNo')}
              className={styles.inputField}
            />
            <FileText className={styles.leftIcon} />
          </div>
        </div>

        {/* Mobile Number & Country Code Select */}
        <div className={styles.formGroup}>
          <label htmlFor="bus-phoneNumber" className={styles.formLabel}>
            Mobile Number*
          </label>
          <div className={styles.phoneGroup}>
            <div className={styles.countryCodeSelectWrapper}>
              <select
                id="bus-countryId"
                {...register('countryId')}
                className={styles.countryCodeSelect}
                aria-label="Select Country Code"
              >
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {getCountryFlag(country.iso_code_2)} (+{country.phone_code})
                  </option>
                ))}
              </select>
              <ChevronDown className={styles.selectArrow} />
            </div>
            <div className={styles.phoneInputWrapper}>
              <input
                type="tel"
                id="bus-phoneNumber"
                placeholder="9876543210"
                {...register('phoneNumber')}
                className={`${styles.inputField} ${errors.phoneNumber ? styles.error : touchedFields.phoneNumber ? styles.valid : ''
                  }`}
              />
              <Phone className={styles.leftIcon} />
              {touchedFields.phoneNumber && !errors.phoneNumber && (
                <CheckCircle className={`${styles.rightIcon} ${styles.valid}`} />
              )}
              {errors.phoneNumber && (
                <AlertCircle className={`${styles.rightIcon} ${styles.error}`} />
              )}
            </div>
          </div>
          {errors.phoneNumber && (
            <p className={styles.errorMessage}>
              <AlertCircle size={14} />
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Inquiry Option Dropdown Field (Populated from GET /api/v1/front/inquiry-options) */}
        <div className={styles.formGroup}>
          <label htmlFor="bus-dropdownValue" className={styles.formLabel}>
            Inquiry Option*
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="bus-dropdownValue"
              {...register('dropdownValue')}
              className={`${styles.selectField} ${errors.dropdownValue ? styles.error : ''}`}
            >
              <option value="" disabled hidden>
                Choose an inquiry option
              </option>
              {inquiryOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
            <ChevronDown className={styles.selectArrow} />
          </div>
          {errors.dropdownValue && (
            <p className={styles.errorMessage}>
              <AlertCircle size={14} />
              {errors.dropdownValue.message}
            </p>
          )}
        </div>
      </div>

      {/* Terms & Conditions consent checkboxes */}
      <div className={styles.consentSection}>
        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            id="bus-agreeToTerms"
            checked={agreeToTerms || false}
            onChange={(e) => {
              setValue('agreeToTerms', e.target.checked, { shouldValidate: true, shouldTouch: true });
            }}
            className={styles.checkboxInput}
          />
          <label htmlFor="bus-agreeToTerms" className={styles.checkboxLabel}>
            I consent to DigitalRakshak to process my data as per the{' '}
            <Link href="/privacy-policy" target="_blank">
              Privacy Policy <ExternalLink size={12} />
            </Link>{' '}
            and{' '}
            <Link href="/terms-and-conditions" target="_blank">
              Terms & Services <ExternalLink size={12} />
            </Link>
            . *
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className={styles.errorMessage}>
            <AlertCircle size={14} />
            {errors.agreeToTerms.message}
          </p>
        )}

        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            id="bus-agreeToMarketing"
            checked={agreeToMarketing || false}
            onChange={(e) => {
              setValue('agreeToMarketing', e.target.checked, { shouldValidate: true, shouldTouch: true });
            }}
            className={styles.checkboxInput}
          />
          <label htmlFor="bus-agreeToMarketing" className={styles.checkboxLabel}>
            I agree to receive marketing communications and acknowledge that I can opt out at any time by
            writing to{' '}
            <Link href="mailto:privacy@digitalrakshak.com">privacy@digitalrakshak.com</Link>. *
          </label>
        </div>
        {errors.agreeToMarketing && (
          <p className={styles.errorMessage}>
            <AlertCircle size={14} />
            {errors.agreeToMarketing.message}
          </p>
        )}

        <div className={`${styles.checkboxRow} ${styles.selectAllDivider}`}>
          <input
            type="checkbox"
            id="bus-selectAll"
            checked={selectAll || false}
            onChange={(e) => {
              const checked = e.target.checked;
              setValue('selectAll', checked, { shouldValidate: true });
              setValue('agreeToTerms', checked, { shouldValidate: true, shouldTouch: true });
              setValue('agreeToMarketing', checked, { shouldValidate: true, shouldTouch: true });
            }}
            className={styles.checkboxInput}
          />
          <label htmlFor="bus-selectAll" className={`${styles.checkboxLabel} ${styles.bold}`}>
            Select all
          </label>
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className={styles.btnSpinner} />
            Submitting Inquiry...
          </>
        ) : (
          <>
            Submit Inquiry
            <ArrowRight className={styles.submitArrow} />
          </>
        )}
      </button>
    </form>
  );
}

// ----------------------------------------------------
// 2nd Tab: Professional Form
// ----------------------------------------------------
function ProfessionalForm({ countries, inquiryOptions, onSuccess, onToast }) {
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState(null);

  const defaultCountry =
    countries.find((c) => c.is_default === 1 || c.iso_code_2 === 'IN') || countries[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting, touchedFields, isValid },
  } = useForm({
    resolver: zodResolver(professionalSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      countryId: defaultCountry?.id ? String(defaultCountry.id) : '2',
      phoneNumber: '',
      dropdownValue: '',
      agreeToTerms: false,
      agreeToMarketing: false,
      selectAll: false,
    },
  });

  const agreeToTerms = watch('agreeToTerms');
  const agreeToMarketing = watch('agreeToMarketing');
  const selectAll = watch('selectAll');

  useEffect(() => {
    if (agreeToTerms && agreeToMarketing && !selectAll) {
      setValue('selectAll', true, { shouldValidate: true });
    } else if ((!agreeToTerms || !agreeToMarketing) && selectAll) {
      setValue('selectAll', false, { shouldValidate: true });
    }
  }, [agreeToTerms, agreeToMarketing, selectAll, setValue]);

  const onSubmit = async (data) => {
    setServerError(null);

    const payload = {
      type: 'professional',
      name: data.name.trim(),
      business_email: data.email.trim(),
      mobile_number: data.phoneNumber.trim(),
      country_id: Number(data.countryId) || (defaultCountry?.id ? Number(defaultCountry.id) : 2),
      option_id: Number(data.dropdownValue) || (inquiryOptions[0]?.id ? Number(inquiryOptions[0].id) : 1),
      consent: {
        terms: Boolean(data.agreeToTerms),
        marketing: Boolean(data.agreeToMarketing),
      },
    };

    try {
      const response = await frontApiService.createInquiry(payload);
      dispatch(submitInquirySuccess(response));

      const returnedData = response.data || response;
      onToast('Inquiry submitted successfully.');
      onSuccess({
        email: data.email,
        id: returnedData?.id || 1,
        status: returnedData?.status || 'pending',
        inquiryData: returnedData,
      });
    } catch (err) {
      dispatch(submitInquiryFailure(err));
      console.warn('Professional inquiry submission API response:', err);

      if (err.status === 422 && (err.errors || err.validationErrors)) {
        const errMap = err.errors || err.validationErrors;

        if (errMap.name?.[0]) setError('name', { type: 'server', message: errMap.name[0] });
        if (errMap.business_email?.[0]) setError('email', { type: 'server', message: errMap.business_email[0] });
        if (errMap.mobile_number?.[0]) setError('phoneNumber', { type: 'server', message: errMap.mobile_number[0] });
        if (errMap.country_id?.[0]) setError('countryId', { type: 'server', message: errMap.country_id[0] });
        if (errMap.option_id?.[0]) setError('dropdownValue', { type: 'server', message: errMap.option_id[0] });

        const messages = Object.values(errMap).flat();
        setServerError({
          message: err.message || 'Validation error: Please correct the highlighted fields.',
          list: messages,
        });
      } else if (err.status === 401) {
        setServerError({
          message: 'Authentication error (401): Missing or invalid X-API-TOKEN.',
          list: ['Please verify that your active X-API-TOKEN is set in your environment configuration (.env.local).'],
        });
      } else {
        setServerError({
          message: err.message || 'Unable to submit inquiry at this time. Please try again.',
          list: [],
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      {/* Server Error Alert Banner */}
      {serverError && (
        <div className={styles.serverErrorBanner}>
          <div className={styles.serverErrorHeader}>
            <AlertTriangle size={16} />
            <span>{serverError.message}</span>
          </div>
          {serverError.list?.length > 0 && (
            <ul className={styles.serverErrorList}>
              {serverError.list.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className={styles.formGrid}>
        {/* Name */}
        <div className={styles.formGroup}>
          <label htmlFor="prof-name" className={styles.formLabel}>
            Name*
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="prof-name"
              placeholder="John Doe"
              {...register('name')}
              className={`${styles.inputField} ${errors.name ? styles.error : touchedFields.name ? styles.valid : ''
                }`}
            />
            <User className={styles.leftIcon} />
            {touchedFields.name && !errors.name && (
              <CheckCircle className={`${styles.rightIcon} ${styles.valid}`} />
            )}
            {errors.name && (
              <AlertCircle className={`${styles.rightIcon} ${styles.error}`} />
            )}
          </div>
          {errors.name && (
            <p className={styles.errorMessage}>
              <AlertCircle size={14} />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="prof-email" className={styles.formLabel}>
            Email*
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="prof-email"
              placeholder="you@example.com"
              {...register('email')}
              className={`${styles.inputField} ${errors.email ? styles.error : touchedFields.email ? styles.valid : ''
                }`}
            />
            <Mail className={styles.leftIcon} />
            {touchedFields.email && !errors.email && (
              <CheckCircle className={`${styles.rightIcon} ${styles.valid}`} />
            )}
            {errors.email && (
              <AlertCircle className={`${styles.rightIcon} ${styles.error}`} />
            )}
          </div>
          {errors.email && (
            <p className={styles.errorMessage}>
              <AlertCircle size={14} />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mobile Number & Country Code Select */}
        <div className={styles.formGroup}>
          <label htmlFor="prof-phoneNumber" className={styles.formLabel}>
            Mobile Number*
          </label>
          <div className={styles.phoneGroup}>
            <div className={styles.countryCodeSelectWrapper}>
              <select
                id="prof-countryId"
                {...register('countryId')}
                className={styles.countryCodeSelect}
                aria-label="Select Country Code"
              >
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {getCountryFlag(country.iso_code_2)} (+{country.phone_code})
                  </option>
                ))}
              </select>
              <ChevronDown className={styles.selectArrow} />
            </div>
            <div className={styles.phoneInputWrapper}>
              <input
                type="tel"
                id="prof-phoneNumber"
                placeholder="9876543210"
                {...register('phoneNumber')}
                className={`${styles.inputField} ${errors.phoneNumber ? styles.error : touchedFields.phoneNumber ? styles.valid : ''
                  }`}
              />
              <Phone className={styles.leftIcon} />
              {touchedFields.phoneNumber && !errors.phoneNumber && (
                <CheckCircle className={`${styles.rightIcon} ${styles.valid}`} />
              )}
              {errors.phoneNumber && (
                <AlertCircle className={`${styles.rightIcon} ${styles.error}`} />
              )}
            </div>
          </div>
          {errors.phoneNumber && (
            <p className={styles.errorMessage}>
              <AlertCircle size={14} />
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Inquiry Option Dropdown Field */}
        <div className={styles.formGroup}>
          <label htmlFor="prof-dropdownValue" className={styles.formLabel}>
            Inquiry Option*
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="prof-dropdownValue"
              {...register('dropdownValue')}
              className={`${styles.selectField} ${errors.dropdownValue ? styles.error : ''}`}
            >
              <option value="" disabled hidden>
                Choose an inquiry option
              </option>
              {inquiryOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
            <ChevronDown className={styles.selectArrow} />
          </div>
          {errors.dropdownValue && (
            <p className={styles.errorMessage}>
              <AlertCircle size={14} />
              {errors.dropdownValue.message}
            </p>
          )}
        </div>
      </div>

      {/* Terms & Conditions consent checkboxes */}
      <div className={styles.consentSection}>
        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            id="prof-agreeToTerms"
            checked={agreeToTerms || false}
            onChange={(e) => {
              setValue('agreeToTerms', e.target.checked, { shouldValidate: true, shouldTouch: true });
            }}
            className={styles.checkboxInput}
          />
          <label htmlFor="prof-agreeToTerms" className={styles.checkboxLabel}>
            I consent to DigitalRakshak to process my data as per the{' '}
            <Link href="/privacy-policy" target="_blank">
              Privacy Policy <ExternalLink size={12} />
            </Link>{' '}
            and{' '}
            <Link href="/terms-and-conditions" target="_blank">
              Terms & Services <ExternalLink size={12} />
            </Link>
            . *
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className={styles.errorMessage}>
            <AlertCircle size={14} />
            {errors.agreeToTerms.message}
          </p>
        )}

        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            id="prof-agreeToMarketing"
            checked={agreeToMarketing || false}
            onChange={(e) => {
              setValue('agreeToMarketing', e.target.checked, { shouldValidate: true, shouldTouch: true });
            }}
            className={styles.checkboxInput}
          />
          <label htmlFor="prof-agreeToMarketing" className={styles.checkboxLabel}>
            I agree to receive marketing communications and acknowledge that I can opt out at any time by
            writing to{' '}
            <Link href="mailto:privacy@digitalrakshak.com">privacy@digitalrakshak.com</Link>. *
          </label>
        </div>
        {errors.agreeToMarketing && (
          <p className={styles.errorMessage}>
            <AlertCircle size={14} />
            {errors.agreeToMarketing.message}
          </p>
        )}

        <div className={`${styles.checkboxRow} ${styles.selectAllDivider}`}>
          <input
            type="checkbox"
            id="prof-selectAll"
            checked={selectAll || false}
            onChange={(e) => {
              const checked = e.target.checked;
              setValue('selectAll', checked, { shouldValidate: true });
              setValue('agreeToTerms', checked, { shouldValidate: true, shouldTouch: true });
              setValue('agreeToMarketing', checked, { shouldValidate: true, shouldTouch: true });
            }}
            className={styles.checkboxInput}
          />
          <label htmlFor="prof-selectAll" className={`${styles.checkboxLabel} ${styles.bold}`}>
            Select all
          </label>
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className={styles.btnSpinner} />
            Submitting Inquiry...
          </>
        ) : (
          <>
            Submit Inquiry
            <ArrowRight className={styles.submitArrow} />
          </>
        )}
      </button>
    </form>
  );
}

// ----------------------------------------------------
// Main Register Modal Component
// ----------------------------------------------------
export default function RegisterModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const reduxInquiryState = useSelector((state) => state.auth?.inquiry);

  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [inquiryResult, setInquiryResult] = useState(null);
  const [accountType, setAccountType] = useState('business');
  const [toastMessage, setToastMessage] = useState(null);

  const [countries, setCountries] = useState(DEFAULT_COUNTRIES);
  const [inquiryOptions, setInquiryOptions] = useState(DEFAULT_INQUIRY_OPTIONS);

  const hasFetchedRef = useRef(false);

  // Fetch Countries & Inquiry Options only ONCE via Redux Saga
  useEffect(() => {
    if (!isOpen) {
      hasFetchedRef.current = false;
      return;
    }

    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    if (!reduxInquiryState?.countries?.length && !reduxInquiryState?.countriesLoading) {
      dispatch(fetchCountriesRequest());
    }

    if (!reduxInquiryState?.inquiryOptions?.length && !reduxInquiryState?.inquiryOptionsLoading) {
      dispatch(fetchInquiryOptionsRequest());
    }
  }, [isOpen, dispatch, reduxInquiryState?.countries?.length, reduxInquiryState?.countriesLoading, reduxInquiryState?.inquiryOptions?.length, reduxInquiryState?.inquiryOptionsLoading]);

  // Sync from Redux if Saga updates countries or inquiryOptions
  useEffect(() => {
    if (reduxInquiryState?.countries && reduxInquiryState.countries.length > 0) {
      setCountries(reduxInquiryState.countries);
    }
    if (reduxInquiryState?.inquiryOptions && reduxInquiryState.inquiryOptions.length > 0) {
      setInquiryOptions(reduxInquiryState.inquiryOptions);
    }
  }, [reduxInquiryState?.countries, reduxInquiryState?.inquiryOptions]);

  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSubmittedSuccessfully(false);
      setRegisteredEmail('');
      setInquiryResult(null);
      setAccountType('business');
      setToastMessage(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSuccess = (res) => {
    if (typeof res === 'string') {
      setRegisteredEmail(res);
      setInquiryResult({ email: res, id: 1, status: 'pending' });
    } else {
      setRegisteredEmail(res.email || '');
      setInquiryResult(res);
    }
    setIsSubmittedSuccessfully(true);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  if (!isOpen) return null;

  const benefits = [
    {
      icon: CheckCircle,
      text: 'Minimize security risks during business operations',
    },
    {
      icon: CheckCircle,
      text: 'Improve compliance timelines with optimized frameworks',
    },
    {
      icon: CheckCircle,
      text: 'Seamless user experience with enhanced security protocols',
    },
  ];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Floating In-Modal Toast */}
        {toastMessage && (
          <div className={styles.toastBanner}>
            <CheckCircle size={18} color="#22c55e" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close Registration Modal"
        >
          <X size={20} />
        </button>

        {/* Modal Scrollable Body */}
        <div className={styles.modalBody}>
          <div className={styles.gridWrapper}>
            {/* Left Column: Benefits & Testimonial */}
            <div className={styles.leftColumn}>
              <div className={styles.headingWrapper}>
                <h2 className={styles.mainHeading}>
                  Optimize your{' '}
                  <span className={styles.gradientText}>Security Framework,</span>
                  <br />
                  boost your compliance!
                </h2>
                <p className={styles.subHeading}>
                  Join leading enterprises optimizing their security postures and compliance
                  timelines using DigitalRakshak.
                </p>
              </div>

              <div className={styles.benefitsList}>
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className={styles.benefitItem}>
                      <IconComponent className={styles.benefitIcon} />
                      <span className={styles.benefitText}>{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Customer Testimonial Card */}
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <div className={styles.shieldIconWrapper}>
                    <Shield size={22} />
                  </div>
                  <div className={styles.testimonialBody}>
                    <blockquote className={styles.quoteText}>
                      &ldquo;We take immense satisfaction in our ability to achieve a 5-minute end-to-end target
                      TAT for security assessments, and DigitalRakshak continues to be a pivotal partner in
                      this endeavour.&rdquo;
                    </blockquote>
                    <div className={styles.authorRow}>
                      <div className={styles.authorAvatar}>
                        <Users size={18} />
                      </div>
                      <div className={styles.authorInfo}>
                        <span className={styles.authorName}>Abhishek Sharma</span>
                        <span className={styles.authorRole}>CDO at L&T Finance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Registration / Inquiry Card */}
            <div className={styles.rightColumn}>
              <div className={styles.formCard}>
                {!isSubmittedSuccessfully ? (
                  <>
                    <div className={styles.cardHeader}>
                      <div className={styles.trialBadge}>
                        <Sparkles size={14} /> Start Your Trial
                      </div>
                      <h3 className={styles.cardTitle}>Submit Inquiry</h3>
                      <p className={styles.cardSubtitle}>
                        Register your business inquiry to access DigitalRakshak services.
                      </p>
                    </div>

                    {/* Toggle Slider for Account Type */}
                    <div className={styles.tabSliderWrapper}>
                      <div className={styles.tabSliderTrack}>
                        <div
                          className={`${styles.tabSliderPill} ${accountType === 'business' ? styles.left : styles.right
                            }`}
                        />
                        <button
                          type="button"
                          onClick={() => setAccountType('business')}
                          className={`${styles.tabBtn} ${accountType === 'business' ? styles.active : styles.inactive
                            }`}
                        >
                          <Building2 size={16} />
                          Business Entity
                        </button>
                        <button
                          type="button"
                          onClick={() => setAccountType('professional')}
                          className={`${styles.tabBtn} ${accountType === 'professional' ? styles.active : styles.inactive
                            }`}
                        >
                          <Briefcase size={16} />
                          Professionals
                        </button>
                      </div>
                    </div>

                    {/* Active Form */}
                    {accountType === 'business' ? (
                      <BusinessEntityForm
                        countries={countries}
                        inquiryOptions={inquiryOptions}
                        onSuccess={handleSuccess}
                        onToast={showToast}
                      />
                    ) : (
                      <ProfessionalForm
                        countries={countries}
                        inquiryOptions={inquiryOptions}
                        onSuccess={handleSuccess}
                        onToast={showToast}
                      />
                    )}
                  </>
                ) : (
                  /* Success State View (Section 5 Step 8: Displays ID and Status) */
                  <div className={styles.successContainer}>
                    <div className={styles.successIconWrapper}>
                      <CheckCircle size={44} />
                    </div>

                    <h3 className={styles.successTitle}>Inquiry Submitted Successfully</h3>

                    <div className={styles.inquiryMetaRow}>
                      <span className={styles.inquiryIdBadge}>
                        Inquiry ID: #{inquiryResult?.id || 1}
                      </span>
                      <span className={styles.statusBadgePending}>
                        <span className={styles.pulseDot} />
                        Status: {inquiryResult?.status || 'pending'}
                      </span>
                    </div>

                    <p className={styles.successDesc}>
                      Thank you for choosing DigitalRakshak. We&apos;ve registered your inquiry and
                      sent a confirmation to:
                    </p>

                    <div className={styles.emailBadge}>
                      {inquiryResult?.email || registeredEmail}
                    </div>

                    <p className={styles.successInstructions}>
                      Our compliance and onboarding team will review your inquiry details and get in
                      touch shortly.
                    </p>

                    <div className={styles.successActions}>
                      <button
                        type="button"
                        onClick={onClose}
                        className={styles.homeBtn}
                      >
                        Done &amp; Close
                      </button>
                      <Link href="/" className={styles.closeSuccessBtn} onClick={onClose}>
                        Go to Homepage
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
