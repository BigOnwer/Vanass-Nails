import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, Instagram, Facebook, Clock, Award, Users, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import placeholder from './placeholder.svg'

export default function Home() {
  const services = [
    {
      name: "Manicure Clássica",
      description: "Cuidado completo das unhas com esmaltação tradicional",
      price: "R$ 35",
      duration: "45 min",
    },
    {
      name: "Esmaltação em Gel",
      description: "Durabilidade de até 3 semanas com acabamento perfeito",
      price: "R$ 55",
      duration: "60 min",
    },
    {
      name: "Nail Art",
      description: "Desenhos personalizados e decorações exclusivas",
      price: "R$ 80",
      duration: "90 min",
    },
    {
      name: "Alongamento",
      description: "Unhas alongadas com gel ou fibra de vidro",
      price: "R$ 120",
      duration: "120 min",
    },
    {
      name: "Pedicure Spa",
      description: "Tratamento completo dos pés com hidratação",
      price: "R$ 65",
      duration: "75 min",
    },
    {
      name: "Blindagem das Unhas",
      description: "Fortalecimento e proteção das unhas naturais",
      price: "R$ 45",
      duration: "50 min",
    },
  ]

  const gallery = [
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      rating: 5,
      comment: "Atendimento excepcional! Minhas unhas ficaram perfeitas e duraram muito tempo.",
    },
    {
      name: "Ana Costa",
      rating: 5,
      comment: "Profissional muito talentosa, sempre saio satisfeita com o resultado.",
    },
    {
      name: "Juliana Santos",
      rating: 5,
      comment: "Ambiente acolhedor e serviço de qualidade. Super recomendo!",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-pink-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Vanass Nails
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6 ">
              <Link href="#servicos" className="text-gray-700 hover:text-pink-500 transition-colors">
                Serviços
              </Link>
              <Link href="#galeria" className="text-gray-700 hover:text-pink-500 transition-colors">
                Galeria
              </Link>
              <Link href="#sobre" className="text-gray-700 hover:text-pink-500 transition-colors">
                Sobre
              </Link>
              <Link href="#contato" className="text-gray-700 hover:text-pink-500 transition-colors">
                Contato
              </Link>
              <Link href="/agendamento">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Agendar
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Suas unhas merecem o melhor
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transforme suas unhas em verdadeiras obras de arte com nossos serviços especializados. Qualidade,
              elegância e cuidado em cada detalhe.
            </p>
            <div className="m-8">
              <div className="space-x-5">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/agendamento">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8 py-3"
                >
                  Agendar Horário
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-300 text-pink-600 hover:bg-pink-50 text-lg px-8 py-3 bg-transparent"
              >
                Ver Galeria
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Clientes Satisfeitas</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">3+</h3>
              <p className="text-gray-600">Anos de Experiência</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">4.9</h3>
              <p className="text-gray-600">Avaliação Média</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Nossos Serviços</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma ampla gama de serviços para cuidar das suas unhas com excelência
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-pink-100">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                    <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                      {service.price}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Galeria de Trabalhos</h2>
            <p className="text-xl text-gray-600">Confira alguns dos nossos trabalhos mais recentes</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Trabalho ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">O que dizem nossas clientes</h2>
            <p className="text-xl text-gray-600">Depoimentos reais de quem confia no nosso trabalho</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-pink-100">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.comment}&quot;</p>
                  <p className="font-semibold text-gray-800">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Entre em Contato</h2>
            <p className="text-xl text-gray-600">Estamos aqui para cuidar das suas unhas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-pink-500 mr-3" />
                  <span className="text-gray-600">Rua Aurea Rocha Madeira, 88 - Tupi, Belo Horizonte</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-pink-500 mr-3" />
                  <span className="text-gray-600">(11) 99999-9999</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-pink-500 mr-3" />
                  <span className="text-gray-600">contato@gmail.com</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Redes Sociais</h4>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Envie uma Mensagem</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Sua mensagem..."
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-pink-400" />
              <h3 className="text-2xl font-bold">Bella Nails</h3>
            </div>
            <p className="text-gray-400 mb-4">Transformando unhas em obras de arte desde 2021</p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Bella Nails. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
