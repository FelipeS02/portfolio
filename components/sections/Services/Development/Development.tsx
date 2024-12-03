import Globe from './Globe';
import Ring from './OrbitRings/Ring';

export const DEVELOPMENT = {
  SECTION: 'development-section',
};

const Development = () => {
  return (
    <section
      className='size-full max-w-full flex items-center justify-center overflow-hidden relative'
      id={DEVELOPMENT.SECTION}
    >
      <div className='flex max-sm:h-full md:w-full aspect-square animate-orbit-rings'>
        <Ring>
          <Ring>
            <Ring>
              <Ring>
                <Ring>
                  <Ring>
                    <Ring></Ring>
                  </Ring>
                </Ring>
              </Ring>
            </Ring>
          </Ring>
        </Ring>
      </div>
      <Globe className='absolute m-auto place-self-center max-w-full shadow-globe overflow-hidden' />
    </section>
  );
};

export default Development;
