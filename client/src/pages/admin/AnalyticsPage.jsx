import { useEffect, useState } from "react";
import { 
  XAxis, YAxis, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie,
  ComposedChart, Legend, CartesianGrid, Bar
} from "recharts";
import { getSummary, getWeeklyAnalytics } from "../../api/analyticsApi";
import { FiTrendingUp, FiUsers, FiShoppingBag, FiActivity, FiPieChart, FiBarChart2, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";

function AnalyticsPage() {
  const [summary, setSummary] = useState({});
  const [weekData, setWeekData] = useState([]);
  const [loading, setLoading] = useState(true);

  const hourlyData = [
    { hour: '9 AM', orders: 15, revenue: 550 },
    { hour: '11 AM', orders: 48, revenue: 1420 },
    { hour: '1 PM', orders: 94, revenue: 3800 },
    { hour: '3 PM', orders: 38, revenue: 1100 },
    { hour: '5 PM', orders: 26, revenue: 780 },
  ];

  const categoryData = [
    { name: 'Snacks', value: 420, color: '#f59e0b' },
    { name: 'Meals', value: 310, color: '#f43f5e' },
    { name: 'Drinks', value: 230, color: '#06b6d4' },
    { name: 'Desserts', value: 120, color: '#a855f7' },
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [summaryRes, weeklyRes] = await Promise.all([getSummary(), getWeeklyAnalytics()]);
        setSummary(summaryRes.data || {});
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        setWeekData((weeklyRes.data || []).map(d => ({
          day: days[d._id - 1] || `D${d._id}`,
          orders: d.orders,
          revenue: d.revenue,
          avg: Math.round(d.revenue / (d.orders || 1))
        })));
      } catch (err) { 
        console.error(err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-coral-400 font-mono text-sm animate-pulse flex items-center gap-3">
        <span className="w-4 h-4 rounded-full border-2 border-coral-400 border-t-transparent animate-spin" />
        LOADING KITCHEN TELEMETRY...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* 🚀 Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
            Kitchen <span className="text-coral-400">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-1 uppercase tracking-widest">
            FlashEats Revenue & Operations Telemetry v3.0
          </p>
        </div>
        <div className="flex gap-2 bg-dark-850 p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto">
          <span className="px-3.5 py-1.5 bg-gradient-to-r from-coral-500 to-brand-500 rounded-xl text-xs font-bold text-white shadow-sm">
            Live Metrics
          </span>
          <span className="px-3.5 py-1.5 text-slate-400 text-xs font-medium">
            Campus Node #1
          </span>
        </div>
      </header>

      {/* 📊 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          icon={<FiShoppingBag className="text-xl" />} 
          label="Total Orders" 
          value={summary.totalOrders || 0} 
          trend="+18.4%" 
          gradient="from-brand-500/20 via-brand-500/5 to-transparent border-brand-500/20 text-brand-400" 
        />
        <StatCard 
          icon={<FiDollarSign className="text-xl" />} 
          label="Gross Revenue" 
          value={`₹${summary.totalRevenue || 0}`} 
          trend="+12.8%" 
          gradient="from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/20 text-emerald-400" 
        />
        <StatCard 
          icon={<FiTrendingUp className="text-xl" />} 
          label="Average Ticket" 
          value={`₹${Math.round(summary.avgOrderValue || 0)}`} 
          trend="+4.1%" 
          gradient="from-coral-500/20 via-coral-500/5 to-transparent border-coral-500/20 text-coral-400" 
        />
        <StatCard 
          icon={<FiUsers className="text-xl" />} 
          label="Campus Reach" 
          value="1,450+" 
          trend="+22%" 
          gradient="from-purple-500/20 via-purple-500/5 to-transparent border-purple-500/20 text-purple-400" 
        />
      </div>

      {/* 📈 Charts Section 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Revenue Volume Composed Chart */}
        <div className="lg:col-span-2 bg-dark-850/80 border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold flex items-center gap-2 text-white">
                <FiBarChart2 className="text-coral-400" /> Revenue & Orders Matrix
              </h2>
              <p className="text-xs text-slate-400">Weekly monetary intake against kitchen orders</p>
            </div>
            <span className="text-[10px] text-brand-400 font-mono uppercase bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
              AGGREGATED
            </span>
          </div>

          <div className="w-full h-[280px] sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={weekData.length > 0 ? weekData : [{day: 'Mon', revenue: 1000, orders: 12}]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={8} />
                <YAxis yAxisId="left" hide />
                <YAxis yAxisId="right" orientation="right" hide />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#070a0f', 
                    border: '1px solid rgba(245,158,11,0.2)', 
                    borderRadius: '16px',
                    color: '#fff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '16px', fontSize: '11px'}} />
                <Bar yAxisId="left" dataKey="revenue" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={34} name="Revenue (₹)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Split Pie */}
        <div className="bg-dark-850/80 border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-display font-bold mb-1 flex items-center gap-2 text-white">
              <FiPieChart className="text-coral-400" /> Food Preferences
            </h2>
            <p className="text-xs text-slate-400 mb-6">Order distribution by category</p>
            
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={65}
                    outerRadius={88}
                    paddingAngle={6}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{backgroundColor: '#070a0f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 space-y-2.5 pt-4 border-t border-white/5">
            {categoryData.map(item => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}} /> {item.name}
                </span>
                <span className="font-mono font-bold text-white">{(item.value / 10).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ⏰ Peak Hours Traffic Density */}
      <div className="bg-dark-850/80 border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2">
              <FiActivity className="text-emerald-400" /> Campus Peak Load Curves
            </h2>
            <p className="text-xs text-slate-400">Identify lunch hour rushes to schedule prep ahead</p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
            PEAK: 1:00 PM – 2:00 PM
          </span>
        </div>

        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="colorWaveCoral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={6} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{backgroundColor: '#070a0f', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '12px'}}
              />
              <Area type="monotone" dataKey="orders" stroke="#f43f5e" fill="url(#colorWaveCoral)" strokeWidth={3} name="Rush Orders" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} border p-5 sm:p-6 rounded-3xl shadow-lg hover:translate-y-[-2px] transition-all`}>
      <div className="flex justify-between items-start mb-3">
        <div className="p-3 bg-dark-950/60 rounded-2xl border border-white/5">{icon}</div>
        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-dark-950/80 border border-white/10 ${trend.startsWith('+') ? 'text-emerald-400' : 'text-coral-400'}`}>
          {trend}
        </span>
      </div>
      <p className="text-[11px] uppercase font-mono tracking-widest text-slate-400 mb-0.5">{label}</p>
      <h3 className="text-2xl sm:text-3xl font-display font-black text-white">{value}</h3>
    </div>
  );
}

export default AnalyticsPage;
