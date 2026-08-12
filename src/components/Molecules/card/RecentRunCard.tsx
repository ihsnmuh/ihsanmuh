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
import { decodePolyline } from '@/helpers/heatmap';

import { IStravaActivity } from '@/types/interfaces/hobbies';

interface RecentRunCardProps {
  activity: IStravaActivity;
}

interface ActivityMapThumbnailProps {
  polyline?: string | null;
  strokeColor?: string;
  className?: string;
}

const ActivityMapThumbnail: React.FC<ActivityMapThumbnailProps> = ({
  polyline,
  strokeColor = '#FC4C02',
  className,
}) => {
  const pathD = React.useMemo(() => {
    if (!polyline) return null;
    const coords = decodePolyline(polyline);
    if (coords.length < 2) return null;

    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    for (const [lat, lng] of coords) {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    }

    const width = 200;
    const height = 90;
    const padding = 10;

    const latRange = maxLat - minLat || 0.0001;
    const lngRange = maxLng - minLng || 0.0001;

    const scaleX = (width - padding * 2) / lngRange;
    const scaleY = (height - padding * 2) / latRange;
    const scale = Math.min(scaleX, scaleY);

    const offsetX = padding + (width - padding * 2 - lngRange * scale) / 2;
    const offsetY = padding + (height - padding * 2 - latRange * scale) / 2;

    const points = coords.map(([lat, lng]) => {
      const x = (lng - minLng) * scale + offsetX;
      const y = height - ((lat - minLat) * scale + offsetY);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `M ${points.join(' L ')}`;
  }, [polyline]);

  if (!pathD) {
    return (
      <div
        className={cn(
          'w-full h-24 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-dashed border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center text-xs text-slate-400 dark:text-slate-500',
          className,
        )}
      >
        <Compass className='w-3.5 h-3.5 mr-1.5 opacity-50' />
        <span>No GPS route data</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative w-full h-24 sm:h-28 rounded-xl overflow-hidden',
        'bg-slate-950/90 dark:bg-slate-950 border border-slate-800/80 dark:border-slate-800/80',
        'shadow-inner flex items-center justify-center p-2',
        className,
      )}
    >
      {/* Grid Pattern Background */}
      <div
        className='absolute inset-0 opacity-15 pointer-events-none'
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)',
          backgroundSize: '12px 12px',
        }}
      />
      <svg
        viewBox='0 0 200 90'
        className='w-full h-full relative z-10 drop-shadow-[0_0_6px_rgba(252,76,2,0.6)]'
        preserveAspectRatio='xMidYMid meet'
      >
        <path
          d={pathD}
          fill='none'
          stroke={strokeColor}
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

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
      strokeColor: '#10B981',
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
      strokeColor: '#F59E0B',
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
      strokeColor: '#0EA5E9',
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
    strokeColor: '#FC4C02',
  };
};

const RecentRunCard: React.FC<RecentRunCardProps> = ({ activity }) => {
  const sport = getSportConfig(activity.type || activity.sportType);
  const SportIcon = sport.icon;

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between p-5 rounded-2xl transition-all duration-300',
        'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md',
        'border border-slate-200/80 dark:border-slate-800/80',
        'hover:border-slate-300 dark:hover:border-slate-700/80',
        'hover:shadow-lg hover:shadow-slate-500/5 dark:hover:shadow-slate-950/40',
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
        <div className='mt-2 flex items-baseline gap-1.5'>
          <span className='text-3xl font-extrabold font-secondary text-slate-900 dark:text-white tracking-tight'>
            {activity.distance}
          </span>
          <span className='text-sm font-semibold text-primary-500 dark:text-primary-400'>
            km
          </span>
        </div>

        {/* Route Map Polyline Preview */}
        <ActivityMapThumbnail
          polyline={activity.summaryPolyline}
          strokeColor={sport.strokeColor}
          className='mt-3'
        />
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
