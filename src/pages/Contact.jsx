const Contact = () => (
  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-dark">Contact Us</h1>
      <p className="mt-4 text-sm text-slate-500">Send a message and our support team will reply within one business day.</p>
      <form className="mt-8 space-y-5">
        <input type="text" placeholder="Name" className="w-full rounded-3xl border border-slate-200 px-4 py-3" />
        <input type="email" placeholder="Email" className="w-full rounded-3xl border border-slate-200 px-4 py-3" />
        <textarea placeholder="Message" rows="6" className="w-full rounded-3xl border border-slate-200 px-4 py-3"></textarea>
        <button className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white hover:bg-[#BD8E88]">Send Message</button>
      </form>
    </div>
    <div className="rounded-3xl border border-slate-200 bg-secondary p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-dark">Need help?</h2>
      <p className="mt-4 text-sm text-slate-600">Our customer team is available 24/7 to answer questions and support your purchase.</p>
      <div className="mt-8 space-y-4 text-sm text-slate-700">
        <div>
          <h3 className="font-semibold">Address</h3>
          <p>123 Rose Avenue, Tech City</p>
        </div>
        <div>
          <h3 className="font-semibold">Email</h3>
          <p>support@eshopper.com</p>
        </div>
        <div>
          <h3 className="font-semibold">Phone</h3>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
