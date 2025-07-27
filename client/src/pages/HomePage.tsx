import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ApiResponse } from 'shared'

import { Button } from '@client/components/ui/button'
import {
  Code2,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Users,
  Rocket,
  CheckCircle,
  Play,
  Sparkles,
  Star,
} from 'lucide-react'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

export default function HomePage() {
  const [data, setData] = useState<ApiResponse | undefined>()

  async function sendRequest() {
    try {
      const req = await fetch(`${SERVER_URL}/hello`)
      const res: ApiResponse = await req.json()
      setData(res)
    } catch (error) {
      console.log(error)
    }
  }



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  } as const


  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Ultra Rapide",
      description: "Performance exceptionnelle avec Bun et Hono",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Type Safe",
      description: "TypeScript end-to-end pour une sécurité maximale",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Platform",
      description: "Déployez partout : Node, Deno, Cloudflare Workers",
      gradient: "from-green-400 to-teal-500"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Developer Experience",
      description: "Hot reload, debugging avancé, tooling moderne",
      gradient: "from-pink-400 to-rose-500"
    }
  ]

  const stats = [
    { number: "10x", label: "Plus rapide", icon: <Zap className="w-4 h-4" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="w-4 h-4" /> },
    { number: "50k+", label: "Développeurs", icon: <Users className="w-4 h-4" /> },
    { number: "24/7", label: "Support", icon: <Sparkles className="w-4 h-4" /> }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Stack moderne pour développeurs</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black text-foreground mb-6 leading-tight"
            >
              Le Futur du
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"> Développement</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Stack moderne avec <span className="text-primary font-semibold">Bun</span>, <span className="text-primary font-semibold">Hono</span>, <span className="text-primary font-semibold">Vite</span> et <span className="text-primary font-semibold">React</span>.
              Performance exceptionnelle, DX inégalée.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-200"
                  onClick={sendRequest}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Tester l'API
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent/50 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Voir la Documentation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            {/* API Response Display */}
            {data && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 max-w-lg mx-auto border border-border/50 shadow-2xl"
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </motion.div>
                  <span className="text-primary font-bold text-lg ml-3">API Connectée !</span>
                </div>
                <div className="text-card-foreground text-center">
                  <p className="text-xl font-semibold mb-2">{data.message}</p>
                  <p className="text-sm text-muted-foreground">
                    Status: <span className="text-primary font-medium">{data.success ? 'Succès' : 'Erreur'}</span>
                  </p>
                </div>
              </motion.div>
            )}


          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:bg-accent/20"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-foreground mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
            >
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Fonctionnalités avancées</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
              Pourquoi choisir <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">BHVR</span> ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Une stack moderne qui combine performance, sécurité et expérience développeur
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:bg-accent/20 h-full"
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-16 border border-border/50 shadow-2xl backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-primary/20 text-primary px-6 py-3 rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Prêt à commencer ?</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black text-foreground mb-8">
              Rejoignez la révolution
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Rejoignez des milliers de développeurs qui utilisent déjà BHVR pour leurs projets
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Démarrer un projet
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent/50 text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Rejoindre la communauté
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center space-x-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Rocket className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <span className="text-2xl font-black text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">BHVR</span>
          </motion.div>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © 2024 BHVR. Construit avec <span className="text-primary">❤️</span> pour les développeurs modernes.
          </motion.p>
        </div>
      </footer>
    </>
  )
}
