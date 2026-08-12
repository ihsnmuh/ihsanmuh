import {
  Activity,
  Bike,
  Calendar,
  Clock,
  Compass,
  ExternalLink,
  Footprints,
  Heart,
  Mountain,
  Zap,
} from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink from '@/components/Atoms/links/UnstyledLink';

import { formatDate } from '@/helpers/formatDate';

import { IStravaActivity } from '@/types/interfaces/hobbies';

interface RecentRunCardProps {
  activity: IStravaActivity;
}

const getSportConfig = (type: string) => {
  const normalized = type.toLowerCase();
  if (
    normalized.includes('ride') ||
    normalized.includes('cycle') ||
    normalized.includes('bike')
  ) {
    return {
      label: 'Cycling',
      icon: Bike,
      badgeBg:
        'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
      accentColor:
        'group-hover:text-emerald-500 dark:group-hover:text-emerald-400',
      rateLabel: 'Avg Speed',
    };
  }
  if (normalized.includes('walk') || normalized.includes('hike')) {
    return {
      label: 'Walk / Hike',
      icon: Footprints,
      badgeBg:
        'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
      accentColor: 'group-hover:text-amber-500 dark:group-hover:text-amber-400',
      rateLabel: 'Avg Pace',
    };
  }
  if (normalized.includes('swim')) {
    return {
      label: 'Swimming',
      icon: Compass,
      badgeBg:
        'bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400',
      accentColor: 'group-hover:text-sky-500 dark:group-hover:text-sky-400',
      rateLabel: 'Avg Pace',
    };
  }
  // Default to Running
  return {
    label: 'Run',
    icon: Activity,
    badgeBg:
      'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
    accentColor: 'group-hover:text-orange-500 dark:group-hover:text-orange-400',
    rateLabel: 'Avg Pace',
  };
};

const RecentRunCard: React.FC<RecentRunCardProps> = ({ activity }) => {
  const sport = getSportConfig(activity.type || activity.sportType);
  const SportIcon = sport.icon;

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between p-5 rounded-2xl transition-all duration-300',
        'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md',
        'border border-slate-200/80 dark:border-slate-800/80',
        'hover:border-slate-300 dark:hover:border-slate-700',
        'hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-950/30',
      )}
    >
      <div>
        {/* Header: Sport Badge + Date + Strava Link */}
        <div className='flex items-center justify-between gap-2 mb-3'>
          <div className='flex items-center gap-2'>
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold',
                sport.badgeBg,
              )}
            >
              <SportIcon className='w-3 h-3' />
              {sport.label}
            </span>
            <span className='flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400'>
              <Calendar className='w-3 h-3 text-slate-400 dark:text-slate-500' />
              {formatDate(activity.startDate)}
            </span>
          </div>

          <UnstyledLink
            href={activity.stravaUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold',
              'bg-[#FC4C02]/10 text-[#FC4C02] dark:bg-[#FC4C02]/20 dark:text-[#FF5722]',
              'hover:bg-[#FC4C02]/20 transition-colors',
            )}
          >
            <span>Strava</span>
            <ExternalLink className='w-3 h-3' />
          </UnstyledLink>
        </div>

        {/* Activity Name */}
        <h3
          className={cn(
            'text-lg font-bold font-secondary text-slate-900 dark:text-white transition-colors line-clamp-1',
            sport.accentColor,
          )}
        >
          {activity.name}
        </h3>

        {/* Big Metric: Distance */}
        <div className='mt-3 flex items-baseline gap-1.5'>
          <span className='text-3xl font-extrabold font-secondary text-slate-900 dark:text-white tracking-tight'>
            {activity.distance}
          </span>
          <span className='text-sm font-semibold text-primary-500 dark:text-primary-400'>
            km
          </span>
        </div>
      </div>

      {/* Stats Details Grid */}
      <div className='mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-xs'>
        <div className='flex flex-col gap-0.5'>
          <span className='text-slate-400 dark:text-slate-500 flex items-center gap-1'>
            <Clock className='w-3 h-3' /> Duration
          </span>
          <span className='font-semibold text-slate-700 dark:text-slate-300'>
            {activity.formattedTime}
          </span>
        </div>

        <div className='flex flex-col gap-0.5'>
          <span className='text-slate-400 dark:text-slate-500 flex items-center gap-1'>
            <Zap className='w-3 h-3 text-amber-500' /> {sport.rateLabel}
          </span>
          <span className='font-semibold text-slate-700 dark:text-slate-300'>
            {activity.pace}
          </span>
        </div>

        <div className='flex flex-col gap-0.5'>
          <span className='text-slate-400 dark:text-slate-500 flex items-center gap-1'>
            <Mountain className='w-3 h-3 text-sky-500' /> Elev Gain
          </span>
          <span className='font-semibold text-slate-700 dark:text-slate-300'>
            {activity.totalElevationGain}m
          </span>
        </div>

        {activity.averageHeartrate && (
          <div className='col-span-3 mt-1 flex items-center gap-1 text-[11px] text-rose-500 dark:text-rose-400'>
            <Heart className='w-3 h-3 fill-current' />
            <span>Avg {activity.averageHeartrate} bpm</span>
            {activity.maxHeartrate && (
              <span className='text-slate-400 dark:text-slate-500'>
                · Max {activity.maxHeartrate} bpm
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentRunCard;
