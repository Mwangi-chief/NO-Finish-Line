import { useState } from 'react'

const initial = {
  fullName: '', email: '', phone: '', dob: '', raceCategory: '',
  emergencyName: '', emergencyPhone: '', terms: false, paymentConfirm: false,
}
const initialGroup = {
  groupType: '', organizationName: '', groupFullName: '', groupEmail: '',
  groupPhone: '', participantCount: '',
  emergencyName: '', emergencyPhone: '', terms: false, paymentConfirm: false,
}

export default function Register() {
  const [tab, setTab] = useState('individual')
  const [indForm, setIndForm] = useState(initial)
  const [grpForm, setGrpForm] = useState(initialGroup)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const feePerPerson = 3000
  const groupTotal = (parseInt(grpForm.participantCount) || 1) * 3000

  function validate() {
    const e = {}
    if (tab === 'individual') {
      if (!indForm.fullName.trim()) e.fullName = 'Please enter your full name'
      if (!indForm.email.trim() || !/^\S+@\S+\.\S+$/.test(indForm.email)) e.email = 'Please enter a valid email'
      if (!indForm.phone.trim() || indForm.phone.length < 9) e.phone = 'Please enter a valid phone number'
      if (!indForm.dob) e.dob = 'Please enter your date of birth'
      if (!indForm.raceCategory) e.raceCategory = 'Please select a race category'
    } else {
      if (!grpForm.groupType.trim()) e.groupType = 'Please enter group type'
      if (!grpForm.organizationName.trim()) e.organizationName = 'Please enter organization name'
      if (!grpForm.participantCount || parseInt(grpForm.participantCount) < 1) e.participantCount = 'Please enter a valid number'
    }
    const form = tab === 'individual' ? indForm : grpForm
    if (!form.emergencyName.trim()) e.emergencyName = 'Please enter emergency contact name'
    if (!form.emergencyPhone.trim() || form.emergencyPhone.length < 9) e.emergencyPhone = 'Please enter emergency contact phone'
    if (!form.terms) e.terms = 'You must agree to the terms'
    if (!form.paymentConfirm) e.paymentConfirm = 'You must confirm the payment amount'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitted(true)
  }

  const setInd = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setIndForm(f => ({ ...f, [k]: v }))
  }
  const setGrp = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setGrpForm(f => ({ ...f, [k]: v }))
  }

  const displayAmount = tab === 'individual' ? '3,000 KES' : `${groupTotal.toLocaleString()} KES`
  const commonForm = tab === 'individual' ? indForm : grpForm
  const setCommon = tab === 'individual' ? setInd : setGrp

  if (submitted) {
    return (
      <>
        <section
          className="relative flex justify-center items-center"
          style={{ backgroundImage: "url('/hero3.png')", backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', color: 'white' }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(229,45,47,0.7)' }}></div>
          <div className="relative z-10 text-2xl font-bold">Register for No Finish Line Nairobi</div>
        </section>
        <section className="py-20 px-4 text-center">
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-10">
            <i className="fas fa-check-circle text-green-500 text-6xl mb-6"></i>
            <h2 className="text-2xl font-bold mb-4">Thank You for Registering!</h2>
            <p className="text-gray-600 mb-6">
              We've received your registration interest. Our team will contact you at{' '}
              <strong>{tab === 'individual' ? indForm.email : grpForm.groupEmail}</strong> with
              payment instructions and confirmation details closer to the event.
            </p>
            <button
              onClick={() => { setSubmitted(false); setIndForm(initial); setGrpForm(initialGroup) }}
              className="bg-[#E52D2F] text-white px-6 py-3 rounded hover:bg-[#c22525]"
            >
              Submit Another Entry
            </button>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex justify-center items-center"
        style={{ backgroundImage: "url('/hero3.png')", backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', color: 'white' }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(229,45,47,0.7)' }}></div>
        <div className="relative z-10 text-2xl font-bold">Register for No Finish Line Nairobi</div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-4 text-center">Registration Form</h3>

          <div className="fee-notice max-w-2xl mx-auto mb-8">
            <p className="font-semibold text-[#E52D2F]">Registration Fee: 3,000 KES per participant</p>
            <p className="text-sm text-gray-600 mt-1">Payment details will be sent to you after submitting this form.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-8">
            <button className={`registration-tab ${tab === 'individual' ? 'active' : 'inactive'}`} onClick={() => setTab('individual')}>
              Individual Registration
            </button>
            <button className={`registration-tab ${tab === 'group' ? 'active' : 'inactive'}`} onClick={() => setTab('group')}>
              Group Registration
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">

            {/* Individual Form */}
            {tab === 'individual' && (
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-[#E52D2F] border-b pb-2">Personal Information</h4>
                <div>
                  <input type="text" placeholder="Full Name" value={indForm.fullName} onChange={setInd('fullName')}
                    className={`w-full p-3 border rounded ${errors.fullName ? 'input-error' : ''}`} />
                  {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                </div>
                <div>
                  <input type="email" placeholder="Email" value={indForm.email} onChange={setInd('email')}
                    className={`w-full p-3 border rounded ${errors.email ? 'input-error' : ''}`} />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number" value={indForm.phone} onChange={setInd('phone')}
                    className={`w-full p-3 border rounded ${errors.phone ? 'input-error' : ''}`} />
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
                <div>
                  <input type="date" value={indForm.dob} onChange={setInd('dob')}
                    className={`w-full p-3 border rounded ${errors.dob ? 'input-error' : ''}`} />
                  {errors.dob && <p className="error-message">{errors.dob}</p>}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-[#E52D2F] border-b pb-2 mb-4">Select Your Category</h4>
                  <select value={indForm.raceCategory} onChange={setInd('raceCategory')}
                    className={`w-full p-3 border rounded bg-gray-50 ${errors.raceCategory ? 'input-error' : ''}`}>
                    <option value="">Select Your Race Category</option>
                    <option value="u13">Children U13: 3km</option>
                    <option value="u15">Children U15: 5km</option>
                    <option value="u18">Youth U18: 6km</option>
                    <option value="u20">Youth U20: 8km</option>
                    <option value="adult">Adult: 50km</option>
                    <option value="veteran">Veteran: 30-50km</option>
                  </select>
                  {errors.raceCategory && <p className="error-message">{errors.raceCategory}</p>}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-6">
                  <h4 className="font-semibold text-lg mb-3">Payment Summary</h4>
                  <div className="flex justify-between"><span>Registration Fee:</span><span>3,000 KES</span></div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount:</span><span className="text-[#E52D2F]">3,000 KES</span>
                  </div>
                </div>
              </div>
            )}

            {/* Group Form */}
            {tab === 'group' && (
              <div>
                <h4 className="text-xl font-semibold text-[#E52D2F] border-b pb-2 mb-4">Group Information</h4>
                <div className="space-y-4">
                  <div>
                    <input type="text" placeholder="Group Type" value={grpForm.groupType} onChange={setGrp('groupType')}
                      className={`w-full p-3 border rounded ${errors.groupType ? 'input-error' : ''}`} />
                    {errors.groupType && <p className="error-message">{errors.groupType}</p>}
                  </div>
                  <div>
                    <input type="text" placeholder="Organization Name" value={grpForm.organizationName} onChange={setGrp('organizationName')}
                      className={`w-full p-3 border rounded ${errors.organizationName ? 'input-error' : ''}`} />
                    {errors.organizationName && <p className="error-message">{errors.organizationName}</p>}
                  </div>
                  <input type="text" placeholder="Contact Full Name" value={grpForm.groupFullName} onChange={setGrp('groupFullName')} className="w-full p-3 border rounded" />
                  <input type="email" placeholder="Contact Email" value={grpForm.groupEmail} onChange={setGrp('groupEmail')} className="w-full p-3 border rounded" />
                  <input type="tel" placeholder="Phone Number" value={grpForm.groupPhone} onChange={setGrp('groupPhone')} className="w-full p-3 border rounded" />
                  <div>
                    <input type="number" placeholder="Number of Participants" value={grpForm.participantCount} onChange={setGrp('participantCount')}
                      className={`w-full p-3 border rounded ${errors.participantCount ? 'input-error' : ''}`} />
                    {errors.participantCount && <p className="error-message">{errors.participantCount}</p>}
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-6">
                  <h4 className="font-semibold text-lg mb-3">Payment Summary</h4>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-[#E52D2F]">{groupTotal.toLocaleString()} KES</span>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-[#E52D2F] border-b pb-2">Emergency Contact</h4>
              <div className="md:flex md:space-x-4">
                <div className="md:w-1/2 w-full mb-4 md:mb-0">
                  <input type="text" placeholder="Emergency Contact Name" value={commonForm.emergencyName} onChange={setCommon('emergencyName')}
                    className={`w-full p-3 border rounded ${errors.emergencyName ? 'input-error' : ''}`} />
                  {errors.emergencyName && <p className="error-message">{errors.emergencyName}</p>}
                </div>
                <div className="md:w-1/2 w-full">
                  <input type="tel" placeholder="Emergency Contact Phone" value={commonForm.emergencyPhone} onChange={setCommon('emergencyPhone')}
                    className={`w-full p-3 border rounded ${errors.emergencyPhone ? 'input-error' : ''}`} />
                  {errors.emergencyPhone && <p className="error-message">{errors.emergencyPhone}</p>}
                </div>
              </div>
            </div>

            {/* Payment note */}
            <div className="mpesa-box p-4 rounded-lg mt-6">
              <div className="flex items-center mb-3">
                <i className="fas fa-mobile-alt text-4xl text-green-600 mr-3"></i>
                <div>
                  <h4 className="font-bold text-lg">M-Pesa Payment</h4>
                  <p className="text-sm text-gray-600">Payment details will be sent to you after registration</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between"><span>Amount:</span><span className="font-bold">{displayAmount}</span></div>
                <div className="flex justify-between"><span>Method:</span><span className="font-bold">Lipa Na M-Pesa</span></div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 mt-6">
              <div>
                <div className="flex items-start">
                  <input type="checkbox" id="terms" checked={commonForm.terms} onChange={setCommon('terms')} className="mt-1 mr-2" />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions of the No Finish Line Nairobi event.
                  </label>
                </div>
                {errors.terms && <p className="error-message">{errors.terms}</p>}
              </div>
              <div>
                <div className="flex items-start">
                  <input type="checkbox" id="paymentConfirm" checked={commonForm.paymentConfirm} onChange={setCommon('paymentConfirm')} className="mt-1 mr-2" />
                  <label htmlFor="paymentConfirm" className="text-sm">
                    I understand that <strong>{displayAmount}</strong> will be required as the registration fee.
                  </label>
                </div>
                {errors.paymentConfirm && <p className="error-message">{errors.paymentConfirm}</p>}
              </div>
            </div>

            <div className="mt-8">
              <button type="submit" className="bg-[#E52D2F] hover:bg-[#c22525] text-white px-6 py-3 rounded w-full font-bold">
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
