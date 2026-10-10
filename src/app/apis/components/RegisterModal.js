'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
} from 'lucide-react';
import Link from 'next/link';
import styles from './RegisterModal.module.scss';

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
  countryCode: z.string().min(1, { message: 'Country code is required' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\d{8,12}$/, { message: 'Phone number must be between 8 and 12 digits (numbers only)' }),
  gstNo: z.string().optional(),
  dropdownValue: z.string().min(1, { message: 'Please select an option' }),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'You must consent to the privacy policy and terms to proceed' }),
  agreeToMarketing: z
    .boolean()
    .refine((val) => val === true, { message: 'You must agree to the marketing and opt-out terms to proceed' }),
  selectAll: z.boolean().optional(),
});

// Zod validation schema for Professionals (Personal email allowed, company name & GST omitted)
const professionalSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  countryCode: z.string().min(1, { message: 'Country code is required' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\d{8,12}$/, { message: 'Phone number must be between 8 and 12 digits (numbers only)' }),
  dropdownValue: z.string().min(1, { message: 'Please select an option' }),
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
function BusinessEntityForm({ onSuccess, onToast }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, touchedFields, isValid },
  } = useForm({
    resolver: zodResolver(businessSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      countryCode: '+91',
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
    await new Promise((resolve) => setTimeout(resolve, 1400));
    console.log('Business Entity Registered:', data);
    onToast(`Verification email sent to ${data.email}`);
    onSuccess(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
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
              className={`${styles.inputField} ${
                errors.name ? styles.error : touchedFields.name ? styles.valid : ''
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
              className={`${styles.inputField} ${
                errors.email ? styles.error : touchedFields.email ? styles.valid : ''
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
              className={`${styles.inputField} ${
                errors.companyName ? styles.error : touchedFields.companyName ? styles.valid : ''
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

        {/* Mobile Number */}
        <div className={styles.formGroup}>
          <label htmlFor="bus-phoneNumber" className={styles.formLabel}>
            Mobile Number*
          </label>
          <div className={styles.phoneGroup}>
            <div className={styles.countryCodeSelectWrapper}>
              <select
                id="bus-countryCode"
                {...register('countryCode')}
                className={styles.countryCodeSelect}
              >
                <option value="+91">🇮🇳 (+91)</option>
                <option value="+1">🇺🇸 (+1)</option>
                <option value="+44">🇬🇧 (+44)</option>
                <option value="+61">🇦🇺 (+61)</option>
              </select>
              <ChevronDown className={styles.selectArrow} />
            </div>
            <div className={styles.phoneInputWrapper}>
              <input
                type="tel"
                id="bus-phoneNumber"
                placeholder="98765 43210"
                {...register('phoneNumber')}
                className={`${styles.inputField} ${
                  errors.phoneNumber ? styles.error : touchedFields.phoneNumber ? styles.valid : ''
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

        {/* Dropdown Field */}
        <div className={styles.formGroup}>
          <label htmlFor="bus-dropdownValue" className={styles.formLabel}>
            Select Option*
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="bus-dropdownValue"
              {...register('dropdownValue')}
              className={`${styles.selectField} ${errors.dropdownValue ? styles.error : ''}`}
            >
              <option value="" disabled hidden>
                Choose an option
              </option>
              <option value="value1">Option 1</option>
              <option value="value2">Option 2</option>
              <option value="value3">Option 3</option>
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
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? (
          <>
            <span className={styles.btnSpinner} />
            Creating Business Account...
          </>
        ) : (
          <>
            Submit
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
function ProfessionalForm({ onSuccess, onToast }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, touchedFields, isValid },
  } = useForm({
    resolver: zodResolver(professionalSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      countryCode: '+91',
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
    await new Promise((resolve) => setTimeout(resolve, 1400));
    console.log('Professional Registered:', data);
    onToast(`Verification email sent to ${data.email}`);
    onSuccess(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
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
              className={`${styles.inputField} ${
                errors.name ? styles.error : touchedFields.name ? styles.valid : ''
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

        {/* Email (Without Business Email Restriction) */}
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
              className={`${styles.inputField} ${
                errors.email ? styles.error : touchedFields.email ? styles.valid : ''
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

        {/* Mobile Number */}
        <div className={styles.formGroup}>
          <label htmlFor="prof-phoneNumber" className={styles.formLabel}>
            Mobile Number*
          </label>
          <div className={styles.phoneGroup}>
            <div className={styles.countryCodeSelectWrapper}>
              <select
                id="prof-countryCode"
                {...register('countryCode')}
                className={styles.countryCodeSelect}
              >
                <option value="+91">🇮🇳 (+91)</option>
                <option value="+1">🇺🇸 (+1)</option>
                <option value="+44">🇬🇧 (+44)</option>
                <option value="+61">🇦🇺 (+61)</option>
              </select>
              <ChevronDown className={styles.selectArrow} />
            </div>
            <div className={styles.phoneInputWrapper}>
              <input
                type="tel"
                id="prof-phoneNumber"
                placeholder="98765 43210"
                {...register('phoneNumber')}
                className={`${styles.inputField} ${
                  errors.phoneNumber ? styles.error : touchedFields.phoneNumber ? styles.valid : ''
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

        {/* Dropdown Field */}
        <div className={styles.formGroup}>
          <label htmlFor="prof-dropdownValue" className={styles.formLabel}>
            Select Option*
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="prof-dropdownValue"
              {...register('dropdownValue')}
              className={`${styles.selectField} ${errors.dropdownValue ? styles.error : ''}`}
            >
              <option value="" disabled hidden>
                Choose an option
              </option>
              <option value="value1">Option 1</option>
              <option value="value2">Option 2</option>
              <option value="value3">Option 3</option>
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
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? (
          <>
            <span className={styles.btnSpinner} />
            Creating Professional Account...
          </>
        ) : (
          <>
            Submit
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
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [accountType, setAccountType] = useState('business');
  const [toastMessage, setToastMessage] = useState(null);

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
      // Reset form state on close
      setIsSubmittedSuccessfully(false);
      setRegisteredEmail('');
      setAccountType('business');
      setToastMessage(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSuccess = (email) => {
    setRegisteredEmail(email);
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

            {/* Right Column: Registration Card */}
            <div className={styles.rightColumn}>
              <div className={styles.formCard}>
                {!isSubmittedSuccessfully ? (
                  <>
                    <div className={styles.cardHeader}>
                      <div className={styles.trialBadge}>
                        <Sparkles size={14} /> Start Your Trial
                      </div>
                      <h3 className={styles.cardTitle}>Create Account</h3>
                      <p className={styles.cardSubtitle}>
                        Get access to your 7-day free trial setup.
                      </p>
                    </div>

                    {/* Toggle Slider for Account Type */}
                    <div className={styles.tabSliderWrapper}>
                      <div className={styles.tabSliderTrack}>
                        <div
                          className={`${styles.tabSliderPill} ${
                            accountType === 'business' ? styles.left : styles.right
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setAccountType('business')}
                          className={`${styles.tabBtn} ${
                            accountType === 'business' ? styles.active : styles.inactive
                          }`}
                        >
                          <Building2 size={16} />
                          Business Entity
                        </button>
                        <button
                          type="button"
                          onClick={() => setAccountType('professional')}
                          className={`${styles.tabBtn} ${
                            accountType === 'professional' ? styles.active : styles.inactive
                          }`}
                        >
                          <Briefcase size={16} />
                          Professionals
                        </button>
                      </div>
                    </div>

                    {/* Active Form */}
                    {accountType === 'business' ? (
                      <BusinessEntityForm onSuccess={handleSuccess} onToast={showToast} />
                    ) : (
                      <ProfessionalForm onSuccess={handleSuccess} onToast={showToast} />
                    )}
                  </>
                ) : (
                  /* Success State View */
                  <div className={styles.successContainer}>
                    <div className={styles.successIconWrapper}>
                      <CheckCircle size={44} />
                    </div>

                    <h3 className={styles.successTitle}>Account Pending Verification</h3>

                    <p className={styles.successDesc}>
                      Thank you for choosing DigitalRakshak. We&apos;ve sent a verification email to:
                    </p>

                    <div className={styles.emailBadge}>{registeredEmail}</div>

                    <p className={styles.successInstructions}>
                      Please click the link inside that email to verify your email address and start
                      setting up your trials.
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
