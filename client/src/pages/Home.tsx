import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', utilisateurs: 400, activité: 240, revenus: 2400 },
  { name: 'Fév', utilisateurs: 300, activité: 139, revenus: 2210 },
  { name: 'Mar', utilisateurs: 200, activité: 980, revenus: 2290 },
  { name: 'Avr', utilisateurs: 278, activité: 390, revenus: 2000 },
  { name: 'Mai', utilisateurs: 189, activité: 480, revenus: 2181 },
  { name: 'Juin', utilisateurs: 239, activité: 380, revenus: 2500 },
];

const pieData = [
  { name: 'Mobile', value: 400 },
  { name: 'Desktop', value: 300 },
  { name: 'Tablette', value: 200 },
];

const COLORS = [
  '#3B82F6', // Bleu vif
  '#10B981', // Vert émeraude
  '#8B5CF6'  // Violet
];

export const Home = () => (
  <div className='container mx-auto p-6 space-y-8'>
    {/* Grille de statistiques principales */}
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      <Card className='bg-card/50 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-colors duration-300 group'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-card-foreground'>Utilisateurs actifs</CardTitle>
          <div className='p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300'>
            <Users className='h-4 w-4 text-primary' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-card-foreground'>2,345</div>
          <p className='text-xs text-muted-foreground mt-1'>+12% depuis le mois dernier</p>
        </CardContent>
      </Card>

      <Card className='bg-card/50 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-colors duration-300 group'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-card-foreground'>Activité totale</CardTitle>
          <div className='p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300'>
            <Activity className='h-4 w-4 text-primary' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-card-foreground'>573</div>
          <p className='text-xs text-muted-foreground mt-1'>+23% depuis le mois dernier</p>
        </CardContent>
      </Card>

      <Card className='bg-card/50 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-colors duration-300 group'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-card-foreground'>Performance</CardTitle>
          <div className='p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300'>
            <TrendingUp className='h-4 w-4 text-primary' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-card-foreground'>89.2%</div>
          <p className='text-xs text-muted-foreground mt-1'>+5% depuis le mois dernier</p>
        </CardContent>
      </Card>

      <Card className='bg-card/50 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-colors duration-300 group'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-card-foreground'>Revenus</CardTitle>
          <div className='p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300'>
            <DollarSign className='h-4 w-4 text-primary' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-card-foreground'>€45,231</div>
          <p className='text-xs text-muted-foreground mt-1'>+20% depuis le mois dernier</p>
        </CardContent>
      </Card>
    </div>

    {/* Graphiques principaux */}
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-7'>
      <Card className='col-span-4 bg-card/50 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-colors duration-300'>
        <CardHeader>
          <CardTitle className='text-card-foreground'>Vue d'ensemble</CardTitle>
        </CardHeader>
        <CardContent className='pl-2'>
          <div className='h-[350px]'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)) / 0.3" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--foreground)) / 0.8"
                  tick={{ fill: '#ffffff' }}
                />
                <YAxis
                  stroke="hsl(var(--foreground)) / 0.8"
                  tick={{ fill: '#ffffff' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Line type="monotone" dataKey="utilisateurs" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="activité" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className='col-span-3 bg-card/50 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-colors duration-300'>
        <CardHeader>
          <CardTitle className='text-card-foreground'>Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[350px]'>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Graphiques secondaires */}
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <Card className='bg-card/50 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-colors duration-300'>
        <CardHeader>
          <CardTitle className='text-card-foreground'>Performance par catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[250px]'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)) / 0.3" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--foreground)) / 0.8"
                  tick={{ fill: '#ffffff' }}
                />
                <YAxis
                  stroke="hsl(var(--foreground)) / 0.8"
                  tick={{ fill: '#ffffff' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar dataKey="utilisateurs" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className='bg-card/50 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-colors duration-300'>
        <CardHeader>
          <CardTitle className='text-card-foreground'>Tendance d'utilisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[250px]'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)) / 0.3" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--foreground)) / 0.8"
                  tick={{ fill: '#ffffff' }}
                />
                <YAxis
                  stroke="hsl(var(--foreground)) / 0.8"
                  tick={{ fill: '#ffffff' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Line type="monotone" dataKey="activité" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className='bg-card/50 backdrop-blur-sm border-border/40 hover:bg-card/60 transition-colors duration-300'>
        <CardHeader>
          <CardTitle className='text-card-foreground'>Comparaison mensuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[250px]'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)) / 0.3" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--foreground)) / 0.8"
                  tick={{ fill: '#ffffff' }}
                />
                <YAxis
                  stroke="hsl(var(--foreground)) / 0.8"
                  tick={{ fill: '#ffffff' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar dataKey="revenus" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);
