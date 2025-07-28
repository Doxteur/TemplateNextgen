import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Zap, 
  Code, 
  Database, 
  Palette, 
  ArrowRight,
  Github,
  Play,
  Star,
  Sparkles,
  CheckCircle
} from 'lucide-react'

function Home() {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Authentification JWT",
      description: "Sécurité robuste avec tokens JWT et hashage sécurisé des mots de passe",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Lucid ORM",
      description: "ORM puissant d'AdonisJS pour une gestion efficace de la base de données",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance",
      description: "Bun runtime ultra-rapide et Vite pour un développement fluide",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UI Moderne",
      description: "Interface élégante avec Tailwind CSS et shadcn/ui",
      gradient: "from-purple-500 to-pink-500"
    }
  ]

  const techStack = [
    { name: "React", color: "bg-[#61DAFB]", textColor: "text-[#61DAFB]" },
    { name: "AdonisJS", color: "bg-[#5A45FF]", textColor: "text-[#5A45FF]" },
    { name: "Bun", color: "bg-[#FBF0DF]", textColor: "text-amber-700" },
    { name: "Vite", color: "bg-[#646CFF]", textColor: "text-[#646CFF]" },
    { name: "TypeScript", color: "bg-[#3178C6]", textColor: "text-[#3178C6]" },
    { name: "Tailwind", color: "bg-[#06B6D4]", textColor: "text-[#06B6D4]" }
  ]

  const benefits = [
    "Authentification JWT complète",
    "Routes protégées automatiques", 
    "Base de données avec Lucid ORM",
    "Interface moderne et responsive",
    "Performance optimisée avec Bun",
    "Développement rapide avec Vite"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Sparkles className="mr-2 h-4 w-4" />
              Stack Full-Stack Moderne
            </Badge>
            
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl mb-6">
              RABV
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent">
                Template
              </span>
            </h1>
            
            <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
              Une stack full-stack TypeScript moderne avec authentification JWT, 
              utilisant <strong className="text-primary">R</strong>eact, <strong className="text-primary">A</strong>donisJS, <strong className="text-primary">B</strong>un et <strong className="text-primary">V</strong>ite.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button size="lg" className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300">
              <Play className="mr-2 h-4 w-4" />
              Commencer
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="group border-2 hover:border-primary hover:text-primary transition-all duration-300">
              <Github className="mr-2 h-4 w-4" />
              Voir sur GitHub
            </Button>
          </motion.div>
        </div>

        {/* Tech Stack Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group"
            >
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-2 hover:border-primary/50 transition-all duration-300 bg-background/80 backdrop-blur-sm">
                <div className={`mr-2 h-3 w-3 rounded-full ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className={tech.textColor}>{tech.name}</span>
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 relative z-10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4 px-3 py-1">
                <Star className="mr-2 h-3 w-3" />
                Fonctionnalités
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                Fonctionnalités principales
              </h2>
              <p className="text-xl leading-8 text-muted-foreground">
                Tout ce dont vous avez besoin pour démarrer rapidement votre projet full-stack
              </p>
            </motion.div>
          </div>

          <div className="mx-auto max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-xl bg-card/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group-hover:bg-card/80">
                    <CardHeader>
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="mt-6 text-2xl font-bold text-foreground">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-4xl font-bold mb-4">
                  Prêt à démarrer ?
                </CardTitle>
                <CardDescription className="text-xl text-primary-foreground/90">
                  Clonez le template et commencez à développer votre application en quelques minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Button variant="secondary" size="lg" className="group bg-white/20 hover:bg-white/30 border-white/30 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Code className="mr-2 h-4 w-4" />
                  Voir la documentation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <Github className="mr-2 h-4 w-4" />
                  Star sur GitHub
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home