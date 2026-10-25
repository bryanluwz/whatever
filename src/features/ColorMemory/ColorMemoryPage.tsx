import { HelpPopup } from '../../components/HelpPopup';
import { PageTitle } from '../../components/PageTitle';

export const ColorMemoryPage = () => {
  return (
    <div>
      <PageTitle
        title='Colour Memory'
        help={
          <HelpPopup>
            <div className='flex flex-col w-100'>
              <span className='text-rose text-xl'>Colour Memory</span>

              <div>
                <span className='text-soft text-base'>How to play?</span>
                <ol className='list-decimal list-inside text-base'>
                  <li>
                    Click "Start" and remember the colour on the screen before the timer runs out.
                  </li>
                  <li>Try to reconstruct the colour using the sliders.</li>
                  <li>Stonks</li>
                </ol>
              </div>
            </div>
          </HelpPopup>
        }
      />
    </div>
  );
};
