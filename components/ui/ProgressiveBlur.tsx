import { cn } from '@/lib/utils';

const ProgressiveBlur = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={cn('backdrop-blur-xl', className)}
      style={{
        mask: 'linear-gradient(to left, transparent, #00000090 )',
      }}
    />
  );
};

export default ProgressiveBlur;
