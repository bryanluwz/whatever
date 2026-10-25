import type { PageTitleProps } from '../typings/components/PageTitle';

export const PageTitle = ({ title, help }: PageTitleProps) => {
  return (
    <div className='w-full flex items-center justify-center relative'>
      <span className='text-4xl font-klee text-ink'>{title}</span>
      {help ? <div className='absolute right-0 top-0.5 translate-y-0.5'>{help}</div> : null}
    </div>
  );
};
