import { Mail, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">DeFund</h2>
            <p>Decentralized Crowdfunding Platform</p>
          </div>
          <div className="flex space-x-4">
            <a href="mailto:gambler.gabbarr@gmail.com" className="flex items-center hover:text-secondary">
              <Mail className="mr-2" />
              Email
            </a>
            <a
              href="https://x.com/GamblerGabbar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-secondary"
            >
              <Twitter className="mr-2" />
              Twitter
            </a>
            <a
              href="https://instagram.com/defund"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-secondary"
            >
              <Instagram className="mr-2" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

