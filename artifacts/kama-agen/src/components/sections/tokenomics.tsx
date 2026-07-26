import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'AI Agent Rewards', value: 40, color: '#00ff41' },
  { name: 'Liquidity Pool', value: 25, color: '#00cc33' },
  { name: 'Development Fund', value: 15, color: '#009926' },
  { name: 'Community & Airdrop', value: 12, color: '#006619' },
  { name: 'Team & Advisors', value: 8, color: '#00330d' },
];

export function Tokenomics() {
  return (
    <section id="tokenomics" className="py-24 bg-black border-y border-primary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase">
            Token<span className="text-primary">omics</span>
          </h2>
          <p className="font-mono text-muted-foreground mt-4">Total Supply: 1,000,000,000 $KAMA</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[400px] w-full relative"
          >
            {/* Center decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-primary/50 flex items-center justify-center z-10 bg-black shadow-[0_0_20px_rgba(0,255,65,0.2)]">
              <span className="font-mono font-bold text-primary">$KAMA</span>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={160}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff41', borderRadius: 0, fontFamily: 'Space Mono' }}
                  itemStyle={{ color: '#00ff41' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="space-y-4">
            {data.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-white/10 bg-white/5 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4" style={{ backgroundColor: item.color }} />
                  <span className="font-display font-bold text-white group-hover:text-primary transition-colors">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-muted-foreground group-hover:text-white transition-colors">{item.value}%</span>
                  {item.name === 'Team & Advisors' && (
                    <span className="text-[10px] font-mono border border-primary/30 px-2 py-1 text-primary">12M VESTING</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}