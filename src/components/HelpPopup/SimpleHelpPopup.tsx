import { useMemo } from 'react';
import type { SimpleHelpPopupProps } from '../../typings/components/HelpPopup';
import { HelpPopup } from './HelpPopup';

export const SimpleHelpPopup = ({ title, steps }: SimpleHelpPopupProps) => {
  const stepsList = useMemo(() => {
    const liList = steps.map((step, index) => <li key={index}>{step}</li>);
    return <ol className='list-decimal list-inside text-base'>{liList}</ol>;
  }, [steps]);

  return (
    <HelpPopup>
      <div className='flex flex-col w-100'>
        <span className='text-rose text-xl'>{title}</span>
        <div>
          <span className='text-soft text-base'>How to play?</span>
          {stepsList}
        </div>
      </div>
    </HelpPopup>
  );
};
