export const SERVICES_TRANSITION_IDS = {
  WRAPPER: 'services-transition',
  TEXT: 'services-trans-text',
};

const Transition = () => {
  return (
    <div
      className='inset-0 flex h-screen w-full items-center justify-center bg-background'
      id={SERVICES_TRANSITION_IDS.WRAPPER}
    >
      <h4 className='text-[6rem] font-bold' id={SERVICES_TRANSITION_IDS.TEXT}>
        SERVICIOS
      </h4>
    </div>
  );
};

export default Transition;
