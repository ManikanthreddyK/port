import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Send, RotateCcw } from 'lucide-react'
import { cardSpring } from '@/components/home/homeMotion'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

export function ContactForm() {
  const reduced = useReducedMotion()
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!values.name.trim()) {
      newErrors.name = 'Please enter your name.'
    }

    if (!values.email.trim()) {
      newErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!values.subject.trim()) {
      newErrors.subject = 'Please enter a subject.'
    }

    if (!values.message.trim()) {
      newErrors.message = 'Please enter a message.'
    } else if (values.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  const handleOpenMailClient = () => {
    const mailtoUrl = `mailto:manikanthreddykomalla@gmail.com?subject=${encodeURIComponent(
      values.subject || 'Portfolio Conversation',
    )}&body=${encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`,
    )}`
    window.location.href = mailtoUrl
  }

  const handleReset = () => {
    setValues({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="group/form relative overflow-hidden border border-line bg-surface/60 p-6 sm:p-8 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[0_24px_60px_rgb(0_0_0/0.4)]">
      <div className="connect-card-sheen pointer-events-none absolute inset-0" />

      <div className="relative flex items-center justify-between border-b border-line/60 pb-5">
        <div>
          <p className="font-mono text-[10px] tracking-[0.24em] text-mute uppercase">Direct Note</p>
          <h3 className="mt-1 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Send a message
          </h3>
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
          Form
        </span>
      </div>

      {submitted ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-8 space-y-6"
        >
          <div className="border border-accent/30 bg-accent/5 p-6 text-left">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center border border-accent bg-void text-accent">
                <Check size={14} strokeWidth={2} />
              </span>
              <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                Message prepared
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink">
              Thank you, <span className="font-semibold text-accent">{values.name}</span>. Your message draft has been structured.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-mist">
              You can now launch your default email client to send it directly to{' '}
              <span className="font-mono text-ink">manikanthreddykomalla@gmail.com</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={handleOpenMailClient}
              whileHover={reduced ? undefined : { y: -1 }}
              whileTap={reduced ? undefined : { scale: 0.985 }}
              transition={cardSpring}
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-void uppercase transition-opacity hover:opacity-90"
            >
              Open in Mail Client
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </motion.button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-mist uppercase transition-colors hover:border-line-strong hover:text-ink"
            >
              <RotateCcw size={13} strokeWidth={1.5} />
              Write Another Note
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="relative mt-8 space-y-6">
          {/* Name & Email Row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="connect-name"
                className="block font-mono text-[10px] tracking-[0.2em] text-mute uppercase"
              >
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="connect-name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Your name"
                className="mt-2 w-full border border-line bg-void/80 px-4 py-3 font-sans text-sm text-ink placeholder:text-mute/60 transition-colors focus:border-accent focus:outline-none"
              />
              {errors.name ? (
                <p className="mt-1.5 font-mono text-[11px] text-accent">{errors.name}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="connect-email"
                className="block font-mono text-[10px] tracking-[0.2em] text-mute uppercase"
              >
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="connect-email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="mt-2 w-full border border-line bg-void/80 px-4 py-3 font-sans text-sm text-ink placeholder:text-mute/60 transition-colors focus:border-accent focus:outline-none"
              />
              {errors.email ? (
                <p className="mt-1.5 font-mono text-[11px] text-accent">{errors.email}</p>
              ) : null}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="connect-subject"
              className="block font-mono text-[10px] tracking-[0.2em] text-mute uppercase"
            >
              Subject <span className="text-accent">*</span>
            </label>
            <input
              id="connect-subject"
              type="text"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              placeholder="What would you like to discuss?"
              className="mt-2 w-full border border-line bg-void/80 px-4 py-3 font-sans text-sm text-ink placeholder:text-mute/60 transition-colors focus:border-accent focus:outline-none"
            />
            {errors.subject ? (
              <p className="mt-1.5 font-mono text-[11px] text-accent">{errors.subject}</p>
            ) : null}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="connect-message"
              className="block font-mono text-[10px] tracking-[0.2em] text-mute uppercase"
            >
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="connect-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              placeholder="Tell me about your idea, project, or question..."
              className="mt-2 w-full resize-y border border-line bg-void/80 px-4 py-3 font-sans text-sm text-ink placeholder:text-mute/60 transition-colors focus:border-accent focus:outline-none"
            />
            {errors.message ? (
              <p className="mt-1.5 font-mono text-[11px] text-accent">{errors.message}</p>
            ) : null}
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <motion.button
              type="submit"
              whileHover={reduced ? undefined : { y: -1 }}
              whileTap={reduced ? undefined : { scale: 0.985 }}
              transition={cardSpring}
              className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-mono text-[11px] tracking-[0.16em] text-void uppercase transition-opacity hover:opacity-90"
            >
              Send Message
              <Send
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </motion.button>
          </div>
        </form>
      )}
    </div>
  )
}
