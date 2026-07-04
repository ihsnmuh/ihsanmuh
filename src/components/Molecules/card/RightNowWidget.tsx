import { Clock, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const RightNowWidget = () => {
  const [time, setTime] = useState<string>('');
  const [status, setStatus] = useState({
    emoji: '💻',
    text: 'Building client websites',
    color: 'bg-green-500',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTimeAndStatus = () => {
      // Calculate Jakarta Time (WIB)
      // Jakarta is UTC+7
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };

      const formatter = new Intl.DateTimeFormat('en-US', options);
      const formatted = formatter.format(new Date());
      setTime(formatted);

      // Status based on Jakarta hour
      const jakartaHour = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          hour12: false,
        }).format(new Date()),
      );

      if (jakartaHour >= 8 && jakartaHour < 18) {
        setStatus({
          emoji: '💻',
          text: 'Designing & Writing Code',
          color: 'bg-emerald-500',
        });
      } else if (jakartaHour >= 18 && jakartaHour < 23) {
        setStatus({
          emoji: '📚',
          text: 'Learning new tech / reading books',
          color: 'bg-sky-500',
        });
      } else if (jakartaHour >= 23 || jakartaHour < 6) {
        setStatus({
          emoji: '😴',
          text: 'Sleeping / Recharging battery',
          color: 'bg-zinc-500 animate-pulse',
        });
      } else {
        setStatus({
          emoji: '☕',
          text: 'Morning coffee & planning the day',
          color: 'bg-amber-500',
        });
      }
    };

    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'w-full rounded-2xl border p-5',
          'background-card border-slate-200 dark:border-zinc-700/40 animate-pulse h-32',
        )}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        'w-full rounded-2xl border p-5',
        'background-card border-slate-200 dark:border-zinc-700/40 shadow-sm relative overflow-hidden group',
      )}
    >
      {/* Decorative gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-tr from-primary-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

      <h3 className='font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-4 flex items-center gap-1.5'>
        <Sparkles
          size={12}
          className='text-primary-500 dark:text-primary-400 animate-pulse'
        />
        Right Now
      </h3>

      <div className='flex flex-col gap-3.5'>
        {/* Time Zone */}
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-400'>
            <Clock size={16} />
          </div>
          <div>
            <p className='font-secondary text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-semibold'>
              Jakarta Time (WIB)
            </p>
            <p className='font-mono text-sm font-bold text-slate-800 dark:text-zinc-200 tracking-wide'>
              {time}
            </p>
          </div>
        </div>

        {/* Status Activity */}
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xl'>
            {status.emoji}
          </div>
          <div>
            <p className='font-secondary text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-semibold flex items-center gap-1.5'>
              <span className={cn('w-2 h-2 rounded-full relative flex')}>
                <span
                  className={cn(
                    'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                    status.color,
                  )}
                />
                <span
                  className={cn(
                    'relative inline-flex rounded-full h-2 w-2',
                    status.color,
                  )}
                />
              </span>
              Current Status
            </p>
            <p className='font-primary text-sm font-semibold text-slate-700 dark:text-zinc-300'>
              {status.text}
            </p>
          </div>
        </div>

        {/* Location Info */}
        <div className='flex items-center gap-3 border-t border-slate-100 dark:border-zinc-800/80 pt-3 mt-1'>
          <div className='w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-400'>
            <MapPin size={16} />
          </div>
          <div>
            <p className='font-primary text-xs font-semibold text-slate-600 dark:text-zinc-400'>
              Jakarta, Indonesia
            </p>
            <p className='font-primary text-[10px] text-slate-400 dark:text-zinc-500'>
              6.2088° S, 106.8456° E
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RightNowWidget;
