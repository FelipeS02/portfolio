export const SERVICES_TRANSITION_IDS = {
  WRAPPER: 'services-transition',
  TEXT: 'services-trans-text',
};

const Transition = () => {
  return (
    <div
      className='h-screen w-full bg-background items-center justify-center inset-0 flex'
      id={SERVICES_TRANSITION_IDS.WRAPPER}
    >
      <h4 className='text-[6rem] font-bold' id={SERVICES_TRANSITION_IDS.TEXT}>
        SERVICIOS
      </h4>
    </div>
  );
};

export default Transition;
