---
title: KYC Verification
sidebar_position: 3
---

# KYC Verification Process

Syncron implements a comprehensive Know Your Customer (KYC) verification system to ensure regulatory compliance, prevent fraud, and provide a secure trading environment.

## Verification Levels

Syncron offers a tiered verification system, with each level providing additional features and higher limits:

![Syncron KYC Verification](/img/syncron-kyc-verification.svg)

### Level 1: Basic Verification

**Requirements:**
- Valid email address
- Mobile phone verification
- Basic personal information (name, country, date of birth)
- Terms of service acceptance

**Limits:**
- Withdrawal: Up to 2 BTC equivalent per day
- Deposit: Unlimited crypto deposits
- Trading: Full access to spot trading

**Completion Time:** Instant

### Level 2: Identity Verification

**Requirements:**
- All Level 1 requirements
- Government-issued ID document (passport, national ID card, driver's license)
- Selfie with ID document
- Facial verification check
- Proof of address (utility bill, bank statement, issued within last 3 months)

**Limits:**
- Withdrawal: Up to 100 BTC equivalent per day
- Deposit: Unlimited crypto deposits, access to fiat deposits
- Trading: Access to margin trading (up to 5x leverage)

**Completion Time:** Typically within 24 hours

### Level 3: Enhanced Verification

**Requirements:**
- All Level 2 requirements
- Secondary ID verification
- Advanced liveness checks
- Proof of funds source for large deposits
- Video verification call (for select cases)

**Limits:**
- Withdrawal: Up to 500 BTC equivalent per day
- Deposit: Higher fiat deposit limits
- Trading: Access to futures trading, higher leverage options (up to 20x)

**Completion Time:** 1-3 business days

### VIP/Institutional Verification

**Requirements:**
- All Level 3 requirements
- Business registration documents (for corporate accounts)
- Shareholder structure documentation
- Director identification
- AML/KYC compliance procedures
- Corporate resolution authorizing account opening

**Limits:**
- Customized withdrawal limits
- OTC trading desk access
- Dedicated account manager
- API rate limit increases
- Special fee structure

**Completion Time:** 3-10 business days

## Verification Process

### Starting Your Verification

1. Log in to your Syncron account
2. Navigate to **Account** > **Verification Center**
3. Select the verification level you wish to complete
4. Follow the on-screen instructions for document submission

### Document Requirements

#### ID Document Guidelines:
- Must be current and not expired
- Full document must be visible in the image
- All four corners must be visible
- Text must be clearly legible
- No glare or shadows obscuring information
- Color image (not black and white)
- File format: JPG, PNG, or PDF (under 5MB)

#### Selfie Guidelines:
- Clear, well-lit image
- Neutral expression, facing forward
- No sunglasses or head coverings (except for religious purposes)
- Plain background preferred

#### Address Verification Documents:
- Must show your full name and address
- Issued within the last 3 months
- Utility bill, bank statement, tax document, or official government correspondence
- Digital bills acceptable if they show full name and address

### Verification Process Steps

1. **Document Upload:**
   - Follow the guided upload process
   - Ensure documents meet all guidelines
   - Verify information accuracy before submission

2. **Automated Verification:**
   - ID authenticity check
   - Face matching between selfie and ID
   - Document information extraction and verification
   - Address validation

3. **Manual Review (if needed):**
   - Secondary review by our compliance team
   - Additional documents may be requested
   - Video verification call may be scheduled

4. **Verification Status:**
   - In progress: Your documents are being reviewed
   - Approved: Verification complete, limits increased
   - Additional information needed: Follow instructions to provide required information
   - Rejected: Details provided about rejection reason

## Custom KYC Templates

Syncron's verification system is built with flexibility to adapt to regulatory requirements across different jurisdictions:

### Regional Compliance Adaptations

Our KYC system automatically adjusts requirements based on your country of residence to ensure compliance with local regulations:

- **European Users:** GDPR-compliant verification process with additional PEP (Politically Exposed Person) screening
- **US Users:** Additional tax information collection (W-9 form)
- **High-Risk Jurisdictions:** Enhanced due diligence procedures
- **Restricted Territories:** Automatic detection of unsupported regions

### Multi-language Support

The verification process is available in 16 languages:
- English
- Spanish
- French
- German
- Italian
- Portuguese
- Russian
- Chinese (Simplified)
- Chinese (Traditional)
- Japanese
- Korean
- Turkish
- Arabic
- Hindi
- Vietnamese
- Indonesian

## Advanced Security Measures

Our verification system incorporates multiple security layers:

### Document Validation Technology

- **AI-Powered Document Analysis:** Checks for signs of manipulation or forgery
- **MRZ (Machine Readable Zone) Verification:** Validates passport and ID code integrity
- **Hologram Detection:** Verifies security features on ID documents
- **UV/IR Feature Validation:** Detects specialized security elements

### Biometric Verification

- **Facial Recognition:** Matches selfie to ID document
- **Liveness Detection:** Ensures the person is physically present
- **Anti-Spoofing Measures:** Prevents use of photos or masks
- **3D Depth Analysis:** Additional layer of verification

### Risk-Based Approach

Our system applies enhanced scrutiny based on risk factors:
- User location
- Transaction patterns
- Account activity
- Data consistency
- IP and device analysis

## Privacy and Data Protection

Syncron maintains strict data protection standards:

- **Data Encryption:** All verification documents are encrypted at rest and in transit
- **Secure Storage:** Documents stored in compliance with GDPR and international standards
- **Access Controls:** Strict access limitations to verification data
- **Retention Policy:** Data kept only as long as legally required
- **Deletion Requests:** Process for requesting data deletion upon account closure

## Common Issues and Troubleshooting

### Verification Rejection Reasons

- Document image quality too low
- Document expired or invalid
- Information mismatch between documents
- Selfie doesn't match ID photo
- Address document not recent enough
- Suspected document manipulation
- Incomplete submission

### How to Resolve Verification Problems

1. **Image Quality:** Retake photos in good lighting with all details clearly visible
2. **Document Issues:** Submit a different valid ID or updated document
3. **Information Mismatch:** Ensure consistency across all submitted information
4. **Technical Problems:** Try a different browser or device for submission
5. **Region Restrictions:** Contact support for clarification on regional policies

For assistance with verification issues, contact our support team via:
- Live chat: Available 24/7
- Email: verification@syncron.finance
- Support ticket: Through your account dashboard

## Corporate Account Verification

For business entities, additional documentation is required:

1. **Corporate Registration:** Business registration certificate
2. **Company Structure:** Ownership chart showing 25%+ shareholders
3. **Director Information:** ID verification for all directors
4. **Authorized Traders:** Verification of all individuals with trading access
5. **Source of Funds:** Documentation of business activity and fund origin
6. **Corporate Resolution:** Board approval for account opening

## API Access for Verification Status

For developers, verification status can be accessed via API:
- Check current verification level
- Retrieve verification limits
- Monitor verification status
- Receive webhooks for status changes

See the [API Documentation](/docs/syncron/api/account#verification) for implementation details.
