import { Clock, MapPin, Radio } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const RightNowWidget = () => {
  const [time, setTime] = useState<string>('');
  const [status, setStatus] = useState({
    emoji: '💻',
    text: 'Building client websites',
    color: 'bg-moss-green',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTimeAndStatus = () => {
      // Calculate Jakarta Time (WIB) - UTC+7
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
          color: 'bg-moss-green',
        });
      } else if (jakartaHour >= 18 && jakartaHour < 23) {
        setStatus({
          emoji: '📚',
          text: 'Learning new tech / reading books',
          color: 'bg-signal-blue',
        });
      } else if (jakartaHour >= 23 || jakartaHour < 6) {
        setStatus({
          emoji: '😴',
          text: 'Sleeping / Recharging battery',
          color: 'bg-sage-gray',
        });
      } else {
        setStatus({
          emoji: '☕',
          text: 'Morning coffee & planning the day',
          color: 'bg-amber-glow',
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
          'w-full rounded-sm border border-hairline p-4',
          'bg-paper-white animate-pulse h-32',
        )}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={cn(
        'w-full rounded-sm border border-hairline p-4 sm:p-5',
        'bg-paper-white shadow-none relative overflow-hidden',
      )}
    >
      <h3 className='font-mono text-xs uppercase tracking-widest text-sage-gray mb-3 flex items-center gap-1.5 font-bold'>
        <Radio size={12} className='text-amber-glow animate-pulse' />
        Right Now
      </h3>

      <div className='flex flex-col gap-3'>
        {/* Time Zone */}
        <div className='flex items-center gap-3'>
          <div className='w-7 h-7 rounded-sm bg-soft-linen border border-hairline flex items-center justify-center text-deep-moss'>
            <Clock size={14} />
          </div>
          <div>
            <p className='font-mono text-[10px] text-sage-gray uppercase tracking-wider font-semibold'>
              Jakarta Time (WIB)
            </p>
            <p className='font-mono text-xs sm:text-sm font-bold text-deep-moss tracking-wide'>
              {time}
            </p>
          </div>
        </div>

        {/* Status Activity */}
        <div className='flex items-center gap-3'>
          <div className='w-7 h-7 rounded-sm bg-soft-linen border border-hairline flex items-center justify-center text-base'>
            {status.emoji}
          </div>
          <div>
            <p className='font-mono text-[10px] text-sage-gray uppercase tracking-wider font-semibold flex items-center gap-1.5'>
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
            <p className='font-ui text-xs sm:text-sm font-medium text-deep-moss'>
              {status.text}
            </p>
          </div>
        </div>

        {/* Location Info */}
        <div className='flex items-center gap-3 border-t border-hairline/70 pt-2.5 mt-0.5'>
          <div className='w-7 h-7 rounded-sm bg-soft-linen border border-hairline flex items-center justify-center text-deep-moss'>
            <MapPin size={14} />
          </div>
          <div>
            <p className='font-ui text-xs font-semibold text-deep-moss'>
              Jakarta, Indonesia
            </p>
            <p className='font-mono text-[10px] text-sage-gray'>
              6.2088° S, 106.8456° E
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RightNowWidget;
