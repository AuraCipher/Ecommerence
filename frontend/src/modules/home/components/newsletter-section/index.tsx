"use client"

import { useState } from "react"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription logic here
    console.log("Newsletter subscription:", email)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail("")
    }, 3000)
  }

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary/80 p-12 md:p-16 lg:p-20">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-4 text-primary-foreground">
            Join Our Community
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Be the first to discover new arrivals, exclusive offers, and style inspiration delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-all duration-300 whitespace-nowrap"
            >
              {isSubmitted ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
          
          <p className="text-primary-foreground/60 text-sm mt-4">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection